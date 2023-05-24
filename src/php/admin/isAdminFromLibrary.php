<?php
require_once("../connection.php");
ob_start();

$request_body = file_get_contents("php://input");
$data = json_decode($request_body, true);
$staffId = $data['staffId'];
$elementId = $data['elementId'];
$elementType = $data['elementType'];

$table = "";

switch (true) {
    case $elementType === "libro":
        $table = "tLibro";
        break;
    case $elementType === "enciclopedia":
        $table = "tVolume";
        break;
    case $elementType === "carta geopolitica":
        $table = "tCartina";
        break;
}

$check =
    "SELECT * FROM tAddetto
        INNER JOIN {$table} ON {$table}.idElemento = {$elementId}
        INNER JOIN tScaffale ON tScaffale.id = {$table}.idScaffale
        INNER JOIN tArmadio ON tArmadio.id = tScaffale.idArmadio
        INNER JOIN tStanza ON tStanza.id = tArmadio.idStanza
        INNER JOIN tBiblioteca ON tBiblioteca.id = tStanza.idBiblioteca

        WHERE tAddetto.id='$staffId' AND tAddetto.idBiblioteca = tBiblioteca.id
";
$check_res = mysqli_query($db, $check);

$response = array();

if (mysqli_num_rows($check_res) > 0) {
    $response["result"] = true;
} else {
    $response["result"] = false;
}

echo json_encode($response);
