<?php
$db = new mysqli('localhost', 'root', '', 'comselec_hele');

if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}
$username = $_POST['username'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);
$officer_code = $_POST['officer_code'];
if ($officer_code !== "11110000") {
    die("Invalid officer code.");
}
$stmt = $db->prepare("INSERT INTO officers (username, password, officer_code) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $username, $password, $officer_code);
if ($stmt->execute()) {
    echo "Signup successful! <a href='../VIEWS/officer_login.html'>Login here</a>.";
} else {
    echo "Error: " . $stmt->error;
}
$stmt->close();
$db->close();
?>