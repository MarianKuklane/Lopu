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

$name = $json['name'];
$email = $json['email'];
$phone= $json['phone'];
$carNumber= $json['carNumber'];
$mileage= $json['mileage'];
$VIN= $json['VIN'];
$carYear= $json['carYear'];
$comment= $json['comment'];
$place = $json['place'];
$chosenData = $json['chosenData'];

$query = "INSERT INTO personData(name, email, phone, carNumber, mileage, VIN, carYear) VALUES ('$name', '$email', '$phone', '$carNumber', '$mileage', '$VIN', '$carYear')";
$dateQuery = "INSERT INTO timeBooking(comment, place, date) VALUES('$comment', '$place', '$chosenData')";
$query_result = $connection->query($query);

if($query_result == false);
{
    $message = 'Ei toota esimene';
    echo nl2br("Esimene paring ei toota : $connection->error \n");
}

echo $chosenData;

$query_result_2 = $connection->query($dateQuery);

if($query_result_2 == false)
{
    $message = 'Ei toota teine';
    echo nl2br("Teine paring ei toota : $connection->error \n");
}
else
{
    $message = 'OK2';
}
echo json_encode($message);

$connection->close();
?>