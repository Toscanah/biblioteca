<?php
require_once("../connection.php");
ob_start();

$get_bookstores = "SELECT * FROM tBiblioteca";
$get_bookstores_res = mysqli_query($db, $get_bookstores);
echo json_encode(mysqli_fetch_all($get_bookstores_res, MYSQLI_ASSOC));