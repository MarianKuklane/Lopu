<?php

include 'config_file.php';

$message = '';

// Create connection 
$connection = new mysql($host_name, $host_user, $host_password, $database_name);

if($connection->connect_error)
{
    die("Ühendust ei saadud: " . $connection->connect_error);
}

//Get the raw POST data
$rawData = file_get_contents("php://input");

//Convert data to json
$json = json_decode($rawData, true);

$username = $json['username'];

if($username != '')
{
    $query = "SELECT * FROM timeBooking where username = '$username'";
    $query_result = $connection->query($query);

    if($query_result->num_rows > 0)
    {
        $message = $query_result->fetch_assoc();
    }
    else
    {
        $message = 'Viga';
    }
    echo json_encode($message);
}
else
{
    echo 'Inimese kohta andmeid ei leitud';
}

$connection->close();
?>

?>