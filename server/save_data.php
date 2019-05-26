<?php

include 'config_file.php';

$message = '';

//Create connection
$connection = new mysql($host_name, $host_user, $host_password, $database_name);

if($connection->connect_error)
{
    die("Ühendust ei saadud: " .$connection->connect_error);
}

//Get the raw POST data
$rawData = file_get_contents("php://input");

//Convert data to json
$json = json_decode($rawData, true);

$comment = $json['comment'];
$place = $json['place'];
$chosenData = $json['chosendata'];
$workType = $json['workType'];
$workDuration = $json['workDuration'];
$username = $json['username'];

if($username != '')
{
    $dataQuery = "INSERT INTO timeBooking(comment, place, date, workType, workDuration, username) VALUES ('$comment', '$place', '$date', '$workType', '$workDuration', '$username')";
    $query_result = $connection->query($dataQuery);

    if($query_result == false)
    {
        $message = 'Ei toota teine!';
        echo nl2br("Teine paring ei toota: $connection->error \n");
    }
    else
    {
        $message = 'OK2';
    }

    echo json_encode($message);
}
$connection->close();
?>