<?php
require_once("connection.php");
ob_start();

$user = $_COOKIE["user"];
$id = substr($user, 2, 1);

$get_bookings =
    "SELECT tElemento.tipo, tElemento.id AS idElemento, tPrenotazione.id AS id FROM tPrenotazione 
    INNER JOIN tElemento ON tElemento.id = tPrenotazione.idElemento
WHERE idUtente = '$id'";
$get_bookings_res = mysqli_query($db, $get_bookings);

$bookings = array();

while ($row = mysqli_fetch_array($get_bookings_res)) {
    $id = $row["id"];
    $elementId = $row["idElemento"];
    $table = "";

    if ($row["tipo"] == "libro") {
        $table = "tLibro";
    } else if ($row["tipo"] == "enciclopedia") {
        $table = "tVolume";
    } else if ($row["tipo"] == "carta geopolitica") {
        $table = "tCartina";
    }

    $get_full =
        "SELECT * FROM tPrenotazione
        INNER JOIN {$table} ON {$table}.idElemento = {$elementId}
        WHERE tPrenotazione.id = {$id}";
    $get_full_res = mysqli_query($db, $get_full);
    $bookings = array_merge($bookings, mysqli_fetch_all($get_full_res, MYSQLI_ASSOC));
}

echo json_encode($bookings);
