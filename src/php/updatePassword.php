<?php
require_once("connection.php");
ob_start();

$request_body = file_get_contents("php://input");
$data = json_decode($request_body, true);

$user = $_COOKIE["user"];
$id = substr($user, 2, 1);
$password = $data["newPassword"];

$update_password = "UPDATE tUtente SET password = '$password' WHERE id = '$id'";
mysqli_query($db, $update_password);
