const allanswers = ['Yes', 'No', 'Definitely yes', 'Yes, most likely', 'Probably', 'No', 'Definitely not', 'No, most likely', 
                    "Don't know", 'Cannot predict now', 'Ask again later']

function getRandomNumber(min, max) {
    
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getansw() {
    var answer = allanswers[getRandomNumber(0,10)];
    fillScreen(0);
    drawString("Magic 8-ball", 3 , 32);
    drawString("is thinking...", 3 , 70);
    delay(getRandomNumber(1500,3000));
    fillScreen(0);
    while(true){
        drawString("Answer: ", 3 , 32);
        drawString(answer, 3 , 52);
        drawString("Click M5", 3 , 82);
        drawString("to exit.", 3 , 102);
        delay(100);
        if(getAnyPress()) break;
    }
}

while(true)
{  
  var choice = dialogChoice([
    "Get answer", "getanswer",
    ]
  )
  
  if(choice=="") break;  
  else if(choice=="getanswer") getansw();
  
  fillScreen(0);
}
