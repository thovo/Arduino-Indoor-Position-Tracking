# Arduino-Indoor-Position-Tracking

## Project overview
Come from the idea of Marauder's Map of Harry Potter. How can we build a positioning system based on communication technologies that could be used to follow the user in the building or indoor environment?
![alt text](https://raw.githubusercontent.com/thovo/Arduino-Indoor-Position-Tracking/master/images/map.jpg "Map")

There is a lot of position tracking like GPS, Active Badge System used infrared, or WLAN-based system...Each system had its owns advantage and disadvantage.For further reading, you can check my report [here](https://github.com/thovo/Arduino-Indoor-Position-Tracking/blob/master/reports/Report.pdf "Report")

In our project, we considered to use Xbee shield to communicate and do position tracking.

## Project setup
To perform the experiment, you need at least some devices below:

1. 4 Arduino Uno boards: You can use another Arduino boards
2. 4 Xbee shield
3. 3 Ethernet shield
4. 1 Hub/Switch (optional)

**Web Server**

We use XAMPP to simplify the process. You may need to at least install Apache server, PHP and mySQL on your web server computer.

**Database Setup**

* User: root
* Password:
* Database: arduino
* Table: records(receiver_id, broadcaster_id, signal_strength, date_time)

The model of our project:
![alt text](https://raw.githubusercontent.com/thovo/Arduino-Indoor-Position-Tracking/master/images/model.png "Model")

## Experiment and Results
Due to the limitation of space and devices, we placed the 3 receivers in a small room of 4mx4m. We brought the broadcaster around the room and let the receivers sent the signal strength to the server. At the server, it would calculate the signal strength to distance and show us the position like this:

![alt text](https://raw.githubusercontent.com/thovo/Arduino-Indoor-Position-Tracking/master/images/intersection.png "Intersection")

Actually, in reality, each Xbee shield provided different signal strength for the same distance, lead to hard to write a good equation for the relationship between distance and signal strength. We will try to cover it in the next update.



