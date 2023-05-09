<?php
require_once("../connection.php");
ob_start();

$request_body = file_get_contents("php://input");
$data = json_decode($request_body, true);
$id = $data["id"];

$confirm_booking = "UPDATE tPrenotazione SET stato='' WHERE id={$id}";
mysqli_query($db, $confirm_booking);