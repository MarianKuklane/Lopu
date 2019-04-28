<?php
 
include 'config_file.php';
 
$message = '';
 
//Create connection
$connection = new mysqli($host_name, $host_user, $host_password, $database_name);

 
if ($connection->connect_error)
{
 die("Ühendust ei saadud: " . $connection->connect_error);
} 
 
// get the raw POST data
$rawData = file_get_contents("php://input");

//convert data to json
$json = json_decode($rawData, true);

$name = $json['name'];
$email = $json['email'];
$phone = $json['phone'];
$carNumber = $json['carNumber'];
$mileage = $json['mileage'];
$VIN = $json['VIN'];
$carYear = $json['carYear'];

$comment = $json['comment'];
$place = $json['place'];
$chosenDate = $json['chosenDate'];

$check = mysqli_fetch_array(mysqli_query($connection,$CheckSQL));

$query = "INSERT INTO personData(name, email, phone, carNumber, mileage, VIN, carYear) values('$name', '$email', '$phone', '$carNumber', '$mileage', '$VIN', '$carYear')";
$dateQuery = "INSERT INTO timeBooking(comment, place, chosenDate) values('$comment', '$place', '$chosenDate')";

$query_result = $connection->query($query);
$query_result_2 = $connection->query($dateQuery);

 
if ($query_result === true)
{
 $message = 'Õnnestus!';
}
 
else
{
 $message = 'Error! Try Again.';
}
 
echo json_encode($message);
 
$connection->close();

?>
