<?php
require_once("connection.php");
ob_start();

$request_body = file_get_contents("php://input");
$data = json_decode($request_body, true);
$isbn = $data["isbn"];

// info generali
$get_element =
    "SELECT id FROM tElemento 
    INNER JOIN tLibro ON tLibro.idElemento = tElemento.id
    INNER JOIN tVolume ON tVolume.idElemento = tElemento.id
    INNER JOIN tCartaGeopolitica ON tCartaGeopolitica.idElemento = tElemento.id
    WHERE isbn = '$isbn'";
$get_element_res = mysqli_query($db, $get_element);

echo json_encode($result);