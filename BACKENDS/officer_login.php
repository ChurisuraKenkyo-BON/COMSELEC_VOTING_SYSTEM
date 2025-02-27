<?php
session_start();
$db = new mysqli('localhost', 'root', '', 'comselec_hele');
if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}
$username = $_POST['username'];
$password = $_POST['password'];

$stmt = $db->prepare("SELECT id, password FROM officers WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($id, $hashed_password);
if ($stmt->num_rows > 0) {
    $stmt->fetch();
    if (password_verify($password, $hashed_password)) {
        $_SESSION['officer_id'] = $id;
        header("Location: ../VIEWS/officer_dashboard.html"); // Redirect to dashboard
    } else {
        echo "Invalid password.";
    }
} else {
    echo "User not found.";
}
$stmt->close();
$db->close();
?>