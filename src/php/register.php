<?php
require_once("connection.php");
ob_start();

$request_body = file_get_contents("php://input");
$data = json_decode($request_body, true);

$name = $data["name"];
$surname = $data["surname"];
$cf = $data["cf"];
$email = $data["email"];
$password = $data["password"];

$get_account = "SELECT * FROM tUtente WHERE email='$email' AND password='$password'";
$get_account_res = mysqli_query($db, $get_account);

$result = array();

if (mysqli_num_rows($get_account_res) == 0) {
    $add_account = "INSERT INTO tUtente 
                    (nome, cognome, cf, email, password)
                    VALUES ('$name', '$surname', '$cf', '$email', '$password')";
    mysqli_query($db, $add_account);
    $result["type"] = "account_added";
} else {
    $result["type"] = "already_registered";
}

echo json_encode($result);
