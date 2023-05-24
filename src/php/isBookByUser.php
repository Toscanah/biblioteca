<?php
require_once("connection.php");
ob_start();

$request_body = file_get_contents("php://input");
$data = json_decode($request_body, true);
$userId = $data['userId'];
$elementId = $data['elementId'];

$check =
    "SELECT * FROM tPrenotazione
    WHERE tPrenotazione.idElemento = {$elementId} 
    AND tPrenotazione.idUtente = {$userId}";

$check_res = mysqli_query($db, $check);

$response = array();

if (mysqli_num_rows($check_res) > 0) {
    $response["result"] = true;
} else {
    $response["result"] = false;
}

echo json_encode($response);
