<?php

include 'config_file.php';

//Create connection
$connection = new mysql($host_name, $host_user,$host_password, $database_name);

if($connection->connect_error)
{
    die("Ühendusr ei saadud" . $connection->connect_error);
}

$query = "SELECT * FROM timeBooking";
$query_result = $connection->query($query);

if($query_result->num_rows > 0)
{
    $rows = array();
    while($rows = $query_result->fetch_assoc())
    {
        $rows[] =$row;
    }
    $out = array_values($rows);
    echo json_encode($out, JSON_FORCE_OBJECT);
}
else
{
    echo "Ridu ei leitud";
}
$connection->close();
?>
