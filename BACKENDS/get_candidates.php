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
$candidates = [];
foreach ($positions as $position) {
    $result = $db->query("SELECT * FROM $position");
    $candidates[$position] = $result->fetch_all(MYSQLI_ASSOC);
}
echo json_encode(array_map(function ($position, $candidates) {
    return [
        "position" => $position,
        "candidates" => $candidates
    ];
}, array_keys($candidates), array_values($candidates)));

$db->close();
?>