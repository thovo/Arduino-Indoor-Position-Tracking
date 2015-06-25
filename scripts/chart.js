/**
 * Created by Rafael on 6/18/2015.
 */

(function ($) {

    $.ajax({
        url: "records.json",
        dataType: "json",
        success: function (data) {
            console.log(data);
            drawChart(data);
        },
        fail: function () {
            console.log("Error");
        }
    });
    var drawChart = function (data) {
        var time = [];
        var signal_strength = [];
        var receiver1_data = [];
        var receiver1_time = [];
        var receiver3_data = [];
        var receiver3_time = [];
        var receiver4_data = [];
        var receiver4_time = [];
        var receiver5_data = [];
        var receiver5_time = [];
        var date = null;
        for (var i = 0, j = data.length; i < j; i++) {
            date = new Date(data[i]["date_time"]);
            if (date.getMinutes() < 20) {
                time.push(data[i]["date_time"]);
                signal_strength.push((data[i]["signal_strength"]));
                if (data[i]["receiver_id"] == 1) {
                    receiver1_data.push(data[i]["signal_strength"]);
                    receiver1_time.push(data[i]["date_time"]);
                }
                if (data[i]["receiver_id"] == 3) {
                    receiver3_data.push(data[i]["signal_strength"]);
                    receiver3_time.push(data[i]["date_time"]);
                }
                if (data[i]["receiver_id"] == 4) {
                    receiver4_data.push(data[i]["signal_strength"]);
                    receiver4_time.push(data[i]["date_time"]);
                }
                if (data[i]["receiver_id"] == 5) {
                    receiver5_data.push(data[i]["signal_strength"]);
                    receiver5_time.push(data[i]["date_time"]);
                }
            }
        }

        var line_data = {
            labels: time,
            datasets: [
                {
                    label: "Data",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "green",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: signal_strength
                }
            ]
        };
        var line_data1 = {
            labels: receiver1_time,
            datasets: [
                {
                    label: "Receiver 1",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "green",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: receiver1_data
                }
            ]
        };
        var line_data3 = {
            labels: receiver3_time,
            datasets: [
                {
                    label: "Receiver 3",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "blue",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: receiver3_data
                }
            ]
        };
        var line_data4 = {
            labels: receiver4_time,
            datasets: [
                {
                    label: "Receiver 3",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "orange",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: receiver4_data
                }
            ]
        };
        var line_data5 = {
            labels: receiver5_time,
            datasets: [
                {
                    label: "Receiver 3",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "violet",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: receiver5_data
                }
            ]
        };
        // Get the context of the canvas element we want to select
        var ctx = document.getElementById("myChart").getContext("2d");
        var myLineChart = new Chart(ctx).Line(line_data);
        //myLineChart.addData(line_data3,receiver3_time);
        //myLineChart.addData(line_data4,receiver4_time);
        //myLineChart.addData(line_data5,receiver5_time);
        //myLineChart.update();
    }


}(jQuery));