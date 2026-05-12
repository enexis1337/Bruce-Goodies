var money = 100;  // Starting money
var symbols = ["🍒", "🍋", "🔔", "⭐", "🍉", "💎"];
var spinning = false;

// Function to display text
function displayText(text, x, y, size = 2, color = [255, 255, 255]) {
    setTextSize(size);
    setTextColor(color(color[0], color[1], color[2]));
    drawString(text, x, y);
}

// Function to animate spinning effect
function spinningAnimation() {
    for (let i = 0; i < 10; i++) {
        let slot1 = symbols[Math.floor(Math.random() * symbols.length)];
        let slot2 = symbols[Math.floor(Math.random() * symbols.length)];
        let slot3 = symbols[Math.floor(Math.random() * symbols.length)];

        fillScreen(0);
        displayText(slot1 + " " + slot2 + " " + slot3, width() / 2 - 40, height() / 2 - 10, 3);
        delay(150);
    }
}

// Function to spin the slot machine
function spinSlots() {
    if (spinning) return;  // Prevent multiple presses
    spinning = true;

    spinningAnimation();

    // Final slot results
    let slot1 = symbols[Math.floor(Math.random() * symbols.length)];
    let slot2 = symbols[Math.floor(Math.random() * symbols.length)];
    let slot3 = symbols[Math.floor(Math.random() * symbols.length)];

    fillScreen(0);
    displayText(slot1 + " " + slot2 + " " + slot3, width() / 2 - 40, height() / 2 - 10, 3);

    // Check win condition
    if (slot1 === slot2 && slot2 === slot3) {
        displayText("🎉 JACKPOT! +$50 🎉", width() / 2 - 50, height() / 2 + 30, 2, [0, 255, 0]);
        money += 50;
    } else {
        displayText("❌ Try Again! -$10 ❌", width() / 2 - 50, height() / 2 + 30, 2, [255, 0, 0]);
        money -= 10;
    }

    // Update money display
    displayText("Money: $" + money, 10, 10, 2, [255, 255, 0]);

    spinning = false;
}

// Load saved money if exists
if (storageRead("slot_money.txt")) {
    money = JSON.parse(storageRead("slot_money.txt"));
}

// Display initial screen
fillScreen(0);
displayText("Press A to Spin!", width() / 2 - 50, height() / 2 - 30, 2, [0, 0, 255]);
displayText("Money: $" + money, 10, 10, 2, [255, 255, 0]);

// Main game loop - waits for button press to spin
setInterval(function() {
    if (btnA.isPressed()) {
        spinSlots();
        delay(500);  // Prevent accidental double presses
    }
}, 100);