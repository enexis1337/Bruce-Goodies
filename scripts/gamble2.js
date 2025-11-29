var money = 0
var s1 = 0
var s2 = 0
function waitforkey() {
    while (!getAnyPress) {
        delay(20);
    }
}
function main() {
    if (storageRead("gamblingsave.txt")) {
        money = JSON.parse(storageRead("gamblingsave.txt"));
    }
    while (true) {
        setTextSize(2.7);
        drawString("Money:", 0, 0);
        if (money == 0) {
            setTextColor(color(250, 210, 10));
        } else if (money >= 0.01) {
            setTextColor(color(50, 168, 82));
        } else if (money <= -0.01) {
            setTextColor(color(245, 44, 44));
        }
        drawString(money.toString(), 100, 0);
        setTextSize(1);
        setTextColor(color(255, 255, 255));
        drawString("press [PREV] for menu", 0, height() - 25);
        drawString("press [SELECT] to bet", 0, height() - 10);
        setTextSize(5);
        drawString(s1.toString() + "." + s2.toString() + "x", width() / 2 - 70, height() / 2 - 20);
        waitforkey();
        if (getPrevPress()) {
            depc = dialogChoice(["Deposit", "dep", "Back Out", "exit"]);
            if (depc == "dep") {
                inputk = keyboard();
                if (isNaN(Number(inputk))) {
                    dialogError("Please input number");
                    fillScreen(0);
                } else {
                    money = money + Number(inputk)
                    dialogMessage("Deposited " + inputk);
                    fillScreen(0);
                }
            } else if (depc == "exit") {
                if (!storageRead("gamblingsave.txt")) {
                    storageWrite("gamblingsave.txt", money.toString());
                }
                serialCmd("storage remove gamblingsave.txt");
                storageWrite("gamblingsave.txt", money.toString());
                break;
            }
        } else if (getSelPress()) {
            s1 = Math.floor(Math.random() * 4) - 2
            s2 = Math.floor(Math.random() * 100)
            money = money * Number(s1.toString() + "." + s2.toString());
            fillScreen(0);
        }
    }
}
main();