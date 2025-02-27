<?php
header('Content-Type: application/json');
error_reporting(0);
$db = new mysqli('localhost', 'root', '', 'comselec_hele');
if ($db->connect_error) {
    echo json_encode(["success" => false, "error" => "Connection failed: " . $db->connect_error]);
    exit();
}
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["success" => false, "error" => "Invalid input data"]);
    exit();
}
$tupvId = $data['tupvId'];
$course = $data['course'];
$department = $data['department'];
$yearLevel = $data['yearLevel'];
$date = $data['date'];
$time = $data['time'];
$votes = $data['votes'];
if (isset($votes['senators']) && is_array($votes['senators'])) {
    if (count($votes['senators']) > 5) {
        echo json_encode(["success" => false, "error" => "You can vote for a maximum of 5 Senators."]);
        exit();
    }
}
$senatorIds = isset($votes['senators']) ? $votes['senators'] : [];
$senatorIds = array_pad($senatorIds, 5, '0');
$senatorIdsStr = implode(",", $senatorIds);
$stmt = $db->prepare("INSERT INTO votes (tupv_id, course, department, year_level, date, time, usg_president_id, usg_vice_president_id, senator_ids) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
if (!$stmt) {
    echo json_encode(["success" => false, "error" => "Prepare failed: " . $db->error]);
    exit();
}
$stmt->bind_param(
    "sssssssss",
    $tupvId,
    $course,
    $department,
    $yearLevel,
    $date,
    $time,
    $votes['usg_president'],
    $votes['usg_vice_president'],
    $senatorIdsStr
);

if ($stmt->execute()) {
foreach ($votes as $position => $candidateIds) {
    if ($position === "senators" && is_array($candidateIds)) {
        foreach ($candidateIds as $candidateId) {
            if ($candidateId !== "0") {
                $db->query("
                    INSERT INTO tally (candidate_id, position, votes) 
                    VALUES ($candidateId, '$position', 1) 
                    ON DUPLICATE KEY UPDATE votes = votes + 1
                ");
            }
        }
    } else if ($candidateIds !== "0") {
        $db->query("
            INSERT INTO tally (candidate_id, position, votes) 
            VALUES ($candidateIds, '$position', 1) 
            ON DUPLICATE KEY UPDATE votes = votes + 1
        ");
    }
}
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $stmt->error]);
}
$stmt->close();
$db->close();
?>