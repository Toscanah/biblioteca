<?php
require_once("../connection.php");
ob_start();

$request_body = file_get_contents("php://input");
$data = json_decode($request_body, true);
$id = $data["id"];
// TODO: prendere tutto dalla query, anche l'utente

$get_bookings = 
    "SELECT 
        tPrenotazione.id AS idPrenotazione, tPrenotazione.dataPrenotazione AS data,
        tPrenotazione.stato, tUtente.*
    FROM tPrenotazione
        INNER JOIN tUtente ON tUtente.id = tPrenotazione.idUtente
        WHERE idElemento={$id}
        ORDER BY tPrenotazione.dataPrenotazione ASC";
$get_bookings_res = mysqli_query($db, $get_bookings);
echo json_encode(mysqli_fetch_all($get_bookings_res, MYSQLI_ASSOC));