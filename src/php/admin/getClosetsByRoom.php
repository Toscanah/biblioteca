<?php
require_once("../connection.php");
ob_start();

$request_body = file_get_contents("php://input");
$data = json_decode($request_body, true);
$room = $data["room"];

$get_rooms =
    "SELECT tArmadio.armadio, tArmadio.id FROM tArmadio 
    INNER JOIN tStanza ON tStanza.id = '$room'
    WHERE tArmadio.idStanza = tStanza.id";
$get_rooms_res = mysqli_query($db, $get_rooms);
echo json_encode(mysqli_fetch_all($get_rooms_res, MYSQLI_ASSOC));