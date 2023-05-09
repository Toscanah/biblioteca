<?php
require_once("connection.php");
ob_start();

$get_sites = "SELECT * FROM tbiblioteca";
$get_sites_res = mysqli_query($db, $get_sites);
$sites = array();

while ($row = mysqli_fetch_array($get_sites_res)) {
    $sites[] = $row;
}

echo json_encode($sites);