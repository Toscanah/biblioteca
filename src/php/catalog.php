<?php
require_once("connection.php");
ob_start();

$products = array();

$get_books = "SELECT *, 'Libro' AS type FROM tLibro INNER JOIN tFoto ON tFoto.id = tLibro.idFoto";
$get_books_res = mysqli_query($db, $get_books);
while ($book = mysqli_fetch_array($get_books_res)) {
    $book['type'] = 'Libro';
    $products[] = $book;
}

$get_volumes = "SELECT *, 'Volume enciclopedia' AS type FROM tVolume";
$get_volumes_res = mysqli_query($db, $get_volumes);
while ($volume = mysqli_fetch_array($get_volumes_res)) {
    $volume['type'] = 'Volume enciclopedia';
    $products[] = $volume;
}

$get_map = "SELECT *, 'Carta geopolitica' AS type FROM tCartaGeopolitica";
$get_map_res = mysqli_query($db, $get_map);
while ($map = mysqli_fetch_array($get_map_res)) {
    $map['type'] = 'Carta geopolitica';
    $products[] = $map;
}

echo json_encode($products);