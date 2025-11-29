
  var Y =75;
  var Yball = 85;
  var Xball = 160;
  var Yballcor = Yball- 2;
  var Xballcor = Xball-2;
  var Height = 50;
  var LeftRight = false;
  var UpDown = false;
  var count = 0;
  var Sscore = 0;
  var speed = 1;
  var SpeedY = 5;
  var Yenemy = 0;
  var Circle = 5;
  setTextSize(5);
  setTextColor(color(155, 188, 15));
fillScreen(color(15, 56, 15));
  function getRandomNumber(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
  function player()
  {
    if(getPrevPress())
    {
        if(Y < 170- Height)
        {
          Y = Y+ SpeedY;
        }
    }
    if(getNextPress())
    {
      if(Y>= 5)
      {
          Y = Y- SpeedY;
      }
    }
    drawFillRect(310, Y, 5, Height, color(155, 188, 15));
  }
  function Enemy()
  {
    drawFillRect(5, Yenemy , 5, Height, color(155, 188, 15));
    if(Yball <=170 - Height + (Height/2) && Yball >= Height/2)
    {
      if(Xball <160)
      {
        Yenemy = Yball- (Height/2); 
      }
    }
  }
  function ball()
  {
    drawFillRect(Xballcor, Yballcor , Circle, Circle, color(155, 188, 15));
    BallXAnim();
    BallYAnim();
  }
  function BallXAnim()
  {
    if(Xball >= 320)
    {
      Xball = 160;
      Yball = 85;
      if(Sscore > 0)
      {
          Sscore= Sscore -Math.round(Sscore/2);
      }
    }
        if(LeftRight == false)
        {
            if(Xball >= 308 && Xball <=320)
            {
                if(Yball >= Y && Yball <= Y+ Height)
                {
                  Xball = Xball - speed;
                  LeftRight= true;
                  Sscore = Sscore + 1;
                  if(Height > 5){
                    Height = Height -1;
                    SpeedY  = SpeedY + 1;
                    }
                }
                else
                {
                  if(Xball >= 320)
                  {
                    Xball = 160;
                     if(Sscore > 0)
                     {
                      Sscore= Sscore - 1;
                     }
                  }
                  Xball = Xball + speed;
                }
            }
          else
          {
              Xball = Xball +speed;
          }
        }

        if(LeftRight == true)
        {
            if(Xball >= 5 && Xball <=10)
            {
                  Xball = Xball + speed;
                  LeftRight= false;
                  if(Height > 5){Height = Height -1;}
            }
          else
          {
              Xball = Xball -1;
          }
        }
  }
  function BallYAnim()
  {
        if(UpDown == false)
        {
            Yball = Yball - speed;
            if(Yball <=0)
            {
                  UpDown= true;
            }
        }
        if(UpDown == true)
        {
            Yball = Yball + speed;
            if(Yball >=170)
            {
                  UpDown= false;
            }
        }
  }
  while(true)
  {
    if(Height == 20)
    {
      Circle = getRandomNumber(1, 20);
      setTextSize(2);
      setTextColor(color(155, 188, 15));
      drawString('Level Up!', 100, 85);
      Height = 50+ count;
      SpeedY= 5;
      count = count + 1;
    }
    /*drawString(String(Y+Height), 5, 0);
    drawString(String(Yball), 5, 30);
    drawString(String(Xball), 5, 60);*/
    setTextSize(5);
    drawString(String(Sscore), 180, 0);
    Yballcor = Yball- 2;
    Xballcor = Xball-2;
    player();
    ball();
    Enemy();
    if(getSelPress()){break}
    delay(6);
    drawFillRect(160, 0, 2, 170, color(155, 188, 15));//16777215
    if(Sscore< 999){
    drawFillRect(Xballcor, Yballcor , Circle, Circle, color(15, 56, 15));
    drawFillRect(310, 0, 20, 170, color(15, 56, 15));
    drawFillRect(180, 0, 150, 50, color(15, 56, 15));
    drawFillRect(5, 0, 20, 170, color(15, 56, 15));
    }
  }
  //by _Froggyy__
  //тг @ImBestFemboyEver