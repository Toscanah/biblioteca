<?php
require_once("../connection.php");
ob_start();

$request_body = file_get_contents("php://input");
$data = json_decode($request_body, true);
$userId = $data["userId"];
$isbn = $data["isbn"];

$date = new DateTime();
$formatted_date = $date->format('Y-m-d H-m-s');

$add_booking =
    "INSERT INTO tPrenotazione
    (idElemento, dataPrenotazione, stato, idUtente)
    VALUES (
        (SELECT id FROM tElemento WHERE isbn={$isbn}),
        '{$formatted_date}', 'da confermare', {$userId})";
mysqli_query($db, $add_booking);

// mettere stato dell'elemento = "Prenotato"
$update_element = "UPDATE tElemento SET stato='prenotato' WHERE isbn={$isbn}";
mysqli_query($db, $update_element);