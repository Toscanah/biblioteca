<?php
require_once("../connection.php");
ob_start();

$request_body = file_get_contents("php://input");
$data = json_decode($request_body, true);
$library = $data["library"];

$get_rooms =
    "SELECT tStanza.stanza, tStanza.id FROM tStanza 
    INNER JOIN tBiblioteca ON tBiblioteca.id = '$library'
    WHERE tStanza.idBiblioteca = tBiblioteca.id";
$get_rooms_res = mysqli_query($db, $get_rooms);
echo json_encode(mysqli_fetch_all($get_rooms_res, MYSQLI_ASSOC));