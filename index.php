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
include("header.php");
?>
<div class="container">
    <h1>Position tracking through radio</h1>

    <p>Read data from Arduino and perform the analysis to calculate the position</p>

    <div class="column table">
        <button class="collapseTable">Collapse table</button>
        <table border="1" cellspacing="1" cellpadding="1" class="flat-table flat-table-1">
            <tbody>
            <tr>
                <th>&nbsp;Receiver ID&nbsp;</th>
                <th>&nbsp;Broadcaster ID&nbsp;</th>
                <th>&nbsp;Signal Strength&nbsp;</th>
                <th>&nbsp;Date&nbsp;</th>
            </tr>

            <?php
            if ($result !== FALSE) {
                while ($row = mysql_fetch_array($result)) {
                    printf("<tr><td> &nbsp;%s </td><td> &nbsp;%s&nbsp; </td><td> &nbsp;%s&nbsp; </td><td> &nbsp;%s&nbsp; </td></tr>",
                        $row["receiver_id"], $row["broadcaster_id"], $row["signal_strength"], $row["date_time"]);
                }
                mysql_free_result($result);
                mysql_close();
            }
            ?>
            </tbody>

        </table>
    </div>

    <div class="column">
        <button id="start">Start</button>
        <canvas id="map" width="400" height="400"></canvas>
        <div id="info"></div>
    </div>
    <script src="scripts/main.js"></script>
</div>

<?php include("footer.php"); ?>
