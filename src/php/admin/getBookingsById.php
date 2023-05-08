<?php
require_once("../connection.php");
ob_start();

$request_body = file_get_contents("php://input");
$data = json_decode($request_body, true);
$id = $data["id"];

$get_bookings = 
    "SELECT * FROM tPrenotazione
    WHERE idElemento={$id}";
$get_bookings_res = mysqli_query($db, $get_bookings);
echo json_encode(mysqli_fetch_assoc($get_bookings_res));