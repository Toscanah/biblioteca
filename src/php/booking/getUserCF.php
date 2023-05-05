<?php
require_once("../connection.php");
ob_start();

$request_body = file_get_contents("php://input");
$data = json_decode($request_body, true);
$userId = $data["userId"];

$get_cf = "SELECT cf FROM tUtente WHERE id = {$userId}";
$get_cf_res = mysqli_query($db, $get_cf);
echo json_encode(mysqli_fetch_assoc($get_cf_res));