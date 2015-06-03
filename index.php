<?php
/**
 * Created by PhpStorm.
 * User: Rafael
 * Date: 5/29/2015
 * Time: 4:23 PM
 */

	include("connect.php");

	$link=Connection();

	$result=mysql_query("SELECT * FROM records",$link);
?>

<html>
<head>
    <title>Arduino Web Server</title>
</head>
<body>
<h1>Read data from Arduino and perform the analysis to calculate the position</h1>

<table border="1" cellspacing="1" cellpadding="1">
    <tr>
        <td>&nbsp;Receiver ID&nbsp;</td>
        <td>&nbsp;Broadcaster ID&nbsp;</td>
        <td>&nbsp;Signal Strength&nbsp;</td>
        <td>&nbsp;Date&nbsp;</td>
    </tr>

    <?php
    if($result!==FALSE){
        while($row = mysql_fetch_array($result)) {
            printf("<tr><td> &nbsp;%s </td><td> &nbsp;%s&nbsp; </td><td> &nbsp;%s&nbsp; </td><td> &nbsp;%s&nbsp; </td></tr>",
                $row["receiver_id"], $row["broadcaster_id"], $row["signal_strength"], $row["time"]);
        }
        mysql_free_result($result);
        mysql_close();
    }
    ?>

</table>
</body>
</html>
