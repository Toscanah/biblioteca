<?php
session_start();

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bibliotecacecchini";
$db = new mysqli($servername, $username, $password, $dbname);