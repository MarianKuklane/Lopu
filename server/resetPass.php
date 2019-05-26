<?php

include 'config_file.php';

$message = '';

//Create connection
$connection = new mysql($host_name, $host_user, $host_password, $database_name);

if($connection->connect_error)
{
    die("Ühendust ei saadud: " . $connection->connect_error);
}

//Get the raw POST data
$rawData = file_get_contents("php://input");

//Convert data to JSON
$json = json_decode($rawData, true);

$username = $json['username'];
$password = $json['password'];

if($password != '')
{
    $query = "UPDATE personData SET password = '$password' WHERE username = '$username'";
    $query_result = $connection -> query($query);

    if($query_result == false)
    {
        $message = 'Parooli uuendamine nurjus';
    }
    else
    {
        $message = 'OK';
    }
    echo json_encode($message);
}

$connection->close();
?>