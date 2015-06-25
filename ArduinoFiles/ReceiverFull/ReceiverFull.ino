#include <Ethernet.h>           //library for ethernet functions
#include <SPI.h>
#include <Client.h>             //library for client functions

// Ethernet settings
byte mac[] = {0xCA, 0xFE, 0x00, 0x00, 0x00, 0x16}; //Replace with your Ethernet shield MAC
byte ip[] = { 192, 168, 1, 16}; //The Arduino device IP address
IPAddress server(192, 168, 1, 2);               // IP-adress of server arduino sends data to

EthernetClient client;
String data;
String request ;
int broadcaster_id;
int signal_strength;
unsigned long lastConnectionTime = 0;             // last time you connected to the server, in milliseconds
const unsigned long postingInterval = 10L * 1000L; // delay between updates, in milliseconds
// the "L" is needed to use long type numbers


void setup(void) {
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for Leonardo only
  }
  delay(1000);
  Ethernet.begin(mac, ip);
}

void loop(void) {
  // Read what server says and discard it
  if (client.available()) {
    char c = client.read();
  }
  if (millis() - lastConnectionTime > postingInterval) {
    if (Serial.available() > 0) {
      broadcaster_id = Serial.read();
      Serial.print("Capture the broadcaster id:");
      Serial.println(broadcaster_id);
      while (broadcaster_id > 10 || broadcaster_id < 0) {
        broadcaster_id = Serial.read(); //read again to ensure to get correct id of broadcaster
        Serial.print("Incorrect bid: ");
        Serial.println(broadcaster_id);
      }
      if (broadcaster_id < 10 && broadcaster_id > 0) {
        Serial.print("The broadcaster id is ");
        Serial.println(broadcaster_id);
      }
      signal_strength = receiver_checker();
      while (signal_strength < 10){
        signal_strength = receiver_checker();
        Serial.print("The signal strength is ");
        Serial.println(signal_strength);
      }      
    }
    httpRequest();
  }
}

void httpRequest() {
  // close any connection before send a new request.
  // This will free the socket on the WiFi shield
  client.stop();
  if (broadcaster_id != 0 && signal_strength != 0) {
    if (client.connect(server, 80)) {
      Serial.println("Connected");
      data = "id=5&bid="; // id = 5 for receiver number 5
      data = data + broadcaster_id;
      data = data + "&s=";
      data = data + signal_strength;
      Serial.println(data);
      Serial.println("Sending data to server");
      client.println("POST /add.php HTTP/1.1");
      client.println("Host: www.arduinowebserver.com");
      client.println("Content-Type: application/x-www-form-urlencoded");
      client.print("Content-Length: ");
      client.println(40);
      client.println();
      client.print(data);
      delay(1000);
      Serial.println("Sending completed");
      Serial.println();
      lastConnectionTime = millis();
      client.stop();
    }
    else {
      Serial.println("Cannot connect to Server");
    }
  }
}

int receiver_checker() {
  int signal;
  int retval = 0;
  delay(1200);
  Serial.print("+++");
  delay(1200);
  bool bOK = false;
  while (Serial.available() > 0) {
    Serial.write(Serial.read());
    bOK = true;
  }

  if (bOK)
  {
    Serial.println();
    Serial.println("ATDB");
    delay(100);
    while (Serial.available() > 0) {
      signal = Serial.read();
      if (signal >= '0' && signal <= '9') {
        retval = retval * 10 + (signal - '0');
      }
    }
    Serial.println();
  }
  Serial.println();
  return retval;
}
