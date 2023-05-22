<?php
require_once("../connection.php");
ob_start();

$get_publishers = "SELECT * FROM tCasaEditrice";
$get_publishers_res = mysqli_query($db, $get_publishers);
echo json_encode(mysqli_fetch_all($get_publishers_res, MYSQLI_ASSOC));