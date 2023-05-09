<?php
require_once("connection.php");
ob_start();

$products = array();
$tables = array("tLibro", "tVolume", "tCartaGeopolitica");
foreach ($tables as $table) {
    $get_element =
        "SELECT 
            tElemento.*, {$table}.*, 
            foto, tBiblioteca.nome AS nomeBiblioteca,
            GROUP_CONCAT(CONCAT(tAutore.nome, ' ', tAutore.cognome) SEPARATOR ' - ') AS autori
        FROM tElemento
            INNER JOIN {$table} ON {$table}.idElemento = tElemento.id
            INNER JOIN tFoto ON tFoto.id = {$table}.idFoto
            INNER JOIN tScaffale ON tScaffale.id = {$table}.idScaffale
            INNER JOIN tArmadio ON tArmadio.id = tScaffale.idArmadio
            INNER JOIN tStanza ON tStanza.id = tArmadio.idStanza
            INNER JOIN tBiblioteca ON tBiblioteca.id = tStanza.idBiblioteca
            INNER JOIN tProduzione ON tProduzione.idElemento = tElemento.id
            INNER JOIN tAutore ON tAutore.id = tProduzione.idAutore
        GROUP BY tElemento.isbn";
    $get_element_res = mysqli_query($db, $get_element);
    $products = array_merge($products, mysqli_fetch_all($get_element_res, MYSQLI_ASSOC));
}

echo json_encode($products);