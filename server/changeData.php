<?php

include 'config_file.php';

$message= '';

//Create connection
$connection = new mysql($host_name, $host_user, $host_password, $database_name);

if($connection->connect_error)
{
    die("Ühendust ei saadud" . $connection->connect_error);
}

//Get the raw POST data
$rawData = file_get_contents("php://input");

//Convert data to json
$json = json_decode($rawData, true);

$username = $json['username'];
$name = $json['name'];
$phone = $json['phone'];
$email = $json['email'];
$carNumber = $json['carNumber'];

$count = 0;

if(($username != '') && ($name != ''))
{
    $query = "UPDATE personData SET name = '$name' WHERE username= '$username";
    $query_result = $connection->query($query);

    if($query_result == false)
    {
        $message = 'Andmete uuendamine ebaõnnestus';
    }
    else
    {
        $mesage = 'OK';
    }
    $count++;
}

if(($username != '') && ($phone != ''))
{
    $query = "UPDATE personData SET phone = '$phone' WHERE username= '$username";
    $query_result = $connection->query($query);

    if($query_result == false)
    {
        $message = 'Andmete uuendamine ebaõnnestus';
    }
    else
    {
        $mesage = 'OK';
    }
    $count++;
}

if(($username != '') && ($email != ''))
{
    $query = "UPDATE personData SET email = '$email' WHERE username= '$username";
    $query_result = $connection->query($query);

    if($query_result == false)
    {
        $message = 'Andmete uuendamine ebaõnnestus';
    }
    else
    {
        $mesage = 'OK';
    }
    $count++;
}

if(($username != '') && ($carNumber != ''))
{
    $query = "UPDATE personData SET carNumber = '$carNumber' WHERE username= '$username";
    $query_result = $connection->query($query);

    if($query_result == false)
    {
        $message = 'Andmete uuendamine ebaõnnestus';
    }
    else
    {
        $mesage = 'OK';
    }
    $count++;
}

if($count > 0)
{
    echo json_encode($mesage);
}

$connection->close();
?>