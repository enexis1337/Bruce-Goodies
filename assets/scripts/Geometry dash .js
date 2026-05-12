
var playerX = 30;
var playerY = 140; 
var playerSize = 10;
var playerSpeedY = 0;
var gravity = 0.6;
var jumpForce = -10;
var groundLevel = 160;
var obstacleWidth = 15; 
var obstacleHeight = 20;
var obstacleSpacing = 15;  
var obstacleSpeed = 5;
var scrollSpeed = 5;
var score = 0;
var gameOver = false;
var screenWidth = 320;
var screenHeight = 170;
var gameSpeed = 1;

var bgColor = color(0, 0, 0);
var playerColor = color(255, 255, 0);
var obstacleColor = color(255, 0, 0);
var groundColor = color(0, 255, 0);
var textColor = color(255, 255, 255);


function drawTriangle(x, y, width, height, color) {
    drawLine(x + width/2, y, x, y + height, color);  
    drawLine(x + width/2, y, x + width, y + height, color); 
    drawLine(x, y + height, x + width, y + height, color);   
}


function drawSquare(x, y, size, color) {
    drawLine(x, y, x + size, y, color);       // Верхняя линия
    drawLine(x + size, y, x + size, y + size, color); // Правая линия
    drawLine(x + size, y + size, x, y + size, color); // Нижняя линия
    drawLine(x, y + size, x, y, color);       // Левая линия
}


var levelData = [
    {x: 200,  count: 1, heights: [20]},
    {x: 300,  count: 2, heights: [20, 40]}, 
    {x: 400,  count: 3, heights: [20, 40, 20]}, 
    {x: 500, count: 1, heights: [60]}, 
    {x: 600, count: 2, heights: [60, 20]},
    {x: 700, count: 3, heights: [20, 20, 40]}, 
    {x: 800, count: 1, heights: [20]},
    {x: 900, count: 2, heights: [40, 60]},
    {x: 1000, count: 3, heights: [60, 40, 20]},
    {x: 1100, count: 1, heights: [50]},
    {x: 1200, count: 2, heights: [20, 20]},
    {x: 1300, count: 3, heights: [30, 30, 30]},
    {x: 1400, count: 1, heights: [60]},
    {x: 1500, count: 2, heights: [20, 60]},
    {x: 1600, count: 3, heights: [60, 40, 20]},
    {x: 1700, count: 1, heights: [20]},
    {x: 1800, count: 2, heights: [40, 60]},
    {x: 1900, count: 3, heights: [60, 40, 20]},
    {x: 2000, count: 1, heights: [30]},
    {x: 2100, count: 2, heights: [30, 30]},
    {x: 2200, count: 3, heights: [60, 40, 30]},
    {x: 2300,  count: 1, heights: [20]}, 
    {x: 2400,  count: 2, heights: [20, 40]},
    {x: 2500,  count: 3, heights: [20, 40, 20]}, 
    {x: 2600, count: 1, heights: [60]},
    {x: 2700, count: 2, heights: [60, 20]},
    {x: 2800, count: 3, heights: [20, 20, 40]},
    {x: 2900, count: 1, heights: [20]},
    {x: 3000, count: 2, heights: [40, 60]},
    {x: 3100, count: 3, heights: [60, 40, 20]},
    {x: 3200, count: 1, heights: [50]},
    {x: 3300, count: 2, heights: [20, 20]},
    {x: 3400, count: 3, heights: [30, 30, 30]},
    {x: 3500, count: 1, heights: [60]},
    {x: 3600, count: 2, heights: [20, 60]},
    {x: 3700, count: 3, heights: [60, 40, 20]},
    {x: 3800, count: 1, heights: [20]},
    {x: 3900, count: 2, heights: [40, 60]},
    {x: 4000, count: 3, heights: [60, 40, 20]},
    {x: 4100, count: 1, heights: [30]},
    {x: 4200, count: 2, heights: [30, 30]},
    {x: 4300, count: 3, heights: [60, 40, 30]}
];

var currentLevelIndex = 0;
var obstacleGroupX; 
var obstacleClearance = 3; 


var flyingText = "by @Tiramisu2_0";
var flyingTextX = screenWidth; 
var showFlyingText = false;
var flyingTextHasAppeared = false; 
var flyingTextColor = color(0, 255, 255); 


function resetGame() {
    playerY = 140;
    playerSpeedY = 0;
    currentLevelIndex = 0;
    obstacleGroupX = levelData[0].x; 
    score = 0;
    gameOver = false;
    gameSpeed = 1;
    flyingTextX = screenWidth; 
    showFlyingText = false;  
}


function gameLoop() {
    fillScreen(bgColor);

    
    if (getSelPress() && playerY >= groundLevel - playerSize) {
        playerSpeedY = jumpForce;
    }

    
    playerSpeedY += gravity * gameSpeed;
    playerY += playerSpeedY * gameSpeed;

    
    if (playerY + playerSize > groundLevel) {
        playerY = groundLevel - playerSize;
        playerSpeedY = 0;
    }

    
    obstacleGroupX -= obstacleSpeed * gameSpeed;

    
    if (obstacleGroupX < screenWidth) { 
        for (var j = 0; j < levelData[currentLevelIndex].count; j++) {
            var obsX = obstacleGroupX + j * obstacleSpacing;
            var obsY = groundLevel - levelData[currentLevelIndex].heights[j];

        
            if (obsX + obstacleWidth > 0 && obsX < screenWidth) {
                drawTriangle(obsX, obsY, obstacleWidth, levelData[currentLevelIndex].heights[j], obstacleColor);

                
                if (playerX + playerSize > obsX && playerX < obsX + obstacleWidth &&
                  playerY + playerSize > obsY) { 
                    gameOver = true;
                }
            }
        }
    }

    
    drawSquare(playerX, playerY, playerSize, playerColor); 
    drawLine(0, groundLevel, screenWidth, groundLevel, groundColor); 
    setTextSize(1);
    setTextColor(textColor);
    drawString("Score: " + score, 5, 5);

    if (score >= 10 && !flyingTextHasAppeared) {
        showFlyingText = true;
        flyingTextHasAppeared = true; // 
        flyingTextX = screenWidth; 
    }

    if (showFlyingText) {
        setTextSize(1);
        setTextColor(flyingTextColor);
        drawString(flyingText, flyingTextX, 30);
        flyingTextX -= scrollSpeed;  

        
        if (flyingTextX < -flyingText.length * 8) { 
            showFlyingText = false;
        }
    }

    if (obstacleGroupX + obstacleWidth * obstacleClearance + obstacleSpacing * (levelData[currentLevelIndex].count - 1) < 0) {
        currentLevelIndex++;
        if (currentLevelIndex < levelData.length) {
            obstacleGroupX = levelData[currentLevelIndex].x; 
        } else {
            currentLevelIndex = 0;
            obstacleGroupX = levelData[currentLevelIndex].x; 
        }
        score++;
    }

    if (gameOver) {
        setTextColor(textColor);
        drawString("Game Over!", screenWidth / 2 - 40, screenHeight / 2 - 5);
        drawString("Score: " + score, screenWidth / 2 - 30, screenHeight / 2 + 10);
        delay(2000);
        resetGame();
    }

    delay(15);
    gameLoop();
}
resetGame();
gameLoop();