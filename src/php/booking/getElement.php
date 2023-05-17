<?php
require_once("../connection.php");
ob_start();

$request_body = file_get_contents("php://input");
$data = json_decode($request_body, true);
$isbn = $data["isbn"];

$get_element = "SELECT * FROM tElemento WHERE isbn={$isbn}";
$get_element_res = mysqli_query($db, $get_element);
$element = mysqli_fetch_assoc($get_element_res);

$type = $element["tipo"];
$id = $element["id"];

$table = "";
switch ($type) {
    case "libro":
        $table = "tLibro";
        break;
    case "enciclopedia":
        $table = "tVolume";
        break;
    case "carta geopolitica":
        $table = "tCartina";
        break;
}

$get_info =
    "SELECT
         {$table}.*,
         tipo, via, citta, civico, cap, foto, tBiblioteca.nome AS nomeBiblioteca,
         GROUP_CONCAT(CONCAT(tAutore.nome, ' ', tAutore.cognome) SEPARATOR ' - ') AS autori
    FROM {$table}
        INNER JOIN tElemento ON tElemento.id = {$table}.idElemento
        INNER JOIN tFoto ON tFoto.id = {$table}.idFoto
        INNER JOIN tScaffale ON tScaffale.id = {$table}.idScaffale
        INNER JOIN tArmadio ON tArmadio.id = tScaffale.idArmadio
        INNER JOIN tStanza ON tStanza.id = tArmadio.idStanza
        INNER JOIN tBiblioteca ON tBiblioteca.id = tStanza.idBiblioteca
        INNER JOIN tProduzione ON tProduzione.idElemento = tElemento.id
        INNER JOIN tAutore ON tAutore.id = tProduzione.idAutore
    WHERE {$table}.idElemento = {$id}";
$get_info_res = mysqli_query($db, $get_info);
echo json_encode(mysqli_fetch_assoc($get_info_res));