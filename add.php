<?php
/**
 * Created by PhpStorm.
 * User: Rafael
 * Date: 6/3/2015
 * Time: 4:43 PM
 */
    $link=Connection();

    $receiver_id=$_GET["id"];
    $broadcaster_id=$_GET["bid"];
    $signal_strength=$_GET["s"];
    $query = "INSERT INTO records ('receiver_id', 'broadcaster_id', 'signal_strength', 'time')
            VALUES ('".$receiver_id."','".$broadcaster_id."','".$signal_strength."',CURRENT_TIME())";

    mysql_query($query,$link);
    mysql_close($link);

    header("Location: index.php");

?>