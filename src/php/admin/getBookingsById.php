<?php
require_once("../connection.php");
ob_start();

$request_body = file_get_contents("php://input");
$data = json_decode($request_body, true);
$id = $data["id"];
// TODO: prendere tutto dalla query, anche l'utente

$get_bookings = 
    "SELECT 
        tPrenotazione.id AS idPrenotazione 
    FROM tPrenotazione
    WHERE idElemento={$id}
    ORDER BY tPrenotazione.dataPrenotazione ASC";
$get_bookings_res = mysqli_query($db, $get_bookings);
echo json_encode(mysqli_fetch_assoc($get_bookings_res));