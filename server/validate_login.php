<?php

include 'config_file.php';

$mesasge = '';

//Create connection
$connection = new mysql($host_name, $host_user, $host_password, $database_name);

if($connection->connect_error)
{
    die("Ühendust ei saadud: " . $connection->connect_error);
}

//Get the raw POST data
$rawData = file_get_contents("php://input");

// Convert data to json
$json = json_decode($rawData, true);

$username = $json['username'];
$password = $json['password'];

if($username != '')
{
    $query = "SELECT * FROM personData where username = '$username' and password = '$password'";
    $query_result = $connection->query($query);

    if($query_result->num_rows == 0)
    {
        $mesasge = 'Logimine ebaõnnestus';
    }
    else
    {
        $mesasge = 'OK';
    }
    echo json_encode($mesasge);
}
else 
{
    echo "Valideerimisel kasutajanimi on puudu";
}

$connection->close();
?>