<?php
/**
 * Created by PhpStorm.
 * User: Rafael
 * Date: 6/10/2015
 * Time: 1:01 PM
 */
$from = $_GET['from'];
$to = $_GET['to'];
include("connect.php");
$link = Connection();
$query = "SELECT * FROM records WHERE date_time BETWEEN '$from' AND '$to'";
$result = mysql_query($query, $link);
$list = array();
if ($result === FALSE) {
    echo "No data";
} else {
    while ($rec = mysql_fetch_array($result, MYSQL_ASSOC)) {
        $list[] = array('receiver_id' => $rec['receiver_id'], 'broadcaster_id' => $rec['broadcaster_id'],
            'signal_strength' => $rec['signal_strength'], 'date_time' => $rec['date_time']);
    }
    echo json_encode($list);
}