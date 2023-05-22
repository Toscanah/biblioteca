<?php
require_once("../connection.php");
ob_start();

$request_body = file_get_contents("php://input");
$data = json_decode($request_body, true);
$closet = $data["closet"];

$get_rooms =
    "SELECT tScaffale.scaffale, tScaffale.id FROM tScaffale 
    INNER JOIN tArmadio ON tArmadio.id = '$closet'
    WHERE tScaffale.idArmadio = tArmadio.id";
$get_rooms_res = mysqli_query($db, $get_rooms);
echo json_encode(mysqli_fetch_all($get_rooms_res, MYSQLI_ASSOC));