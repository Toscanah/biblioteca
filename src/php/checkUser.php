<?php
require_once("connection.php");
ob_start();

$request_body = file_get_contents("php://input");
$data = json_decode($request_body, true);

$result = array();

$email = $data["email"];
$password = $data["password"];

$get_account = "SELECT * FROM tUtente WHERE email='$email' AND password='$password'";
$get_account_res = mysqli_query($db, $get_account);

// qualcosa è stato trovato NEGLI UTENTI NORMALI
if (mysqli_num_rows($get_account_res) !== 0) {
    $_SESSION["logged"] = true;
    $user = mysqli_fetch_assoc($get_account_res);

    $result["user"] = "found";
    $result["type"] = "user";
    $result["id"] = $user["id"];
    $result["info"] = $user["nome"][0] . $user["cognome"][0];
} else { // altrimenti prova a vedere lo staff
    $get_staff = "SELECT * FROM tAddetto WHERE email='$email' AND password='$password'";
    $get_staff_res = mysqli_query($db, $get_staff);

    if (mysqli_num_rows($get_staff_res) !== 0) {
        $_SESSION["logged"] = true;
        $staff = mysqli_fetch_assoc($get_staff_res);

        $result["user"] = "found";
        $result["type"] = "staff";
        $result["id"] = $staff["id"];
        $result["info"] = $staff["nome"][0] . $info["cognome"][0];
    } else { // se anche nello staff non c'è niente allora nessun login trovato
        $result["user"] = "not_found";
    }
}

echo json_encode($result);