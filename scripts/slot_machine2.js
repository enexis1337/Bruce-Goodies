var money = 100; // Starting balance
var symbols = ["A", "B", "C", "D", "E", "F"];
var slot1 = "A", slot2 = "B", slot3 = "C";

// Load saved balance if it exists
if (storageRead("slot_machine_save.txt")) {
    money = JSON.parse(storageRead("slot_machine_save.txt"));
}

// Function to update the display
function updateScreen() {
    fillScreen(0); // Clear screen
    setTextSize(2);
    drawString("Balance: $" + money, 10, 10);
    
    setTextSize(3);
    drawString(slot1 + " " + slot2 + " " + slot3, 60, 50);
    
    setTextSize(2);
    drawString("Press [SELECT] to spin", 10, height() - 20);
}

// Function to spin the slots
function spinSlots() {
    fillScreen(0);
    drawString("Spinning...", 50, 20);

    for (let i = 0; i < 10; i++) {
        slot1 = symbols[Math.floor(Math.random() * symbols.length)];
        slot2 = symbols[Math.floor(Math.random() * symbols.length)];
        slot3 = symbols[Math.floor(Math.random() * symbols.length)];
        updateScreen();
        delay(150);
    }

    if (slot1 === slot2 && slot2 === slot3) {
        drawString("JACKPOT! +$50", 50, 100);
        money += 50;
    } else {
        drawString("You lost $10", 50, 100);
        money -= 10;
    }

    storageWrite("slot_machine_save.txt", JSON.stringify(money));
    delay(1000);
}

// ** Main Loop **
while (true) {
    updateScreen();
    while (!getSelPress()) { delay(50); } // Wait for [SELECT] button
    spinSlots();
}