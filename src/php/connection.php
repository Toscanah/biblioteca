<?php
session_start();

$servername = "localhost";
$username = "username";
$password = "";
$dbname = "bibliotecacecchini";
$db = new mysqli($servername, $username, $password, $dbname);