<?php
$servername = "92.205.6.126";
$username = "rinchatdbuser";
$password = "1q2w3e";
$dbname = "rinchat";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>
