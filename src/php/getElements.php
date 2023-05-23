<?php
require_once("connection.php");
ob_start();

$requestBody = file_get_contents('php://input');
$data = json_decode($requestBody, true);

$tables = array();

if ($data["elementFilters"] === null) {
    // if no filters were specified, then retrieve data from all tables
    $tables = array("tLibro", "tVolume", "tCartina");
} else {
    // otherwise retrieve data from specific tables
    if (in_array("Libri", $data["elementFilters"])) {
        $tables[] = "tLibro";
    }
    if (in_array("Enciclopedie", $data["elementFilters"])) {
        $tables[] = "tVolume";
    }
    if (in_array("Cartine", $data["elementFilters"])) {
        $tables[] = "tCartina";
    }
}

$search = $data["searchFilters"];

$products = array();
foreach ($tables as $table) {
    $get_elements =
        "SELECT 
            tElemento.*, {$table}.*, tCasaEditrice.nome AS casaEditrice,
            foto, tBiblioteca.nome AS nomeBiblioteca,
            GROUP_CONCAT(CONCAT(tAutore.nome, ' ', tAutore.cognome) SEPARATOR ' & ') AS autori
        FROM tElemento
            INNER JOIN {$table} ON {$table}.idElemento = tElemento.id
            INNER JOIN tFoto ON tFoto.id = {$table}.idFoto
            INNER JOIN tScaffale ON tScaffale.id = {$table}.idScaffale
            INNER JOIN tArmadio ON tArmadio.id = tScaffale.idArmadio
            INNER JOIN tStanza ON tStanza.id = tArmadio.idStanza
            INNER JOIN tBiblioteca ON tBiblioteca.id = tStanza.idBiblioteca
            INNER JOIN tProduzione ON tProduzione.idElemento = tElemento.id
            INNER JOIN tAutore ON tAutore.id = tProduzione.idAutore
            INNER JOIN tCasaEditrice ON tCasaEditrice.id = {$table}.idCasaEditrice
        
        WHERE 
            {$table}.titolo LIKE '%{$search}%' OR
            {$table}.annoPubblicazione LIKE '%{$search}%' OR
            {$table}.titolo LIKE '%{$search}%'
            
        GROUP BY tElemento.isbn";
    $get_elements_res = mysqli_query($db, $get_elements);
    $products = array_merge($products, mysqli_fetch_all($get_elements_res, MYSQLI_ASSOC));
}

echo json_encode($products);
