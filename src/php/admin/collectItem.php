<?php
require_once("../connection.php");
ob_start();

$request_body = file_get_contents("php://input");
$data = json_decode($request_body, true);
$id = $data["id"];
$elementId = $data["elementId"];

$update_booking = "UPDATE tPrenotazione SET stato='terminata'
    WHERE id = '{$id}'";
mysqli_query($db, $update_booking);

$staffId = intval(substr($_COOKIE["staff"], 2));
$currentDateTime = date("Y-m-d H:i:s");
$add_collect = "INSERT INTO tRitiro (dataRitiro, idPrenotazione, idAddetto)
    VALUES ('$currentDateTime', '$id', '$staffId')";
mysqli_query($db, $add_collect);

// Check if there are any active bookings for the element
$has_active_bookings = false;
$get_bookings = "SELECT COUNT(*) as count FROM tPrenotazione WHERE idElemento='$elementId' AND stato!='terminata'";
$get_bookings_res = mysqli_query($db, $get_bookings);

if ($get_bookings_res) {
    $row = mysqli_fetch_assoc($get_bookings_res);
    $has_active_bookings = $row['count'] > 0;
}

// Update the element's status based on the presence of active bookings
$new_status = $has_active_bookings ? 'prenotato' : 'disponibile';
$update_element = "UPDATE tElemento SET stato='$new_status' WHERE id = '$elementId'";
mysqli_query($db, $update_element);
