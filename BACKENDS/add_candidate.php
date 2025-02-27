<?php
session_start();
$db = new mysqli('localhost', 'root', '', 'comselec_hele');

if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}
$position = $_POST['position'];
$name = $_POST['name'];
$course = $_POST['course'];
$department = $_POST['department'];
$year_level = $_POST['year_level'];

$target_dir = "../IMAGES/";
$target_file = $target_dir . basename($_FILES["image"]["name"]);
$image_path = "IMAGES/" . basename($_FILES["image"]["name"]);

if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
    $stmt = $db->prepare("INSERT INTO $position (name, course, department, year_level, image_path) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $name, $course, $department, $year_level, $image_path);
    if ($stmt->execute()) {
        header("Location: ../VIEWS/officer_dashboard.html?success=1");
        exit();
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
} else {
    echo "Error uploading image.";
}

$db->close();
?>