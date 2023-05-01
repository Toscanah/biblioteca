<?php
require_once("connection.php");
ob_start();

$products = array();

$get_books =
    "SELECT 
        isbn, titolo, descrizione, annoPubblicazione, stato, foto, 
        tBiblioteca.nome AS nomeBiblioteca, 'Libro' AS type,
        GROUP_CONCAT(CONCAT(tAutore.nome, ' ', tAutore.cognome) SEPARATOR ' - ') AS autori
    FROM tLibro
        INNER JOIN tFoto ON tFoto.id = tLibro.idFoto
        INNER JOIN tScaffale ON tScaffale.id = tLibro.idScaffale
        INNER JOIN tArmadio ON tArmadio.id = tScaffale.idArmadio
        INNER JOIN tStanza ON tStanza.id = tArmadio.idStanza
        INNER JOIN tBiblioteca ON tBiblioteca.id = tStanza.idBiblioteca
        LEFT JOIN tProduzione ON tProduzione.isbnOperato = tLibro.isbn
        LEFT JOIN tAutore ON tAutore.id = tProduzione.idAutore
    GROUP BY isbn";

$get_books_res = mysqli_query($db, $get_books);
while ($book = mysqli_fetch_assoc($get_books_res)) {
    $book['type'] = 'Libro';
    $products[] = $book;
}

$get_volumes =
    "SELECT 
        isbn, titolo, descrizione, annoPubblicazione, stato, foto, volume,
        tBiblioteca.nome AS nomeBiblioteca, 'Volume enciclopedia' AS type,
        GROUP_CONCAT(CONCAT(tAutore.nome, ' ', tAutore.cognome) SEPARATOR ' - ') AS autori
    FROM tVolume
        INNER JOIN tFoto ON tFoto.id = tVolume.idFoto
        INNER JOIN tScaffale ON tScaffale.id = tVolume.idScaffale
        INNER JOIN tArmadio ON tArmadio.id = tScaffale.idArmadio
        INNER JOIN tStanza ON tStanza.id = tArmadio.idStanza
        INNER JOIN tBiblioteca ON tBiblioteca.id = tStanza.idBiblioteca
        LEFT JOIN tProduzione ON tProduzione.isbnOperato = tVolume.isbn
        LEFT JOIN tAutore ON tAutore.id = tProduzione.idAutore
    GROUP BY isbn, volume";
$get_volumes_res = mysqli_query($db, $get_volumes);
while ($volume = mysqli_fetch_assoc($get_volumes_res)) {
    $volume['type'] = 'Volume enciclopedia';
    $products[] = $volume;
}

$get_map = 
    "SELECT 
        isbn, titolo, descrizione, annoPubblicazione, stato, foto,
        tBiblioteca.nome AS nomeBiblioteca, 'Carta geopolitica' AS type,
        GROUP_CONCAT(CONCAT(tAutore.nome, ' ', tAutore.cognome) SEPARATOR ' - ') AS autori
    FROM tCartaGeopolitica
        INNER JOIN tFoto ON tFoto.id = tCartaGeopolitica.idFoto
        INNER JOIN tScaffale ON tScaffale.id = tCartaGeopolitica.idScaffale
        INNER JOIN tArmadio ON tArmadio.id = tScaffale.idArmadio
        INNER JOIN tStanza ON tStanza.id = tArmadio.idStanza
        INNER JOIN tBiblioteca ON tBiblioteca.id = tStanza.idBiblioteca
        LEFT JOIN tProduzione ON tProduzione.isbnOperato = tCartaGeopolitica.isbn
        LEFT JOIN tAutore ON tAutore.id = tProduzione.idAutore
    GROUP BY isbn";
$get_map_res = mysqli_query($db, $get_map);
while ($map = mysqli_fetch_array($get_map_res)) {
    $map['type'] = 'Carta geopolitica';
    $products[] = $map;
}

echo json_encode($products);
