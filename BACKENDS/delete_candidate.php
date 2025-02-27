<?php
$db = new mysqli('localhost', 'root', '', 'comselec_hele');
if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}
$candidateId = $_GET['id'];
$table = $_GET['table'];
$allowedTables = [
    "usg_president",
    "usg_vice_president",
    "senators"
];
if (!in_array($table, $allowedTables)) {
    die("Invalid table name.");
}
$stmt = $db->prepare("DELETE FROM $table WHERE id = ?");
$stmt->bind_param("i", $candidateId);
if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $stmt->error]);
}
$stmt->close();
$db->close();
?>