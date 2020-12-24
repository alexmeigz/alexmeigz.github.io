//Wheel of Fortune Project
unsigned long t;
int LEDs[] = {6, 9, 10, 11};
int currentLED = 0;
int numLEDs = 4;
bool state = false;

void setup(){
 Serial.begin(9600);
 pinMode(3, INPUT); // the start button
 pinMode(5, INPUT); // the stop button
}

void changeLights(){
  for(int i = 0; i < numLEDs; i++){
    if(i == currentLED){
      analogWrite(LEDs[i], 255);
    }
    else{
      analogWrite(LEDs[i], 0);
    }
  }
  currentLED = (currentLED + 1) % numLEDs;
}

void loop(){
  //update state when started
  if(state){
    changeLights();
  }
  
  //start button
  if (digitalRead(3) == HIGH){
    state = true;
    delay(200); // delay before starting
    Serial.println("Start spinning!");
  }

  //stop button
  else if (digitalRead(5) == HIGH){
    state = false;
    delay(200); // delay before ending
    Serial.println("STOP!");
  }

}
