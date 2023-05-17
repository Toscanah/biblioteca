<?php
require_once("connection.php");
ob_start();

$requestBody = file_get_contents('php://input');
$data = json_decode($requestBody, true);

$tables = array();

if ($data === null) {
    // if no filters were specified, then retrieve data from all tables
    $tables = array("tLibro", "tVolume", "tCartina");
} else {
    // otherwise retrieve data from specific tables
    if (in_array("Libri", $data)) {
        $tables[] = "tLibro";
    }
    if (in_array("Enciclopedie", $data)) {
        $tables[] = "tVolume";
    }
    if (in_array("Cartine", $data)) {
        $tables[] = "tCartina";
    }
}

$products = array();
foreach ($tables as $table) {
    $get_element =
        "SELECT 
            tElemento.*, {$table}.*, 
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
        GROUP BY tElemento.isbn";
    $get_element_res = mysqli_query($db, $get_element);
    $products = array_merge($products, mysqli_fetch_all($get_element_res, MYSQLI_ASSOC));
}

echo json_encode($products);
