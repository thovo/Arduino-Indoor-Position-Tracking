/**
 * Created by Rafael on 6/11/2015.
 */
(function ($) {
    $(document).ready(function () {
        // Global variables to store the size of the map, calculate by cm, the distance between the receivers and the broadcaster
        // and store the position of the receivers inside the map
        var canvas = document.getElementById("map");
        var ctx = canvas.getContext("2d");
        var cw = canvas.width;
        var ch = canvas.height;

        function reOffset() {
            var BB = canvas.getBoundingClientRect();
            offsetX = BB.left;
            offsetY = BB.top;
        }

        var offsetX, offsetY;
        reOffset();
        window.onscroll = function (e) {
            reOffset();
        };

        // The building width and height
        var drawMap = function (map, ctx) {

            // Draw the map
            ctx.fillStyle = "#ecf0f1";
            ctx.beginPath();
            ctx.rect(map.x, map.y, map.width, map.height);
            ctx.closePath();
            ctx.fill();
        };
        var map = {x: 0, y: 0, width: 400, height: 400};
        drawMap(map, ctx);
        //Position of receivers in the map
        var A = {x: 120, y: 0, r: 0, color: "rgba(46, 204, 113,0.75)"};
        var B = {x: 320, y: 110, r: 0, color: "rgba(241, 196, 15,0.75)"};
        var C = {x: 110, y: 350, r: 0, color: "rgba(52, 152, 219,0.75)"};
        var D = {x: 0, y: 175, r: 0, color: "rgba(211, 84, 0,0.75)"};
        var E = {x: 220, y: 0, r: 0, color: "rgba(192, 57, 43,0.75)"};
        var errorMessage = "";
        var getData = function () {
            // Get the current time, ask from server the data
            // between the current time - 1 minute and the current time + 30 second
            var t = new Date();
            var currentTimePlus30Seconds = t.getFullYear() + "-" +
                ((t.getMonth() + 1) < 10 ? "0" + (t.getMonth() + 1) : (t.getMonth() + 1)) + "-" + (t.getDate() < 10 ? "0" + t.getDate() : t.getDate() )
                + " " + t.getHours() + ":" + t.getMinutes() + ":" + (t.getSeconds() + 30 > 59 ? 59 : t.getSeconds() + 30);
            var currentTimeMinus1Minute = t.getFullYear() + "-" +
                ((t.getMonth() + 1) < 10 ? "0" + (t.getMonth() + 1) : (t.getMonth() + 1)) + "-" + (t.getDate() < 10 ? "0" + t.getDate() : t.getDate() )
                + " " + t.getHours() + ":" + (t.getMinutes() - 1 < 0 ? t.getMinutes() : t.getMinutes() - 1) + ":" + t.getSeconds();
            var url = "get.php";
            $.ajax({
                url: url,
                dataType: "json",
                data: {from: currentTimeMinus1Minute, to: currentTimePlus30Seconds},
                success: function (data) {
                    handleData(data);
                },
                fail: function () {
                    console.log("Error");
                }
            });
        };
        var distanceCalculation = function (sginal_strength) {
            // Convert the signal strength to distance based on these datas:
            return ((sginal_strength - 32) / 3);
        };
        var handleData = function (data) {
            // After get the data from database, handle data and pass it into the draw map function
            // Show data from database into information box
            if (data.length > 0) {
                var text = "";
                console.log(data.length);
                for (var i = 0, j = data.length; i < j; i++) {
                    text = "<p>The receiver id is " + data[i]["receiver_id"].toString() + " received signal from " + data[i]["broadcaster_id"] + " with signal strength is " + data[i]["signal_strength"].toString() + " at " + data[i]["date_time"].toString() + "</p>";
                    //console.log(data[i]);
                    infoBox(text);
                    var distance1 = null, distance2 = null, distance3 = null, distance4 = null, distance5 = null;
                    if (data[i]["receiver_id"] == 1) {
                        distance1 = Math.round(distanceCalculation(data[i]["signal_strength"]) * 100);
                        console.log(distance1);
                        if (distance1 <= 400) {
                            A.r = distance1;
                        }
                        console.log(A);
                    }
                    if (data[i]["receiver_id"] == 2) {
                        distance2 = Math.round(distanceCalculation(data[i]["signal_strength"]) * 100);
                        console.log(distance2);
                        if (distance2 <= 400) {
                            B.r = distance2;
                        }
                        console.log(B);
                    }
                    if (data[i]["receiver_id"] == 3) {
                        distance3 = Math.round(distanceCalculation(data[i]["signal_strength"]) * 100);
                        console.log(distance3);
                        if (distance3 <= 400) {
                            C.r = distance3;
                        }
                        console.log(C);
                    }
                    if (data[i]["receiver_id"] == 4) {
                        distance1 = Math.round(distanceCalculation(data[i]["signal_strength"]) * 100);
                        console.log(distance1);
                        if (distance4 < 400) {
                            D.r = distance4;
                        }
                        console.log(D);
                    }
                    if (data[i]["receiver_id"] == 5) {
                        distance1 = Math.round(distanceCalculation(data[i]["signal_strength"]) * 100);
                        console.log(distance1);
                        if (distance5 < 400) {
                            E.r = distance5;
                        }
                        console.log(E);
                    }
                }
                buildingMap(A, B, C, D, E, ctx);
            } else {
                errorMessage = "<p>No data, press Update Map button again to perform another request!</p>";
                infoBox(errorMessage);
            }
        };
        var infoBox = function (text) {
            $("#info").append(text);
        };
        var buildingMap = function (A, B, C, D, E, ctx) {
            var intersections = [];
            var AB = circleIntersections(A, B);
            var BC = circleIntersections(B, C);
            var CA = circleIntersections(C, A);
            if (AB) {
                intersections = intersections.concat(AB);
            }
            if (BC) {
                intersections = intersections.concat(BC);
            }
            if (CA) {
                intersections = intersections.concat(CA);
            }

            var triangle = [];
            for (var i = 0; i < intersections.length; i++) {
                var pt = intersections[i];
                if (ptIsInCircle(pt, A) && ptIsInCircle(pt, B) && ptIsInCircle(pt, C)) {
                    triangle.push(pt);
                }
            }

            if (triangle.length == 3) {
                ctx.beginPath();
                ctx.moveTo(triangle[0].x, triangle[0].y);
                ctx.lineTo(triangle[1].x, triangle[1].y);
                ctx.lineTo(triangle[2].x, triangle[2].y);
                ctx.closePath();
                ctx.stroke();
            }


            function drawCircle(circle, ctx) {
                // Draw the circle
                ctx.fillStyle = circle.color;
                ctx.strokeStyle = "black";
                ctx.beginPath();
                ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2, true);
                ctx.stroke();
                ctx.closePath();
                ctx.fill();
            }

            // Before drawing anything, clear the map first
            ctx.clearRect(0, 0, 400, 400);
            drawMap(map, ctx);
            drawCircle(A, ctx);
            drawCircle(B, ctx);
            drawCircle(C, ctx);
            drawCircle(D, ctx);
            drawCircle(E, ctx);
            // intersection points of 2 circles
            function circleIntersections(c0, c1) {
                var x0 = c0.x;
                var y0 = c0.y;
                var r0 = c0.r;
                var x1 = c1.x;
                var y1 = c1.y;
                var r1 = c1.r;

                // calc circles' proximity
                var dx = x1 - x0;
                var dy = y1 - y0;
                var d = Math.sqrt((dy * dy) + (dx * dx));

                // return if circles do not intersect.
                if (d > (r0 + r1)) {
                    return;
                }
                // return if one circle is contained in the other
                if (d < Math.abs(r0 - r1)) {
                    return;
                }

                // calc the 2 intersection points
                var a = ((r0 * r0) - (r1 * r1) + (d * d)) / (2.0 * d);
                var x2 = x0 + (dx * a / d);
                var y2 = y0 + (dy * a / d);
                var h = Math.sqrt((r0 * r0) - (a * a));
                var rx = -dy * (h / d);
                var ry = dx * (h / d);
                var xi = x2 + rx;
                var xi_prime = x2 - rx;
                var yi = y2 + ry;
                var yi_prime = y2 - ry;

                return ([{x: xi, y: yi}, {x: xi_prime, y: yi_prime}]);
            }

            function ptIsInCircle(pt, circle) {
                var dx = pt.x - circle.x;
                var dy = pt.y - circle.y;
                var r = circle.r + 1; // allow circle 1px expansion for rounding
                return (dx * dx + dy * dy <= r * r);
            }
        };
        $("#start").on("click", function () {
            getData();
        });
        $("tr").not(":even").addClass("row");
        $(".collapseTable").click(function () {
            $("table").slideToggle("fast");
        });

    });
}(jQuery));
