<?php
require_once("connection.php");
ob_start();

$get_sites = "SELECT * FROM tbiblioteca";
$get_sites_res = mysqli_query($db, $get_sites);
$sites = array();

echo json_encode(mysqli_fetch_all($get_sites_res, MYSQLI_ASSOC));