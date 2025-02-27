<?php
$db = new mysqli('localhost', 'root', '', 'comselec_hele');

if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}
$result = $db->query("SELECT COUNT(*) AS totalVoters FROM votes");
$totalVoters = $result->fetch_assoc();

echo json_encode($totalVoters);

$db->close();
?>