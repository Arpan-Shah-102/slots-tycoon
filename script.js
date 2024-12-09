let totalSpins = 0;
let money = 2500;

let jackpotPrize = 300;
let twoPairPrize = 15;
let addedBonus = 1;

let upgradeLuck = document.querySelector(".luck");
let upgradeIncome = document.querySelector(".income");
let upgradeSpin = document.querySelector(".spin-upg");

let upgradeLuckLevel = 1;
let upgradeIncomeLevel = 1;
let upgradeSpinLevel = 1;

let upgradeLuckPrice = 500;
let upgradeIncomePrice = 500;
let upgradeSpinPrice = 500;

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

const slotSound = new Audio('./assets/slot-spin-sound.mp3');
const slotPayout = new Audio('./assets/slot-payout.mp3');
const jackpot = new Audio('./assets/jackpot.mp3');
const upgradeSound = new Audio('./assets/upgrade-purchased.mp3');

let prizeLog = document.querySelector('.prize-container');

let gameOverScreen = document.querySelector('.game-over-screen');
let gameWonScreen = document.querySelector('.game-won-screen');

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

symbols = ['🍋','🪙','🥭','🔔','🍉','⭐','🍇','🥇','🥈','🥉','🍒','💎','7️⃣'];
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
      gameOverCheck();
      if (gameOverScreen.style.display == "flex" || gameWonScreen.style.display == "flex") {
        return;
      }
    }, 1250 * j * multiplier);
  }
}

colorThemes.addEventListener("click", function () {
  body.classList.toggle("dark");
  gameOverCheck();
});

upgradeLuck.addEventListener("click", function() {
  if (money >= upgradeLuckPrice) {
    if (upgradeLuckLevel < 10) {
      money -= upgradeLuckPrice;
      moneySpent.innerText = money.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      upgradeSound.play();
      symbols.splice(0, 1);

      upgradeLuckLevel += 1;
      if (upgradeLuckLevel < 10) {
        upgradeLuckContainer.querySelector('p').innerText = `Lv. ${upgradeLuckLevel} > Lv. ${upgradeLuckLevel + 1}`;
      } else {
        upgradeLuckContainer.querySelector('p').innerText = `Max Level (Lv. 10)`;
        upgradeLuck.disabled = true;
      }
    } else {
      upgradeLuckContainer.querySelector('p').innerText = `Max Level (Lv. 10)`;
      upgradeLuck.disabled = true;
    }
  } else {
    alert("You don't have enough money to upgrade this feature.");
  }
  gameOverCheck();
});
upgradeIncome.addEventListener("click", function() {
  if (money >= upgradeIncomePrice) {
    if (upgradeIncomeLevel < 10) {
      money -= upgradeIncomePrice;
      moneySpent.innerText = money.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      upgradeSound.play();
      jackpotPrize *= 1.25;
      twoPairPrize *= 1.25;

      upgradeIncomeLevel += 1;
      if (upgradeIncomeLevel < 10) {
        upgradeIncomeContainer.querySelector('p').innerText = `Lv. ${upgradeIncomeLevel} > Lv. ${upgradeIncomeLevel + 1}`;
      } else {
        upgradeIncomeContainer.querySelector('p').innerText = `Max Level (Lv. 10)`;
        upgradeIncome.disabled = true;
      }
    } else {
      upgradeIncomeContainer.querySelector('p').innerText = `Max Level (Lv. 10)`;
      upgradeIncome.disabled = true;
    }
  } else {
    alert("You don't have enough money to upgrade this feature.");
  }
  gameOverCheck();
});
upgradeSpin.addEventListener("click", function() {
  if (money >= upgradeSpinPrice) {
    if (upgradeSpinLevel < 10) {
      money -= upgradeSpinPrice;
      moneySpent.innerText = money.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      upgradeSound.play();
      addedBonus *= 1.25;

      upgradeSpinLevel += 1;
      if (upgradeSpinLevel < 10) {
        upgradeSpinContainer.querySelector('p').innerText = `Lv. ${upgradeSpinLevel} > Lv. ${upgradeSpinLevel + 1}`;
      } else {
        upgradeSpinContainer.querySelector('p').innerText = `Max Level (Lv. 10)`;
        upgradeSpin.disabled = true;
      }
    } else {
      upgradeSpinContainer.querySelector('p').innerText = `Max Level (Lv. 10)`;
      upgradeSpin.disabled = true;
    }
  } else {
    alert("You don't have enough money to upgrade this feature.");
  }
  gameOverCheck();
});

function upgradeSomething() {

}

function gameOverCheck() {
  if (upgradeSpinLevel == 10 && upgradeIncomeLevel == 10 && upgradeLuckLevel == 10) {
    setTimeout(function () {
      alert("You're got all of the upgrades I see");
    }, 1000);
    setTimeout(function () {
      gameWonScreen.style.display = "flex";
    }, 2000);
  }
  else if (money < 10) {
    setTimeout(function () {
      alert("You're out of money I see");
    }, 500);
    setTimeout(function () {
      gameOverScreen.style.display = "flex";
    }, 1000);
  }
}