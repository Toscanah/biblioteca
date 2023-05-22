<?php
require_once("../connection.php");
ob_start();

$request_body = file_get_contents("php://input");
$data = json_decode($request_body, true);

$table = "";
$joinTable = "";
$joinValue = "";

switch (true) {
    case isset($data["library"]):
        $table = "tStanza";
        $joinTable = "Biblioteca";
        $joinValue = $data["library"];
        break;

    case isset($data["room"]):
        $table = "tArmadio";
        $joinTable = "Stanza";
        $joinValue = $data["room"];
        break;

    case isset($data["closet"]):
        $table = "tScaffale";
        $joinTable = "Armadio";
        $joinValue = $data["closet"];
        break;
}

$get_elements =
    "SELECT {$table}.* FROM {$table}
    INNER JOIN t{$joinTable} ON t{$joinTable}.id = {$joinValue}
    WHERE {$table}.id{$joinTable} = t{$joinTable}.id";
$get_elements_res = mysqli_query($db, $get_elements);

$rows = mysqli_fetch_all($get_elements_res, MYSQLI_NUM);

$result = array();

foreach ($rows as $row) {
    $item = array();
    $item["id"] = $row[0];
    $item["info"] = $row[1];
    $result[] = $item;
}

echo json_encode($result);