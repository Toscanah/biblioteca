<?php
require_once("connection.php");
ob_start();

$request_body = file_get_contents("php://input");
$data = json_decode($request_body, true);

$email = $data["email"];
$password = $data["password"];

$get_account = "SELECT * FROM tUtente WHERE email='$email' AND password='$password'";
$get_account_res = mysqli_query($db, $get_account);

$result = array();
$result["user"] = mysqli_num_rows($get_account_res) !== 0 ? "found" : "not found"; 
if ($result["user"] == "found") {
    $info = mysqli_fetch_assoc($get_account_res);
    $result["id"] = $info["id"];
    $result["info"] = $info["nome"][0] . $info["cognome"][0];
}

echo json_encode($result);