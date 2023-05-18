<?php
require_once("../connection.php");
ob_start();

$request_body = file_get_contents("php://input");
$data = json_decode($request_body, true);
$id = $data["id"];
$isbn = $data["isbn"];

/**
 * 3 cose da fare:
 * - metti "in prestito" la prenotazione
 * - aggiungi il record del prestito
 * - metti "prestato" all'elemento
 */

$confirm_booking = "UPDATE tPrenotazione SET stato='in prestito' WHERE id={$id}";
mysqli_query($db, $confirm_booking);

$staffId = intval(substr($_COOKIE["staff"], 2));
$currentDateTime = date("Y-m-d H:i:s");
$add_loan = "INSERT INTO tPrestito (dataPrestito, idPrenotazione, idAddetto)
            VALUES ('{$currentDateTime}', '{$id}', '{$staffId}')";
mysqli_query($db, $add_loan);

$loan_element = "UPDATE tElemento SET stato='prestato' WHERE isbn='{$isbn}'";
mysqli_query($db, $loan_element);