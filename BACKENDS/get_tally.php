<?php
$db = new mysqli('localhost', 'root', '', 'comselec_hele');
if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}
$positions = [
    "usg_president",
    "usg_vice_president",
    "senators"
];
$tallyResults = [];
foreach ($positions as $position) {
$result = $db->query("
SELECT c.name, c.image_path, SUM(t.votes) AS votes 
FROM tally t
JOIN $position c ON t.candidate_id = c.id
WHERE t.position = '$position'
GROUP BY c.id
ORDER BY SUM(t.votes) DESC
");
    $tallyResults[$position] = $result->fetch_all(MYSQLI_ASSOC);
}
echo json_encode(array_map(function ($position, $candidates) {
    return [
        "position" => $position,
        "candidates" => $candidates
    ];
}, array_keys($tallyResults), array_values($tallyResults)));

$db->close();
?>