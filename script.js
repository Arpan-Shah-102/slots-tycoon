let totalSpins = 0;
let money = 5000;

let jackpotPrize = 300;
let twoPairPrize = 15;
let addedBonus = 1;

let upgradeLuck = document.querySelector(".luck");
let upgradeIncome = document.querySelector(".income");
let upgradeSpin = document.querySelector(".spin-upg");

let upgradeLuckLevel = 1;
let upgradeIncomeLevel = 1;
let upgradeSpinLevel = 1;

let upgradeLuckPrice = 400;
let upgradeIncomePrice = 500;
let upgradeSpinPrice = 300;

let upgradeLuckContainer = document.querySelector(".luck-cont");
let upgradeIncomeContainer = document.querySelector(".income-cont");
let upgradeSpinContainer = document.querySelector(".spin-cont");

let spin = document.querySelector('.spin');
let autoSpin = document.querySelector('.auto-spin');

let terminal = document.querySelector('.terminal');
let moneySpent = document.querySelector('.money > span');

let a = document.querySelector('.a');
let b = document.querySelector('.b');
let c = document.querySelector('.c');

let body = document.querySelector('body');
let colorThemes = document.querySelector('.color-themes');
const colors = ['black', 'white', 'red', 'green', 'teal', 'blue', 'purple']  // , 'red-orange', 'green-yellow', 'blue-purple'];
let pointer = 0;

const slotSound = new Audio('./assets/slot-spin-sound.mp3');
const slotPayout = new Audio('./assets/slot-payout.mp3');
const jackpot = new Audio('./assets/jackpot.mp3');
const upgradeSound = new Audio('./assets/upgrade-purchased.mp3');
const winAudio = new Audio('./assets/win.mp3');
const loseAudio = new Audio('./assets/lose.mp3');
const nftPurchase = new Audio('./assets/shop.mp3');
const changBgColor = new Audio('./assets/change-bg-color.mp3');

let prizeLog = document.querySelector('.prize-container');

let gameOverScreen = document.querySelector('.game-over-screen');
let gameWonScreen = document.querySelector('.game-won-screen');

let playAgain = document.querySelector('.coninue-playing');
let finsihedMessageShown = false;

let nftMultiplier = 0;

spin.addEventListener("click", function() {
  try {
    if (10 > money) {
      throw new Error("You do not have enough money. You are broke.");
    }
    spinSlot(1, false);
  }
  catch (err) {
    alert("You do not have enough money. You are broke.");
    console.log(err);
  }
});
autoSpin.addEventListener("click", function() {
  try {
    numberOfItereations = Number(prompt("How many times would you like to spin?"));
    if (isNaN(numberOfItereations) || numberOfItereations <= 0) {
      throw new Error("Invalid number of iterations. Please enter a positive number.");
    } else if (numberOfItereations * 10 > money) {
      throw new Error("You don't have enough money to perform that many spins.");
    }
    spinSlot(numberOfItereations, true);
  }
  catch (err) {
    alert("You did not enter a valid number. Please try again.");
    console.log(err);
  }
});

symbols = ['🍋','🪙','🥭','🔔','🍉','⭐','🍇', '🎰', '👑', '💰', '💵', '🍀','🥇','🥈','🥉','🍒','💎','7️⃣'];
function spinSlot(iterations, autoSpinOn) {
  let completedSpins = 0;
  let multiplier;
  if (autoSpinOn) {
    multiplier = 0.5;
  } else {
    multiplier = 1
  }
  for (let j = 0; j < iterations; j++) {
    setTimeout(function () {
      slotSound.play();
      
      spin.disabled = true;
      autoSpin.disabled = true;

      money -= 10;
      if (addedBonus >= 1.25) {
        money += addedBonus;
      }
      money += nftMultiplier;
      moneySpent.innerText = money.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

      let s1;
      let s2;
      let s3;

      for (let i = 0; i < 10; i++) {
        setTimeout(function() {
          s1 = symbols[Math.floor(Math.random() * symbols.length)];
          s2 = symbols[Math.floor(Math.random() * symbols.length)];
          s3 = symbols[Math.floor(Math.random() * symbols.length)];

          a.innerText = s1;
          b.innerText = s2;
          c.innerText = s3;
        }, 100 * i * multiplier);
      }
      setTimeout(function() {
        let moneyEarned = 0;
        totalSpins++;
        let tag = document.createElement('p');

        if (s1 == s2 && s2 == s3) {
          money += jackpotPrize;
          moneyEarned += jackpotPrize;
          terminal.innerText = `Congratulations! You won $${moneyEarned.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}!`;
          moneySpent.innerText = money.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          jackpot.play();
          tag.innerText = `Spin ${totalSpins} - $${moneyEarned.toFixed(2)} - ${s1} ${s2} ${s3}`;
          prizeLog.insertBefore(tag, prizeLog.firstChild);
        }
        else if (s1 == s2 || s1 == s3 || s2 == s3) {
          money += twoPairPrize;
          moneyEarned += twoPairPrize;
          terminal.innerText = `You won $${moneyEarned.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}!`;
          moneySpent.innerText = money.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          slotPayout.play();
          tag.innerText = `Spin ${totalSpins} - $${moneyEarned.toFixed(2)} - ${s1} ${s2} ${s3}`;
          prizeLog.insertBefore(tag, prizeLog.firstChild);
        }
        else {
          terminal.innerText = "Sorry, you didn't win.";
        }

        completedSpins++;
        if (completedSpins == iterations) {
          spin.disabled = false;
          autoSpin.disabled = false;
        }
      }, 1000 * multiplier);
      updateStats();
      gameOverCheck();
      if (gameOverScreen.style.display == "flex" || gameWonScreen.style.display == "flex") {
        return;
      }
    }, 1250 * j * multiplier);
  }
}

colorThemes.addEventListener("click", function () {
  body.classList.remove(colors[pointer]);
  pointer++;
  if (pointer >= colors.length) {
    pointer = 0;
  }
  body.classList.add(colors[pointer]);
  changBgColor.play();
  updateStats();
  gameOverCheck();
});

let redToOrangeBgFade = document.querySelector('.red-orage.bg-shop-item');
let greenToYellowBgFade = document.querySelector('.green-yellow.bg-shop-item');
let blueToPurpleBgFade = document.querySelector('.blue-purple.bg-shop-item');

let redToOrangeClicked = false;
let greenToOrangeClicked = false;
let blueToPurpleClicked = false;

redToOrangeBgFade.addEventListener("click", function() {
  if (!redToOrangeClicked) {
    if (money >= 1000) {
      money -= 1000;
      colors.push("red-orange");
      redToOrangeClicked = true;
      body.className = "";
      body.classList.add("red-orange");
    }
  }
});

upgradeLuck.addEventListener("click", function() {
  if (money >= upgradeLuckPrice) {
    if (upgradeLuckLevel < 15) {
      money -= upgradeLuckPrice;
      moneySpent.innerText = money.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      upgradeSound.play();
      symbols.splice(0, 1);

      upgradeLuckLevel += 1;
      upgradeLuckPrice += 10;
      upgradeLuck.innerText = `$${upgradeLuckPrice}`;

      if (upgradeLuckLevel < 15) {
        upgradeLuckContainer.querySelector('p').innerText = `Lv. ${upgradeLuckLevel} > Lv. ${upgradeLuckLevel + 1}`;
      } else {
        upgradeLuckContainer.querySelector('p').innerText = `Max Level (Lv. 15)`;
        upgradeLuck.disabled = true;
      }
    } else {
      upgradeLuckContainer.querySelector('p').innerText = `Max Level (Lv. 15)`;
      upgradeLuck.disabled = true;
    }
  } else {
    alert("You don't have enough money to upgrade this feature.");
  }
  updateStats();
  gameOverCheck();
});
upgradeIncome.addEventListener("click", function() {
  if (money >= upgradeIncomePrice) {
    if (upgradeIncomeLevel < 15) {
      money -= upgradeIncomePrice;
      moneySpent.innerText = money.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      upgradeSound.play();
      jackpotPrize *= 1.15;
      twoPairPrize *= 1.15;

      upgradeIncomeLevel += 1;
      upgradeIncomePrice += 10;
      upgradeIncome.innerText = `$${upgradeIncomePrice}`;

      if (upgradeIncomeLevel < 15) {
        upgradeIncomeContainer.querySelector('p').innerText = `Lv. ${upgradeIncomeLevel} > Lv. ${upgradeIncomeLevel + 1}`;
      } else {
        upgradeIncomeContainer.querySelector('p').innerText = `Max Level (Lv. 15)`;
        upgradeIncome.disabled = true;
      }
    } else {
      upgradeIncomeContainer.querySelector('p').innerText = `Max Level (Lv. 15)`;
      upgradeIncome.disabled = true;
    }
  } else {
    alert("You don't have enough money to upgrade this feature.");
  }
  updateStats();
  gameOverCheck();
});
upgradeSpin.addEventListener("click", function() {
  if (money >= upgradeSpinPrice) {
    if (upgradeSpinLevel < 15) {
      money -= upgradeSpinPrice;
      moneySpent.innerText = money.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      upgradeSound.play();
      addedBonus *= 1.15;

      upgradeSpinLevel += 1;
      upgradeSpinPrice += 10;
      upgradeSpin.innerText = `$${upgradeSpinPrice}`;

      if (upgradeSpinLevel < 15) {
        upgradeSpinContainer.querySelector('p').innerText = `Lv. ${upgradeSpinLevel} > Lv. ${upgradeSpinLevel + 1}`;
      } else {
        upgradeSpinContainer.querySelector('p').innerText = `Max Level (Lv. 15)`;
        upgradeSpin.disabled = true;
      }
    } else {
      upgradeSpinContainer.querySelector('p').innerText = `Max Level (Lv. 15)`;
      upgradeSpin.disabled = true;
    }
  } else {
    alert("You don't have enough money to upgrade this feature.");
  }
  updateStats();
  gameOverCheck();
});

function gameOverCheck() {
  if (!finsihedMessageShown) {
    if (upgradeSpinLevel == 15 && upgradeIncomeLevel == 15 && upgradeLuckLevel == 15) {
      setTimeout(function () {
        alert("You're got all of the upgrades I see");
      }, 1000);
      setTimeout(function () {
        winAudio.play();
        gameWonScreen.style.display = "flex";
        finsihedMessageShown = true;
      }, 2000);
    }
    else if (money < 10) {
      setTimeout(function () {
        alert("You're out of money I see");
      }, 500);
      setTimeout(function () {
        loseAudio.play();
        gameOverScreen.style.display = "flex";
      }, 1000);
    }
  }
}

playAgain.addEventListener('click', function () {
  gameWonScreen.style.position = "static";
  playAgain.style.display = 'none';
});

const itemShopPrice = [10, 500, 1000, 50, 50, 50, 200, 100, 20, 150, 3000, 500, 1000, 250, 500, 10000, 5000, 2000];
const itemShopItems = ["💩", "👽", "🐲", "😺", "🐶", "🐔", "🐮", "🐷", "🐰", "🐵", "🤖", "💀", "🦴", "👄", "👁️", "🧠", "🫀", "🫁"];

const buttons = document.querySelectorAll('.items > div > button');
const colectibles = document.querySelector('.collectibles');

buttons.forEach((button, index) => {
  button.addEventListener('click', function() {
    if (money >= itemShopPrice[index]) {

      money -= itemShopPrice[index];
      moneySpent.innerText = money.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      button.disabled = true;
      nftPurchase.play();

      let colectibleData = document.createElement('h1');
      colectibleData.innerText = itemShopItems[index];
      colectibles.appendChild(colectibleData);
      nftMultiplier += itemShopPrice[index] * 0.001;
    } else {
      alert("You don't have enough money to buy this NFT.");
    }
    updateStats();
    gameOverCheck();
  });
});

let luckStatLabel = document.querySelector('.luck-stat');
let twoPairStatLabel = document.querySelector('.two-pair-stat');
let jackpotStatLabel = document.querySelector('.jackpot-stat');
let spinStatLabel = document.querySelector('.spin-stat');
let nftStatLabel = document.querySelector('.nft-stat');

function updateStats() {
  let luckStat = (100 - ((symbols.length / 18) * 100)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  let twoPairStat = twoPairPrize.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  let jackpotStat = jackpotPrize.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  let spinStat = addedBonus.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (spinStat == 1) {
    spinStat = (0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });;
  }
  let nftStat = nftMultiplier.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  luckStatLabel.innerText = luckStat;
  twoPairStatLabel.innerText = twoPairStat;
  jackpotStatLabel.innerText = jackpotStat;
  spinStatLabel.innerText = spinStat;
  nftStatLabel.innerText = nftStat;
}