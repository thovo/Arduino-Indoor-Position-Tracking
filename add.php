<?php
/**
 * Created by PhpStorm.
 * User: Rafael
 * Date: 6/3/2015
 * Time: 4:43 PM
 */
$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "arduino";

//making an array with the data recieved, to use as named placeholders for INSERT by PDO.
$data = array('receiver_id' => $_POST['id'], 'broadcaster_id' => $_POST['bid'], 'signal_strength' => $_POST['s']);

try {
    // preparing database handle $dbh
    $dbh = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // set the PDO error mode to exception
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // query with named placeholders to avoid sql injections
    $query = "INSERT INTO records (receiver_id, broadcaster_id, signal_strength, date_time)
              VALUES (:receiver_id, :broadcaster_id, :signal_strength , CURRENT_TIMESTAMP )";
    //statement handle $sth
    $sth = $dbh->prepare($query);
    $sth->execute($data);
    echo "New record created successfully";
} catch (PDOException $e) {
    echo $sql . "<br>" . $e->getMessage();
}
$dbh = null;
sleep(1);
header('Location:index.php');
?>