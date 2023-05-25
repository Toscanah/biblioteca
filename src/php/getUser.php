<?php
require_once("connection.php");
ob_start();

$user = $_COOKIE["user"];
$id = substr($user, 2, 1);

$get_username = "SELECT * FROM tUtente WHERE id={$id}";
$get_username_res = mysqli_query($db, $get_username);

echo json_encode(mysqli_fetch_all($get_username_res, MYSQLI_ASSOC));