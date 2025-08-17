let totalSpins = 0;
let money = 5_000;

let jackpotPrize = 400;
let twoPairPrize = 20;
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
let colors = ['black', 'white', 'red', 'green', 'teal', 'blue', 'purple'];
let pointer = 0;

const slotSound = new Audio('./assets/sounds/slot-spin-sound.mp3');
const slotPayout = new Audio('./assets/sounds/slot-payout.mp3');
const jackpot = new Audio('./assets/sounds/jackpot.mp3');
const upgradeSound = new Audio('./assets/sounds/upgrade-purchased.mp3');
const winAudio = new Audio('./assets/sounds/win.mp3');
const loseAudio = new Audio('./assets/sounds/lose.mp3');
const foodPurchase = new Audio('./assets/sounds/shop.mp3');
const changBgColor = new Audio('./assets/sounds/change-bg-color.mp3');
const bgPurchase = new Audio('./assets/sounds/background-purchase.mp3');
const trophyPurchsed = new Audio('./assets/sounds/trophy-purchased.mp3');
const buyLootBox = new Audio('./assets/sounds/buy-loot-box.mp3');
const openLootBox = new Audio('./assets/sounds/open-loot-box.mp3');

const backgroundAudio = new Audio('./assets/background-music.m4a');
backgroundAudio.loop = true;
backgroundAudio.volume = 0.5;
backgroundAudio.muted = true;

let prizeLog = document.querySelector('.prize-container');

let gameOverScreen = document.querySelector('.game-over-screen');
let gameWonScreen = document.querySelector('.game-won-screen');

let playAgain = document.querySelector('.continue-playing');
let finsihedMessageShown = false;

let foodMultiplier = 0;
let bgColorMultiplier = 0;
let lolBgNegativeMultiplier = 0;

spin.addEventListener("click", function() {
  try {
    if (10 - addedBonus - foodMultiplier - bgColorMultiplier + lolBgNegativeMultiplier > money) {
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
  let totalBonus = foodMultiplier + bgColorMultiplier - lolBgNegativeMultiplier;
  if (addedBonus >= 1.15) {
    totalBonus += addedBonus;
  }
  try {
    numberOfItereations = Number(prompt("How many times would you like to spin?"));
    if (isNaN(numberOfItereations) || numberOfItereations <= 0) {
      throw new Error("Invalid number of iterations. Please enter a positive number.");
    } else if (numberOfItereations * (10 - addedBonus - foodMultiplier - bgColorMultiplier + lolBgNegativeMultiplier) > money) {
      throw new Error("You don't have enough money to perform that many spins.");
    }
    spinSlot(numberOfItereations, true);
  }
  catch (err) {
    alert("You did not enter a valid number. Please try again.");
    console.log(err);
  }
});

let symbols = ['🍋','🪙','🥭','🔔','🍉','⭐','🍇', '🎰', '👑', '💰', '💵', '🍀','🥇','🥈','🥉','🍒','💎','7️⃣'];
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
      playSound(slotSound);
      
      spin.disabled = true;
      autoSpin.disabled = true;

      money -= 10;
      if (addedBonus >= 1.15 && !scamCoinBought) {
        money += addedBonus;
      } else if (addedBonus >= 2.3 && scamCoinBought) {
        money += addedBonus;
      }
      money += foodMultiplier;
      money += bgColorMultiplier;
      money -= lolBgNegativeMultiplier;
      
      if (scamCoinBought && adblockerOff && !permamentAdsOff) {
        createAd();
      } else if (!adblockerOff) {
        if (permamentAdsOff) {}
        else if (money >= 100 && crypto >= 10000) {
          money -= 100;
          crypto -= 10000;
          totalCryptoElement.innerText = crypto.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
        } else if (money <= 100 || crypto <= 10000) {
          alert("Insufficent funds to keep running adblocker\nCanceled adblocker subscription.");
          adblockerOff = true;
          buyAdblocker.innerText = "Buy Adblocker Subscription";
          createAd();
        }
      }
      unlockAchievement(0);
      if (totalSpins >= 1000) {unlockAchievement(4);}
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
          playSound(jackpot);
          unlockAchievement(14);
          tag.innerText = `Spin ${totalSpins} - $${moneyEarned.toFixed(2)} - ${s1} ${s2} ${s3}`;
          prizeLog.insertBefore(tag, prizeLog.firstChild);
        }
        else if (s1 == s2 || s1 == s3 || s2 == s3) {
          money += twoPairPrize;
          moneyEarned += twoPairPrize;
          terminal.innerText = `You won $${moneyEarned.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}!`;
          moneySpent.innerText = money.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          playSound(slotPayout);
          unlockAchievement(15);
          tag.innerText = `Spin ${totalSpins} - $${moneyEarned.toFixed(2)} - ${s1} ${s2} ${s3}`;
          prizeLog.insertBefore(tag, prizeLog.firstChild);
        }
        else {
          terminal.innerText = "Sorry, you didn't win.";
        }
        monopolyMoneyCheck();

        completedSpins++;
        if (completedSpins == iterations) {
          spin.disabled = false;
          autoSpin.disabled = false;
        }
      }, 1000 * multiplier);
      if (onLoan) {
        repayLoan += 5;
        loanRepaymentLabel.innerText = repayLoan;
        if (repayLoan >= 750) {unlockAchievement(43);}
      }
      updateStats();
      setTimeout(gameOverCheck, 1000);
    }, 1250 * j * multiplier);
  }
}

const menu = document.querySelector('.menu');
const navigation = document.querySelector('.navigation');
menu.addEventListener('click', function () {
  navigation.classList.toggle('show-nav');
  playSound(click);
});
const navButtons = ["slot-machine", "upgrades", "food-collection", "food-shop", "background-shop", "stats", "loans", "trophies", "loot-box", "options", "crypto-mine", "buy-crypto", "mine-crypto", "nft-collection", "nft-shop", "cars", "crypto-stats", "crypto-trophies", "crypto-loot-box", "prize-log", "credits"];
navButtons.forEach((item, index) => {
  document.querySelector(`.${item}-btn`).addEventListener("click", function () {
    window.location.hash = item;
    if (item == navButtons[0]) {unlockAchievement(46);}
    playSound(click);
  });
});

colorThemes.addEventListener("click", function () {
  body.classList.remove(colors[pointer]);
  body.classList.remove('red-orange');
  body.classList.remove('green-yellow');
  body.classList.remove('blue-purple');
  body.classList.remove('ultra-theme');
  pointer++;
  if (pointer >= colors.length) {
    pointer = 0;
  }
  body.classList.add(colors[pointer]);
  playSound(changBgColor);
  lolBgNegativeMultiplier = 0;
  cryptoLolBgNegativeMultiplier = 1;
  cryptoBackgroundStatLabel.innerText = `0`;
  ['img-1', 'img-2', 'img-3', 'img-4', 'img-5', 'img-6', 'img-7', 'img-8', 'img-9', 'img-10'].forEach(function (item) {
    if (item == colors[pointer]) {
      lolBgNegativeMultiplier = 5;
    }
  });
  ['crypto-img-1', 'crypto-img-2', 'crypto-img-3', 'crypto-img-4', 'crypto-img-5', 'crypto-img-6', 'crypto-img-7', 'crypto-img-8', 'crypto-img-9', 'crypto-img-10'].forEach(function (item) {
    if (item == colors[pointer]) {
      cryptoLolBgNegativeMultiplier = 0.8;
      cryptoBackgroundStatLabel.innerText = `20`;
    }
  });
  let subtotal = (dogecoinCryptoOwned * dogeCoinGiveMoney * cryptoLolBgNegativeMultiplier);
  subtotal += (bitcoinCryptoOwned * bitcoinGiveMoney * cryptoLolBgNegativeMultiplier);
  subtotal += (ethereumCryptoOwned * ethereumGiveMoney * cryptoLolBgNegativeMultiplier);
  subtotal += nftBonus * cryptoLolBgNegativeMultiplier;
  subtotal += carBonus * cryptoLolBgNegativeMultiplier;
  cryptoPerClick.innerText = `${Math.trunc(subtotal).toLocaleString()}`;
  updateStats();
  gameOverCheck();
});

let redToOrangeBgFade = document.querySelector('.red-orange.bg-shop-item');
let greenToYellowBgFade = document.querySelector('.green-yellow.bg-shop-item');
let blueToPurpleBgFade = document.querySelector('.blue-purple.bg-shop-item');
let ultraThemeBgFade = document.querySelector('.ultra-theme.bg-shop-item');
let superThemeBgFade = document.querySelector('.super-theme.bg-shop-item');

let redToOrangeClicked = false;
let greenToOrangeClicked = false;
let blueToPurpleClicked = false;
let ultraThemeClicked = false;
let superThemeClicked = false;

let bgStat = document.querySelector('.bg-stat');
let backgroundsOwned = 0;

redToOrangeBgFade.addEventListener("click", function() {
  if (!redToOrangeClicked) {
    if (money >= 1000) {
      money -= 1000;
      moneySpent.innerText = money.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      if (!scamCoinBought) {bgColorMultiplier += 1.25;}
      else if (scamCoinBought) {bgColorMultiplier += 2.5;}
      redToOrangeBgFade.innerText = "Change";
      playSound(bgPurchase);
      backgroundsOwned += 1;
      if (backgroundsOwned == 5) {unlockAchievement(3);}

      colors.push("red-orange");
      pointer = colors.length - 1;
      redToOrangeClicked = true;
      body.className = "";
      body.classList.add("red-orange");
    } else {
      alert("You don't have enough money to buy this background.");
    }
  } else {
    body.className = "";
    body.classList.add("red-orange");
  }
  lolBgNegativeMultiplier = 0;
  updateStats();
  gameOverCheck();
});
greenToYellowBgFade.addEventListener("click", function() {
  if (!greenToOrangeClicked) {
    if (money >= 1000) {
      money -= 1000;
      moneySpent.innerText = money.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      if (!scamCoinBought) {bgColorMultiplier += 1.25;}
      else if (scamCoinBought) {bgColorMultiplier += 2.5;}
      greenToYellowBgFade.innerText = "Change";
      playSound(bgPurchase);
      backgroundsOwned += 1;
      if (backgroundsOwned == 5) {unlockAchievement(3);}

      colors.push("green-yellow");
      pointer = colors.length - 1;
      greenToOrangeClicked = true;
      body.className = "";
      body.classList.add("green-yellow");
    } else {
      alert("You don't have enough money to buy this background.");
    }
  } else {
    body.className = "";
    body.classList.add("green-yellow");
  }
  lolBgNegativeMultiplier = 0;
  updateStats();
  gameOverCheck();
});
blueToPurpleBgFade.addEventListener("click", function() {
  if (!blueToPurpleClicked) {
    if (money >= 1000) {
      money -= 1000;
      moneySpent.innerText = money.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      if (!scamCoinBought) {bgColorMultiplier += 1.25;}
      else if (scamCoinBought) {bgColorMultiplier += 2.5;}
      blueToPurpleBgFade.innerText = "Change";
      playSound(bgPurchase);
      backgroundsOwned += 1;
      if (backgroundsOwned == 5) {unlockAchievement(3);}

      colors.push("blue-purple");
      pointer = colors.length - 1;
      blueToPurpleClicked = true;
      body.className = "";
      body.classList.add("blue-purple");
    } else {
      alert("You don't have enough money to buy this background.");
    }
  } else {
    body.className = "";
    body.classList.add("blue-purple");
  }
  lolBgNegativeMultiplier = 0;
  updateStats();
  gameOverCheck();
});
ultraThemeBgFade.addEventListener("click", function() {
  if (!ultraThemeClicked) {
    if (money >= 3000) {
      money -= 3000;
      moneySpent.innerText = money.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      if (!scamCoinBought) {bgColorMultiplier += 5;}
      else if (scamCoinBought) {bgColorMultiplier += 10;}
      ultraThemeBgFade.innerText = "Change";
      playSound(bgPurchase);
      backgroundsOwned += 1;
      if (backgroundsOwned == 5) {unlockAchievement(3);}

      colors.push("ultra-theme");
      pointer = colors.length - 1;
      ultraThemeClicked = true;
      body.className = "";
      body.classList.add("ultra-theme");
    } else {
      alert("You don't have enough money to buy this background.");
    }
  } else {
    body.className = "";
    body.classList.add("ultra-theme");
  }
  lolBgNegativeMultiplier = 0;
  updateStats();
  gameOverCheck();
});
superThemeBgFade.addEventListener("click", function() {
  if (!superThemeClicked) {
    if (money >= 2000) {
      money -= 2000;
      moneySpent.innerText = money.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      if (!scamCoinBought) {bgColorMultiplier += 3.5;}
      else if (scamCoinBought) {bgColorMultiplier += 7;}
      superThemeBgFade.innerText = "Change";
      playSound(bgPurchase);
      backgroundsOwned += 1;
      if (backgroundsOwned == 5) {unlockAchievement(3);}

      colors.push("super-theme");
      pointer = colors.length - 1;
      superThemeClicked = true;
      body.className = "";
      body.classList.add("super-theme");
    } else {
      alert("You don't have enough money to buy this background.");
    }
  } else {
    body.className = "";
    body.classList.add("super-theme");
  }
  lolBgNegativeMultiplier = 0;
  updateStats();
  gameOverCheck();
});

upgradeLuck.addEventListener("click", function() {
  if (money >= upgradeLuckPrice) {
    if (upgradeLuckLevel < 15) {
      money -= upgradeLuckPrice;
      moneySpent.innerText = money.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      playSound(upgradeSound);
      symbols.splice(0, 1);

      upgradeLuckLevel += 1;
      upgradeLuckPrice += 10;
      upgradeLuck.innerText = `$${upgradeLuckPrice}`;
      upgradeAchievementCheck();

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
      playSound(upgradeSound);
      jackpotPrize *= 1.15;
      twoPairPrize *= 1.15;

      upgradeIncomeLevel += 1;
      upgradeIncomePrice += 10;
      upgradeIncome.innerText = `$${upgradeIncomePrice}`;
      upgradeAchievementCheck();

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
      playSound(upgradeSound);
      addedBonus *= 1.15;

      upgradeSpinLevel += 1;
      upgradeSpinPrice += 10;
      upgradeSpin.innerText = `$${upgradeSpinPrice}`;
      upgradeAchievementCheck();

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

function upgradeAchievementCheck() {
  unlockAchievement(5);
  if (upgradeLuckLevel == 15) {unlockAchievement(6);}
  if (upgradeIncomeLevel == 15) {unlockAchievement(7);}
  if (upgradeSpinLevel == 15) {unlockAchievement(8);}
  if (upgradeLuckLevel == 15 && upgradeIncomeLevel == 15 && upgradeSpinLevel == 15) {unlockAchievement(9);}
}

function gameOverCheck() {
  if (!finsihedMessageShown) {
    if (!onLoan && money < 10 - addedBonus - foodMultiplier - bgColorMultiplier + lolBgNegativeMultiplier) {
      setTimeout(function () {
        alert("You're out of money I see");
        stopAutoMining();
        deleteCookie('slotsTycoonSave');
      }, 500);
      setTimeout(function () {
        playSound(loseAudio);
        gameOverScreen.style.display = "flex";
        finsihedMessageShown = true;
      }, 1000);
    } else if (onLoan && repayLoan >= 1000 || onLoan && money < 10 - addedBonus - foodMultiplier - bgColorMultiplier + lolBgNegativeMultiplier) {
      setTimeout(function () {
        alert("You failed to repay your loan I see");
        stopAutoMining();
        deleteCookie('slotsTycoonSave');
      }, 500);
      setTimeout(function () {
        playSound(loseAudio);
        repayLoanFailScreen.style.display = "flex";
        finsihedMessageShown = true;
      }, 1000);
    } else if (upgradeSpinLevel == 15 && upgradeIncomeLevel == 15 && upgradeLuckLevel == 15 && foodsOwned == 18 && backgroundsOwned == 5) {
      setTimeout(function () {
        alert("You've got all of the upgrades, foods, and backgrounds I see");
        unlockAchievement(1);
        stopAutoMining();
      }, 1000);
      setTimeout(function () {
        playSound(winAudio);
        gameWonScreen.style.display = "flex";
        finsihedMessageShown = true;
      }, 2000);
    }
  }
}

playAgain.addEventListener('click', function () {
  gameWonScreen.style.position = "static";
  playAgain.style.display = 'none';
});

const itemShopPrice = [10, 500, 1000, 50, 50, 50, 200, 100, 20, 150, 3000, 500, 1000, 250, 500, 10000, 5000, 2000];
const itemShopItems = ["💩", "🍣", "🐲", "😺", "🐶", "🐔", "🐮", "🐷", "🐰", "🐵", "🍪", "🍕", "🍔", "🍟", "🍫", "🍤", "🍩", "🍜"];
const animals = ["🐲", "😺", "🐶", "🐔", "🐮", "🐷", "🐰", "🐵"];

let foodBought = ["💩"];
const buttons = document.querySelectorAll('.items.food > div > button');
const colectibles = document.querySelector('.collect-food');
let foodsOwned = 1;

buttons.forEach((button, index) => {
  button.addEventListener('click', function() {
    if (money >= itemShopPrice[index]) {
      money -= itemShopPrice[index];
      moneySpent.innerText = money.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      button.disabled = true;
      playSound(foodPurchase);
      foodsOwned += 1;
      foodBought.push(itemShopItems[index]);
      secondPlaceCheck();

      jpMotercycleGangCheck();
      if (foodsOwned == 18) {unlockAchievement(2);}
      if (itemShopItems[index] == "😺") {unlockAchievement(40);}
      if (animals.every(item => foodBought.includes(item))) {unlockAchievement(41);}

      let colectibleData = document.createElement('h1');
      colectibleData.innerText = itemShopItems[index];
      colectibles.appendChild(colectibleData);
      if (!scamCoinBought) {foodMultiplier += itemShopPrice[index] * 0.001;}
      else if (scamCoinBought) {foodMultiplier += itemShopPrice[index] * 0.002;}
    } else {
      alert("You don't have enough money to buy this food.");
    }
    updateStats();
    gameOverCheck();
  });
});

let luckStatLabel = document.querySelector('.luck-stat');
let twoPairStatLabel = document.querySelector('.two-pair-stat');
let jackpotStatLabel = document.querySelector('.jackpot-stat');
let spinStatLabel = document.querySelector('.spin-stat');
let foodStatLabel = document.querySelector('.food-stat');

function updateStats() {
  let luckStat = (100 - ((symbols.length / 18) * 100)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  let twoPairStat = twoPairPrize.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  let jackpotStat = jackpotPrize.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  let spinStat = addedBonus.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (spinStat == 1 && !scamCoinBought) {
    spinStat = (0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });;
  } else if (spinStat == 2 && scamCoinBought) {
    spinStat = (0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  let foodStat = foodMultiplier.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  let bgStatLabel = (bgColorMultiplier - lolBgNegativeMultiplier).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  luckStatLabel.innerText = luckStat;
  twoPairStatLabel.innerText = twoPairStat;
  jackpotStatLabel.innerText = jackpotStat;
  spinStatLabel.innerText = spinStat;
  foodStatLabel.innerText = foodStat;
  bgStat.innerText = bgStatLabel;
}

let takeLoan = document.querySelector('.take-loan');
let payLoan = document.querySelector('.pay-loan');
let loanRepaymentLabel = document.querySelector('.loan-repayment');
let repayLoanFailScreen = document.querySelector('.game-over-loan-screen');
let playViaLoanBtn = document.querySelector('.play-via-loan');

let repayLoan = 500;
let onLoan = false;
let totalLoansTaken = 0;

takeLoan.addEventListener('click', function() {
  if (!onLoan) {
    onLoan = true;
    money += 500;
    moneySpent.innerText = money.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    loanRepaymentLabel.innerText = repayLoan;
    takeLoan.disabled = true;
    payLoan.disabled = false;
    unlockAchievement(16);
    playSound(takeLoanSound);
  }
  updateStats();
  gameOverCheck();
});
payLoan.addEventListener('click', function() {
  if (onLoan) {
    if (money >= repayLoan) {
      money -= repayLoan;
      moneySpent.innerText = money.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      onLoan = false;
      takeLoan.disabled = false;
      payLoan.disabled = true;
      if (repayLoan > 500) {totalLoansTaken++;}
      loanRepaymentLabel.innerText = "0";
      repayLoan = 500;
      unlockAchievement(17);
      playSound(payLoanSound);
    } else {
      alert("You don't have enough money to pay off the loan.");
    }
    updateStats();
    gameOverCheck();
  }
});
playViaLoanBtn.addEventListener('click', function() {
  gameOverScreen.style.display = "none";
  finsihedMessageShown = false;
  onLoan = true;
  money += 500;
  moneySpent.innerText = money.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  loanRepaymentLabel.innerText = repayLoan;
  takeLoan.disabled = true;
  payLoan.disabled = false;
  const gameData = getGameData();
  const jsonData = JSON.stringify(gameData);
  localStorage.setItem('slotsTycoonSave', jsonData);
  updateStats();
  gameOverCheck();
});

let tenThousandTrophy = document.querySelector('.tenK > button');
let hundredThousandTrophy = document.querySelector('.oneHundredK > button');
let millionTrophy = document.querySelector('.oneMillion > button');
let millionTrophyObtained = false;

let ownedTrophies = document.querySelector('.normal-trophies');

tenThousandTrophy.addEventListener('click', function() {
  if (money >= 10000) {
    money -= 10000;
    moneySpent.innerText = money.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    tenThousandTrophy.disabled = true;
    playSound(trophyPurchsed);
    unlockAchievement(10);

    let trophyIcon = document.createElement('h1');
    trophyIcon.innerText = '🥉';
    ownedTrophies.appendChild(trophyIcon);
  } else {
    alert("You don't have enough money to buy this trophy.");
  }
  gameOverCheck();
});
hundredThousandTrophy.addEventListener('click', function() {
  if (money >= 100000) {
    money -= 100000;
    moneySpent.innerText = money.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    hundredThousandTrophy.disabled = true;
    secondPlaceCheck();
    playSound(trophyPurchsed);
    unlockAchievement(11);

    let trophyIcon = document.createElement('h1');
    trophyIcon.innerText = '🥈';
    ownedTrophies.appendChild(trophyIcon);
  } else {
    alert("You don't have enough money to buy this trophy.");
  }
  gameOverCheck();
});
millionTrophy.addEventListener('click', function() {
  if (money >= 1000000) {
    money -= 1000000;
    moneySpent.innerText = money.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    millionTrophy.disabled = true;
    playSound(trophyPurchsed);
    unlockAchievement(12);
    millionTrophyObtained = true;
    jpMotercycleGangCheck();

    let trophyIcon = document.createElement('h1');
    trophyIcon.innerText = '🥇';
    ownedTrophies.appendChild(trophyIcon);
  } else {
    alert("You don't have enough money to buy this trophy.");
  }
  gameOverCheck();
});

const muteButton = document.querySelector('.mute');
muteButton.addEventListener('click', function () {
  window.soundsMuted = !window.soundsMuted;
  muteButton.innerText = window.soundsMuted ? "Unmute SFX" : "Mute SFX";
});
function playSound(audioSource) {
  if (!window.soundsMuted) {
      const sound = audioSource.cloneNode();
      sound.play();
  }
}
const bgMusic = document.querySelector('.bg-music-mute');
bgMusic.addEventListener('click', function () {
  backgroundAudio.pause();
  backgroundAudio.currentTime = 0;
  backgroundAudio.play();
  backgroundAudio.muted = !backgroundAudio.muted;
  unlockAchievement(36);

  if (bgMusic.innerText == "Mute Background Music") {
    bgMusic.innerText = "Unmute Background Music";
  } else {
    bgMusic.innerText = "Mute Background Music";
  }
});

let lootBoxScreen = document.querySelector('.box-display');
let lbSpin = document.querySelector('.lb-spin');
let lbTerminal = document.querySelector('.lb-terminal');

const normalListLb = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣' ,'9️⃣' ,'🔟'];
const rewardListLb = ['img-1', 'img-2', 'img-3', 'img-4', 'img-5', 'img-6', 'img-7', 'img-8', 'img-9', 'img-10'];

lbSpin.addEventListener('click', function () {
  if (money >= 500) {
    money -= 500;
    moneySpent.innerText = money.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    lbSpin.disabled = true;
    playSound(buyLootBox);

    for (let i = 0; i < 10; i++) {
      setTimeout(function () {
        lootBoxScreen.innerText = normalListLb[i];
      }, 100 * i);
    }
    setTimeout(function () {
      playSound(openLootBox);
      let randomIndex = Math.floor(Math.random() * 10);
      lootBoxScreen.innerText = normalListLb[randomIndex];

      if (rewardListLb[randomIndex] != 100) {
        colors.push(rewardListLb[randomIndex]);
        pointer = colors.length - 1;
        body.className = "";
        body.classList.add(rewardListLb[randomIndex]);

        if (rewardListLb[randomIndex] == 'img-1') {unlockAchievement(34);}
        rewardListLb[randomIndex] = 100;
        lbTerminal.innerText = `You won background #${randomIndex+1}!`;
        lolBgNegativeMultiplier = 5;
      } else {
        money += 100;
        moneySpent.innerText = money.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        lbTerminal.innerText = `You won $100!`;
      }
      if (rewardListLb.every(item => item === 100)) {unlockAchievement(13);}
      lbSpin.disabled = false;
      updateStats();
      gameOverCheck();
    }, 1000);
  } else {
    alert("You don't have enough money to spin the loot box.");
  }
});

// Crypto Update

let crypto = 0;
let perClickCrypto = 0;
let cryptoLolBgNegativeMultiplier = 1;

let dogecoinPerClick = 0;
let bitcoinPerClick = 0;
let ethereumPerClick = 0;

let dogecoinCryptoOwned = 0;
let bitcoinCryptoOwned = 0;
let ethereumCryptoOwned = 0;

let cryptoMine = document.querySelector('.crypto-mine');
let cryptoAutoMine = document.querySelector('.crypto-auto-mine');
let totalCryptoElement = document.querySelector('.total-crypto');
let cryptoPerClick = document.querySelector('.crypto-per-click');

let dogecoinPrice = 1000;
let bitcoinPrice = 5000;
let ethereumPrice = 10000;

let buyDogeCoin = document.querySelector('.buy-dogecoin');
let buyBitcoin = document.querySelector('.buy-bitcoin');
let buyEthereum = document.querySelector('.buy-ethereum');

let dogeCoinOwned = document.querySelector('.dogecoin-owned');
let bitcoinOwned = document.querySelector('.bitcoin-owned');
let ethereumOwned = document.querySelector('.ethereum-owned');

let dogeCoinGiveMoney = 10;
let bitcoinGiveMoney = 75;
let ethereumGiveMoney = 200;

let dogecoinStatLabel = document.querySelector('.dc-stat');
let bitcoinStatLabel = document.querySelector('.bc-stat');
let ethereumStatLabel = document.querySelector('.et-stat');
let nftStatLabel = document.querySelector('.nft-stat');
let carStatLabel = document.querySelector('.car-stat');
let cryptoBackgroundStatLabel = document.querySelector('.crypto-bg-stat');

let nftBonus = 0;
let carBonus = 0;

const buyCryptoSound = new Audio('./assets/crypto/buy-crypto-sfx.mp3');
const mineCryptoMp3 = new Audio('./assets/crypto/mine-crypto-mp3.mp3');

cryptoMine.addEventListener('click', function () {
  crypto += (dogecoinCryptoOwned * dogeCoinGiveMoney * cryptoLolBgNegativeMultiplier);
  crypto += (bitcoinCryptoOwned * bitcoinGiveMoney * cryptoLolBgNegativeMultiplier);
  crypto += (ethereumCryptoOwned * ethereumGiveMoney * cryptoLolBgNegativeMultiplier);
  crypto += nftBonus * cryptoLolBgNegativeMultiplier;
  crypto += carBonus * cryptoLolBgNegativeMultiplier;
  totalCryptoElement.innerText = crypto.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  playSound(mineCryptoMp3);
  if (crypto > 0) {unlockAchievement(18);}
  monopolyMoneyCheck();
});

// Add these variables near your other crypto-related variables
let isAutoMining = false;
let autoMineInterval;
const AUTO_MINE_DELAY = 1000; // 1 second delay between auto mines

// Modify the commented out cryptoAutoMine event listener with this improved version
cryptoAutoMine.addEventListener('click', function () {
    isAutoMining = !isAutoMining;
    
    if (isAutoMining) {
        // Start auto mining
        cryptoAutoMine.innerText = "Auto Mining...";
        cryptoAutoMine.classList.add('active');
        cryptoMine.disabled = true;
        
        autoMineInterval = setInterval(function() {
            // Use the same logic as manual mining
            crypto += (dogecoinCryptoOwned * dogeCoinGiveMoney * cryptoLolBgNegativeMultiplier);
            crypto += (bitcoinCryptoOwned * bitcoinGiveMoney * cryptoLolBgNegativeMultiplier);
            crypto += (ethereumCryptoOwned * ethereumGiveMoney * cryptoLolBgNegativeMultiplier);
            crypto += nftBonus * cryptoLolBgNegativeMultiplier;
            crypto += carBonus * cryptoLolBgNegativeMultiplier;
            
            totalCryptoElement.innerText = crypto.toLocaleString('en-US', { 
                minimumFractionDigits: 0, 
                maximumFractionDigits: 0 
            });
            monopolyMoneyCheck();
            // Play mining sound (optional - might get annoying with auto mining)
            playSound(mineCryptoMp3);
        }, AUTO_MINE_DELAY);
        
    } else {
        // Stop auto mining
        cryptoAutoMine.innerText = "Auto Mine";
        cryptoAutoMine.classList.remove('active');
        cryptoMine.disabled = false;
        clearInterval(autoMineInterval);
    }
});

// Add this to handle cleanup when the game ends
function stopAutoMining() {
    if (isAutoMining) {
        isAutoMining = false;
        cryptoAutoMine.innerText = "Start Auto Mining";
        cryptoAutoMine.classList.remove('active');
        clearInterval(autoMineInterval);
    }
}

buyDogeCoin.addEventListener('click', function () {
  if (money >= dogecoinPrice) {
    money -= dogecoinPrice;
    moneySpent.innerText = money.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    dogecoinCryptoOwned += 1;
    dogecoinPerClick += dogeCoinGiveMoney;
    dogecoinPrice *= 1.5;
    buyDogeCoin.innerText = `$${Math.trunc(dogecoinPrice).toLocaleString()}`;

    perClickCrypto = (dogecoinPerClick + bitcoinPerClick + ethereumPerClick);
    dogeCoinOwned.innerText = `${Math.trunc(dogecoinCryptoOwned).toLocaleString()} Coins Owned`;
    updateCryptoPerClick();
    dogecoinStatLabel.innerText = `${Math.trunc(dogecoinPerClick).toLocaleString()}`;
    playSound(buyCryptoSound);
  } else {
    alert("You don't have enough money to buy this cryptocurrency.");
  }
  gameOverCheck();
});

buyBitcoin.addEventListener('click', function () {
  if (money >= bitcoinPrice) {
    money -= bitcoinPrice;
    moneySpent.innerText = money.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    bitcoinCryptoOwned += 1;
    bitcoinPerClick += bitcoinGiveMoney;
    bitcoinPrice *= 1.5;
    buyBitcoin.innerText = `$${Math.trunc(bitcoinPrice).toLocaleString()}`;

    perClickCrypto = (dogecoinPerClick + bitcoinPerClick + ethereumPerClick);
    bitcoinOwned.innerText = `${Math.trunc(bitcoinCryptoOwned).toLocaleString()} Coins Owned`;
    updateCryptoPerClick();
    bitcoinStatLabel.innerText = `${Math.trunc(bitcoinPerClick).toLocaleString()}`;
    playSound(buyCryptoSound);
  } else {
    alert("You don't have enough money to buy this cryptocurrency.");
  }
  gameOverCheck();
});

buyEthereum.addEventListener('click', function () {
  if (money >= ethereumPrice) {
    money -= ethereumPrice;
    moneySpent.innerText = money.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    ethereumCryptoOwned += 1;
    ethereumPerClick += ethereumGiveMoney;
    ethereumPrice *= 1.5;
    buyEthereum.innerText = `$${Math.trunc(ethereumPrice).toLocaleString()}`;

    perClickCrypto = (dogecoinPerClick + bitcoinPerClick + ethereumPerClick);
    ethereumOwned.innerText = `${Math.trunc(ethereumCryptoOwned).toLocaleString()} Coins Owned`;
    updateCryptoPerClick();
    ethereumStatLabel.innerText = `${Math.trunc(ethereumPerClick).toLocaleString()}`;
    playSound(buyCryptoSound);
  } else {
    alert("You don't have enough money to buy this cryptocurrency.");
  }
  gameOverCheck();
});

let upgradeDogecoin = document.querySelector('.mine-dogecoin');
let upgradeBitcoin = document.querySelector('.mine-bitcoin');
let upgradeEthereum = document.querySelector('.mine-ethereum');

let dogecoinBenifetLabel = document.querySelector('.doge-benefit');
let bitcoinBenifetLabel = document.querySelector('.bitcoin-benefit');
let ethereumBenifetLabel = document.querySelector('.ethereum-benefit');

let dogecoinLevelLabel = document.querySelector('.doge-lvl');
let bitcoinLevelLabel = document.querySelector('.bitcoin-lvl');
let ethereumLevelLabel = document.querySelector('.ethereum-lvl');

let upgradeDogecoinPrice = 1000;
let upgradeBitcoinPrice = 5000;
let upgradeEthereumPrice = 10000;

let dogecoinLevel = 1;
let bitcoinLevel = 1;
let ethereumLevel = 1;

let dogeStat = document.querySelector('.doge-stat');
let bitcoinStat = document.querySelector('.bitcoin-stat');
let ethereumStat = document.querySelector('.ethereum-stat');

upgradeDogecoin.addEventListener('click', function () {
  if (crypto >= upgradeDogecoinPrice) {
    crypto -= upgradeDogecoinPrice;
    totalCryptoElement.innerText = Math.trunc(crypto).toLocaleString();
    upgradeDogecoinPrice *= 2;
    dogecoinLevel += 1;
    dogeCoinGiveMoney *= 1.5;

    dogecoinLevelLabel.innerText = `Level ${dogecoinLevel} > ${dogecoinLevel+1}`;
    dogecoinBenifetLabel.innerText = `₡${Math.trunc(dogeCoinGiveMoney).toLocaleString()} > ₡${Math.trunc(dogeCoinGiveMoney*1.5).toLocaleString()}`;
    upgradeDogecoin.innerText = `₡${Math.trunc(upgradeDogecoinPrice).toLocaleString()}`;
    dogeStat.innerText = `+₡${Math.trunc(dogeCoinGiveMoney).toLocaleString()} Each`;
    playSound(upgradeSound);
    updateCryptoPerClick();
  }
  else {
    alert("You don't have enough money to upgrade this feature.");
  }
});

upgradeBitcoin.addEventListener('click', function () {
  if (crypto >= upgradeBitcoinPrice) {
    crypto -= upgradeBitcoinPrice;
    totalCryptoElement.innerText = Math.trunc(crypto).toLocaleString();
    upgradeBitcoinPrice *= 2;
    bitcoinLevel += 1;
    bitcoinGiveMoney *= 1.5;

    bitcoinLevelLabel.innerText = `Level ${bitcoinLevel} > ${bitcoinLevel+1}`;
    bitcoinBenifetLabel.innerText = `₡${Math.trunc(bitcoinGiveMoney).toLocaleString()} > ₡${Math.trunc(bitcoinGiveMoney*1.5).toLocaleString()}`;
    upgradeBitcoin.innerText = `₡${Math.trunc(upgradeBitcoinPrice).toLocaleString()}`;
    bitcoinStat.innerText = `+₡${Math.trunc(bitcoinGiveMoney).toLocaleString()} Each`;
    playSound(upgradeSound);
    updateCryptoPerClick();
  }
  else {
    alert("You don't have enough money to upgrade this feature.");
  }
});

upgradeEthereum.addEventListener('click', function () {
  if (crypto >= upgradeEthereumPrice) {
    crypto -= upgradeEthereumPrice;
    totalCryptoElement.innerText = Math.trunc(crypto).toLocaleString();
    upgradeEthereumPrice *= 2;
    ethereumLevel += 1;
    ethereumGiveMoney *= 1.5;

    ethereumLevelLabel.innerText = `Level ${ethereumLevel} > ${ethereumLevel+1}`;
    ethereumBenifetLabel.innerText = `₡${Math.trunc(ethereumGiveMoney).toLocaleString()} > ₡${Math.trunc(ethereumGiveMoney*1.5).toLocaleString()}`;
    upgradeEthereum.innerText = `₡${Math.trunc(upgradeEthereumPrice).toLocaleString()}`;
    ethereumStat.innerText = `+₡${Math.trunc(ethereumGiveMoney).toLocaleString()} Each`;
    playSound(upgradeSound);
    updateCryptoPerClick();
  }
  else {
    alert("You don't have enough money to upgrade this feature.");
  }
});

const nftShopPrice = [0, 5000, 1000, 1000, 1500, 1500, 2000, 2500, 3000, 5000, 30000, 5000, 5000, 5000, 10000, 30000, 50000, 100000];
const nftShopItems = ["😁", "😏", "😌", "😛", "🤪", "😡", "😟", "😨", "😵", "🦷", "🦴", "👄", "🦶", "👅", "👀", "🫁", "🫀", "🧠"];

const nftButtons = document.querySelectorAll('.items.nft > div > button');
const nftColectibles = document.querySelector('.collect-nft');

let nftsBought = ["😁"];
let nftShopBonus = 0;
let nftsOwned = 1;

nftButtons.forEach((button, index) => {
  button.addEventListener('click', function() {
    if (crypto >= nftShopPrice[index]) {
      crypto -= nftShopPrice[index];
      totalCryptoElement.innerText = crypto.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
      button.disabled = true;
      perClickCrypto += nftShopPrice[index] * 0.001;
      nftShopBonus += nftShopPrice[index] * 0.001
      updateCryptoPerClick();
      nftsOwned += 1;
      if (nftsOwned == 18) {unlockAchievement(19);}
      nftsBought.push(nftShopItems[index]);
      jpMotercycleGangCheck();
      secondPlaceCheck();

      let colectibleData = document.createElement('h1');
      colectibleData.innerText = nftShopItems[index];
      nftColectibles.appendChild(colectibleData);
      nftBonus += nftShopPrice[index] * 0.001;
      nftStatLabel.innerText = `${Math.trunc(nftBonus)}`;
      playSound(foodPurchase);
    } else {
      alert("You don't have enough money to buy this NFT.");
    }
  });
});

const bike = document.querySelector('.bike');
const car = document.querySelector('.car');
const raceCar = document.querySelector('.race-car');

let bikeText = document.querySelector('.bike > h3');
let carText = document.querySelector('.car > h3');
let raceCarText = document.querySelector('.race-car > h3');
let carsOwned = 0;

let bikeOwned = false;
let carOwned = false;

bike.addEventListener('click', function () {
  if (crypto >= 100000) {
    crypto -= 100000;
    totalCryptoElement.innerText = crypto.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    bikeText.innerText = `Bought Bike`;
    bike.classList.add('bought-car');
    bike.classList.remove('car-shop');
    carBonus += 100;
    carsOwned += 1;
    bikeOwned = true;
    jpMotercycleGangCheck();
    if (carsOwned == 3) {unlockAchievement(20);}
    carStatLabel.innerText = `${Math.trunc(carBonus)}`;
    perClickCrypto += 100;
    updateCryptoPerClick();
    playSound(bgPurchase);
  } else {
    alert("You don't have enough money to buy this car.");
  }
});
car.addEventListener('click', function () {
  if (crypto >= 250000) {
    crypto -= 250000;
    totalCryptoElement.innerText = crypto.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    carText.innerText = `Bought Car`;
    car.classList.add('bought-car');
    car.classList.remove('car-shop');
    carBonus += 300;
    carsOwned += 1;
    carOwned = true;
    if (carsOwned == 3) {unlockAchievement(20);}
    carStatLabel.innerText = `${Math.trunc(carBonus)}`;
    perClickCrypto += 300;
    updateCryptoPerClick();
    playSound(bgPurchase);
  } else {
    alert("You don't have enough money to buy this car.");
  }
});
raceCar.addEventListener('click', function () {
  if (crypto >= 100000) {
    crypto -= 100000;
    totalCryptoElement.innerText = crypto.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    raceCarText.innerText = `Bought Race Car`;
    raceCar.classList.add('bought-car');
    raceCar.classList.remove('car-shop');
    carBonus += 1500;
    carsOwned += 1;
    if (carsOwned == 3) {unlockAchievement(20);}
    carStatLabel.innerText = `${Math.trunc(carBonus)}`;
    perClickCrypto += 1500;
    updateCryptoPerClick();
    playSound(bgPurchase);
  } else {
    alert("You don't have enough money to buy this car.");
  }
});

const oneHundredKCrypto = document.querySelector('.oneHundredKCrypto > button');
const oneMillionCrypto = document.querySelector('.oneMillionCrypto > button');
const tenMillionCrypto = document.querySelector('.tenMillionCrypto > button');
let oneMillionCryptoObtained = false;

let cryptoTrophies = document.querySelector('.owned-crypto-trophies');

oneHundredKCrypto.addEventListener('click', function() {
  if (crypto >= 10000000) {
    crypto -= 10000000;
    totalCryptoElement.innerText = crypto.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    oneHundredKCrypto.disabled = true;
    playSound(trophyPurchsed);
    unlockAchievement(21);

    let trophyIcon = document.createElement('h1');
    trophyIcon.innerText = '💵';
    cryptoTrophies.appendChild(trophyIcon);
  } else {
    alert("You don't have enough money to buy this trophy.");
  }
});
oneMillionCrypto.addEventListener('click', function() {
  if (crypto >= 100000000) {
    crypto -= 100000000;
    totalCryptoElement.innerText = crypto.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    oneMillionCrypto.disabled = true;
    playSound(trophyPurchsed);
    unlockAchievement(22);
    oneMillionCryptoObtained = true;
    secondPlaceCheck();

    let trophyIcon = document.createElement('h1');
    trophyIcon.innerText = '💸';
    cryptoTrophies.appendChild(trophyIcon);
  } else {
    alert("You don't have enough money to buy this trophy.");
  }
});
tenMillionCrypto.addEventListener('click', function() {
  if (crypto >= 1000000000) {
    crypto -= 1000000000;
    totalCryptoElement.innerText = crypto.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    tenMillionCrypto.disabled = true;
    playSound(trophyPurchsed);
    unlockAchievement(23);

    let trophyIcon = document.createElement('h1');
    trophyIcon.innerText = '💳';
    cryptoTrophies.appendChild(trophyIcon);
  } else {
    alert("You don't have enough money to buy this trophy.");
  }
});

let cryptoLootBoxScreen = document.querySelector('.crypto-box-display');
let cryptoLbSpin = document.querySelector('.crypto-lb-spin');
let cryptoLbTerminal = document.querySelector('.crypto-lb-terminal');

const cryptoRewardListLb = ["crypto-bg-1", "crypto-bg-2", "crypto-bg-3", "crypto-bg-4", "crypto-bg-5", "crypto-bg-6", "crypto-bg-7", "crypto-bg-8", "crypto-bg-9", "crypto-bg-10"];

cryptoLbSpin.addEventListener('click', function () {
  if (crypto >= 5000) {
    crypto -= 5000;
    totalCryptoElement.innerText = crypto.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    cryptoLbSpin.disabled = true;
    playSound(buyLootBox);

    for (let i = 0; i < 10; i++) {
      setTimeout(function () {
        cryptoLootBoxScreen.innerText = normalListLb[i];
      }, 100 * i);
    }
    setTimeout(function () {
      playSound(openLootBox);
      let randomIndex = Math.floor(Math.random() * 10);
      cryptoLootBoxScreen.innerText = normalListLb[randomIndex];

      if (cryptoRewardListLb[randomIndex] != 500) {
        colors.push(cryptoRewardListLb[randomIndex]);
        pointer = colors.length - 1;
        body.className = "";
        body.classList.add(cryptoRewardListLb[randomIndex]);
        if (cryptoRewardListLb[randomIndex] == 'crypto-bg-5') {unlockAchievement(38);}

        cryptoRewardListLb[randomIndex] = 500;
        cryptoLbTerminal.innerText = `You won background #${randomIndex+1}!`
        cryptoLolBgNegativeMultiplier = 0.8;
        cryptoBackgroundStatLabel.innerText = `20`;
        updateCryptoPerClick();
      } else {
        crypto += 500;
        totalCryptoElement.innerText = crypto.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
        cryptoLbTerminal.innerText = `You won ₡500!`
      }
      if (cryptoRewardListLb.every(item => item === 500)) {unlockAchievement(24);}
      cryptoLbSpin.disabled = false;
    }, 1000);
  } else {
    alert("You don't have enough crypto to spin the loot box.");
  }
});

function updateCryptoPerClick() {
  let subtotal = (dogecoinCryptoOwned * dogeCoinGiveMoney * cryptoLolBgNegativeMultiplier);
  subtotal += (bitcoinCryptoOwned * bitcoinGiveMoney * cryptoLolBgNegativeMultiplier);
  subtotal += (ethereumCryptoOwned * ethereumGiveMoney * cryptoLolBgNegativeMultiplier);
  subtotal += nftBonus * cryptoLolBgNegativeMultiplier;
  subtotal += carBonus * cryptoLolBgNegativeMultiplier;
  subtotal += nftShopBonus;
  subtotal += carBonus
  cryptoPerClick.innerText = `${Math.trunc(subtotal).toLocaleString()}`;
}

// The Final Update

const takeLoanSound = new Audio('./assets/sounds/take-loan.mp3');
const payLoanSound = new Audio('./assets/sounds/pay-loan.mp3');
const cheatsSound = new Audio('./assets/sounds/cheats-menu.mp3');
const click = new Audio('./assets/sounds/click.mp3');
const adAppeared = new Audio('./assets/sounds/ad-appeared.mp3');

let buyScamCoin = document.querySelector('.buy-scam-coin');
let scamCoinSellPrice = document.querySelector('.scam-coin-sell-price');
let scamCoinDesc = document.querySelector('.scam-coin-desc');
let scamCoinBought = false;
let totalAdSpins = 0;

buyScamCoin.addEventListener('click', function() {
  if (!scamCoinBought && money >= 100000) {
    choice = confirm("Are you sure you want to buy the scam coin for $100,000?\nIt could cause unwanted changes.");
    if (choice == true) {
      money -= 100000;
      moneySpent.innerText = money.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      scamCoinBought = true;
      scamCoinDesc.style.display = "none";
      scamCoinSellPrice.style.display = "block";
      buyScamCoin.disabled = true;
      adblocker.style.display = 'block';
      menuAdblockerBtn.style.display = 'block';
      playSound(loseAudio);
  
      jackpotPrize *= 2;
      twoPairPrize *= 2;
      addedBonus *= 2;
      bgColorMultiplier *= 2;
      lolBgNegativeMultiplier /= 2;
      foodMultiplier *= 2;
      updateStats();
      gameOverCheck();
      if (!achievementEarned[25]) {unlockAchievement(25);}
      else {unlockAchievement(33);}
  
      for (let i = 0; i < 60; i++) {
        setTimeout(function() {
          buyScamCoin.innerText = `${60-i} seconds`;
        }, 1000 * i);
      }
      setTimeout(function() {
        buyScamCoin.innerText = "$80,000";
        buyScamCoin.disabled = false;
      }, 60000);
    } else {
      alert("You have cancelled the purchase of the scam coin.");
    }
  } else if (scamCoinBought) {
    choice = confirm("Are you sure you want to sell the scam coin for $80,000?\nIt will remove your permament 2x money multiplier.");
    if (choice == true) {
      money += 80000;
      moneySpent.innerText = money.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      scamCoinBought = false;
      scamCoinDesc.style.display = "block";
      scamCoinSellPrice.style.display = "none";
      buyScamCoin.disabled = true;
      adblocker.style.display = 'none';
      menuAdblockerBtn.style.display = 'none';
      playSound(winAudio);
  
      jackpotPrize /= 2;
      twoPairPrize /= 2;
      addedBonus /= 2;
      bgColorMultiplier /= 2;
      lolBgNegativeMultiplier *= 2;
      foodMultiplier /= 2;
      updateStats();
      gameOverCheck();
      unlockAchievement(32);
      
      for (let i = 0; i < 60; i++) {
        setTimeout(function() {
          buyScamCoin.innerText = `${60-i} seconds`;
        }, 1000 * i);
      }
      setTimeout(function() {
        buyScamCoin.innerText = "$100,000";
        buyScamCoin.disabled = false;
      }, 60000);
    } else {
      alert("You have cancelled the sale of the scam coin.");
    }
  } else {
    alert("You don't have enough money to buy this scam coin.");
  }
})

let menuAdblockerBtn = document.querySelector('.adblock-btn');
menuAdblockerBtn.addEventListener('click', function() {
  menuAdblockerBtn.scrollIntoView({ behavior: "smooth" });
  window.location.hash = "adblock";
});
let menuPurchasedAdsBtn = document.querySelector('.purchased-ads-btn');
menuPurchasedAdsBtn.addEventListener('click', function() {
  menuPurchasedAdsBtn.scrollIntoView({ behavior: "smooth" });
  window.location.hash = "purchased-ads";
});

let adTitle = ['🖼️', '🧴', '📱', '💻', '📷', '🖥️', '🕹️', '🧸', '🎁', '🎧', '🛏️', '📚', '⌚', '💡', '🖊️', '📝', '🧻', '🧼', '🪒', '🪥', '👓', '🪞', '🍽️', '👒', '🧶'];
let ads = ['Picture', 'Lotion', 'Phone', 'Laptop', 'Camera', 'Monitor', 'Game Console', 'Teddy Bear', 'Gift', 'Headphones', 'Bed', 'Books', 'Watch', 'Light Bulb', 'Pen', 'Notebook', 'Toilet Paper', 'Soap', 'Razor', 'Toothbrush', 'Glasses', 'Mirror', 'Plate Set', 'Hat', 'Yarn'];
let adPrice = [30, 5, 1000, 2000, 500, 150, 300, 10, 50, 200, 4000, 100, 50000, 5, 1, 20, 5, 3, 5, 3, 150, 100, 10, 20, 5];
let adsPurchased = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
let adsContainer = document.querySelector('.all-ads');
let adsBought = 0;
let totalAdsViewed = 0;
let adsClosed = 0;

function createAd() {
  chance = Math.trunc(Math.random() * 10);
  if (chance <= 1) {
    let adNumber = Math.trunc(Math.random() * 25);
    let ad = `
    <div id="ad-item">
      <h1 class="close">X</h1>
      <h1 class="ad-title">${adTitle[adNumber]}</h1>
      <h1 class="ad-item">${ads[adNumber]}</h1>
      <h3 class="ad-price">$${(adPrice[adNumber] * 100).toLocaleString()}</h3>
      <button class="buy-ad secondary">Buy Now</button>
    </div>
    `;
    playSound(adAppeared);
    totalAdsViewed++;
    adsContainer.innerHTML += ad;
    let closeBtns = adsContainer.querySelectorAll('.close');
    closeBtns.forEach(function(closeBtn) {
      closeBtn.addEventListener('click', function() {
        adsContainer.removeChild(closeBtn.parentElement);
        adsClosed++;
        unlockAchievement(30);
        playSound(click);
        if (adsClosed >= 100) {unlockAchievement(31);}
      });
    });
    let buyAdBtns = adsContainer.querySelectorAll('.buy-ad');
    buyAdBtns.forEach(function(buyAdBtn) {
      buyAdBtn.addEventListener('click', function() {
        let adItem = buyAdBtn.parentElement;
        let adPriceValue = parseInt(adItem.querySelector('.ad-price').innerText.replace(/[^0-9]/g, ''));
        if (money >= adPriceValue) {
          money -= adPriceValue;
          moneySpent.innerText = money.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          adsBought++;
          adsPurchased[adNumber] = true;
          adsContainer.removeChild(adItem);
          purchasedAdsBox.style.display = "block";
          menuPurchasedAdsBtn.style.display = "block";

          unlockAchievement(27);
          if (adsPurchased.every(item => item === true)) {unlockAchievement(28);}
          if (adsBought >= 100) {unlockAchievement(29);}
          let adBought = document.createElement('h1');
          adBought.innerText = adItem.querySelector('.ad-title').innerText;
          boughtAds.appendChild(adBought);
          playSound(foodPurchase);
          gameOverCheck();
        } else {
          alert("You don't have enough money to buy this ad.");
        }
      });
    });
  }
}

let adblocker = document.querySelector('#adblock');
let buyAdblocker = document.querySelector('.buy-adblocker');
buyAdblocker.addEventListener('click', function() {
  if (adblockerOff) {
    adblockerOff = false;
    buyAdblocker.innerText = "Cancel Adblocker Subscription";
    unlockAchievement(26);
  } else {
    adblockerOff = true;
    buyAdblocker.innerText = "Buy Adblocker Subscription";
  }
});

let purchasedAdsBox = document.querySelector("#purchased-ads");
let boughtAds = document.querySelector('.bought-ads');
let adblockerOff = true;

let toggleAchievements = document.querySelector('.achievement-btn');
let achievementsBox = document.querySelector(".achievements");
toggleAchievements.addEventListener('click', function() {
  playSound(click);
  if (achievementsBox.style.right === "50%") {
    achievementsBox.style.right = "-50vw";
  } else {
    achievementsBox.style.right = "50%";
  }
});

let achievementBox = document.querySelector('.achievement-box');
let achievementClass = ['the-first-spin','you-beat-it','fatty','dripped-out','it-wont-stop-spinning','money-hungry','lucky','totally-legal','pyramid-scheme','steriroids','participation-award','pwashdollarmarket','lvl-100-mafia','regret','winning-big','so-close-yet-so-far','spare-change','getting-back-up','lets-hope-this-doesnt-crash','scammed','was-that-a-speed-bump','looks-like-it-didnt-crash','crypto-king','crypto-god','virtual-regret','idiot','peace','sponsored','can-i-skip-them-now','wanna-break-from-the-ads','skipped','painful-marketing','scamming-the-scammers','scammed-again','pain-and-suffering','you-found-me','on-the-radio','touch-grass','braindead','japenese-motorcycle-gang','youll-set-me-free-right','exotic-taste','monopoly-money','bankrupt','number-one-fan','second-place','lazy','what-was-that'];
let achievementIcons = ['🎰','🏆','🍔','🌌','🔄','💰','🍀','✅','📈','💪','🎖️','🏦','😎','😢','🎉','😬','🪙','↩️','⛏️','🖼️','🚗','🏆','👑','🙏','😞','🤡','✌️','💼','⏭️','📵','❌','😖','🤝','🔄','🩸','🔍','🎶','🌱','💀','🏍️','🐱','🦜','🤑','🏚️','🌟','🥈','🛋️','🤔'];
let achievementNames = ['The First Spin','You Beat It','Fatty','Dripped Out','It Won’t Stop Spinning','Money Hungry','Lucky','Totally Legal','Pyramid Scheme','Steriroids','Participation Award','PWashDollarMarket','Lvl 100 Mafia','Regret','Winning Big','So Close yet so Far','Spare Change','Getting Back Up',"Let's Hope this Doesn't Crash",'Scammed','Was that a Speed Bump?',"Looks like it Didn't Crash",'Crypto King','Crypto God','Virtual Regret','Idiot','Peace','Sponsored','Can I Skip them Now?','Wanna Break from the Ads?','Skipped','Painful Marketing','Scamming the Scammers','Scammed Again','Pain and Suffering','You Found Me!','On the Radio','Touch Grass','Braindead','Japenese Motorcycle Gang',"You'll set me Free Right?",'Exotic Taste','Monopoly Money','Bankrupt','#1 Fan','2nd Place','Lazy','What was that?'];
let achievementDescriptions = ['Spin your first game.','"Beat" the game.','Get all the foods.','Get all the backgrounds.','Spin 1,000 times.','Buy your first upgrade.','Upgrade your luck to lvl 15.','Upgrade your income to lvl 15.','Upgrade your spin to lvl 15.','Get all the upgrades to lvl 15.','Get the 10k trophy.','Get the 100k trophy.','Get the 1m trophy.','Get all the backgrounds from the lootbox.','Get your first jackpot.','Get two out of three on the machine.','Use your first loan.','Pay back your first loan.','Mine your first crypto.','Get all of the NFTs.','Get all of the cars.','Get the ₡10,000,000 trophy.','Get the ₡100,000,000 trophy.','Get the ₡1,000,000,000 trophy.','Get all the backgrounds from the crypto lootbox.','Buy the scam coin.','Buy the ad blocker.','Buy your first ad.','Buy all the ads.','Get 100 ads in total.','Close 1 ad.','Close 100 ads.','Sell the scam coin back.','Buy the scam coin back.','Get pickle grandma background.','Click this acheivement.','Play the background music.','Get all the achievements besides the random ones.','Tung tung tung sahur.','Get the motorcycle, heart NFT, $1m tophy, and ramen.','Buy a cat from the food shop.','Buy all the animals from the food shop.','Get ₡1,000,000,000,000,000 and $10,000,000.','Let the loan get to $750 intrest.','Click on the credits.','Get ₡100,000,000 trophy, car, heart NFT, $100,000 trophy, and the donut.','Get to the slot machine with the menu bar.','Click on the item in the corner.'];
let achievementEarned = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];

achievementIcons.forEach((icon, index) => {
  let currentAchievement = `
    <div class="${achievementClass[index]} achievement">
      <h1 class="achievement-icon">${icon}</h1>
      <div>
        <h2 class="achievement-name">${achievementNames[index]}</h2>
        <p class="achievement-desc">${achievementDescriptions[index]}</p>
      </div>
    </div>
  `;
  achievementBox.innerHTML += currentAchievement;
});

function unlockAchievement(achNum) {
  if (!achievementEarned[achNum]) {
    achievementEarned[achNum] = true;
    document.querySelector('.'+achievementClass[achNum]).classList.add('unlocked');
    const popupDiv = document.createElement('div');
    popupDiv.className = 'achievement-popup-box';
    popupDiv.innerHTML = `
      <h1 class="achievement-icon">${achievementIcons[achNum]}</h1>
      <div class="upper-achievement-popup">
        <h2 class="achievement-name">${achievementNames[achNum]}</h2>
        <p class="achievement-desc">${achievementDescriptions[achNum]}</p>
      </div>
    `;

    playSound(trophyPurchsed);
    document.body.appendChild(popupDiv);
    popupDiv.style.animation = "achievement-earned 5s";
    setTimeout(function () {
      popupDiv.style.animation = "";
      popupDiv.remove();
      touchGrassCheck();
    }, 5000);
  }
}

document.querySelector(".you-found-me").addEventListener('click', function() {
  unlockAchievement(35);
  document.querySelector(".you-found-me").style.cursor = 'default';
});

let credits = document.querySelector('#credits');
credits.addEventListener('click', function() {
  unlockAchievement(44);
  credits.style.cursor = 'default';
});

function jpMotercycleGangCheck() {
  if (millionTrophyObtained && bikeOwned && nftsBought.includes('🫀') && foodBought.includes('🍜')) {
    unlockAchievement(39);
  }
}
function secondPlaceCheck() {
  if (oneMillionCryptoObtained && nftsBought.includes('🫀') && hundredThousandTrophy.disabled == true && foodBought.includes('🍩') && carOwned) {
    unlockAchievement(45);
  }
}
function monopolyMoneyCheck() {
  if (money >= 10000000 && crypto >= 1000000000000000) {
    unlockAchievement(42);
  }
}
function touchGrassCheck() {
  if (achievementEarned.slice(0, 34).every(achievement => achievement === true)) {
    unlockAchievement(37);
  }
}
let thing = document.querySelector('.thing');
thing.addEventListener('click', function() {
  unlockAchievement(47);
  thing.style.cursor = 'default';
});

let cheatsActive = false;
let cheatsMenu = document.querySelector('.cheats');
let toggleCheats = document.querySelector('.cheats-btn');

function cheatsOn() {
  console.log('%cCHEATS ACTIVATED!', 'color: hotpink; font-weight: bold;');
  cheatsActive = true;
  cheatsMenu.style.display = 'flex';
  playSound(cheatsSound);
}

toggleCheats.addEventListener('click', function() {
  playSound(cheatsSound);
  if (cheatsMenu.style.left == "50%") {
    cheatsMenu.style.left = "calc(-40vw + 49px)";
  } else {
    cheatsMenu.style.left = "50%";
  }
});

let getMoney = document.querySelector('.get-money');
let getCrypto = document.querySelector('.get-crypto');
getMoney.addEventListener('click', function() {
  let askMoney = prompt("How much money do you want to add?");
  askMoney = parseInt(askMoney);
  if (askMoney <= 0 || !isNaN(askMoney)) {
    playSound(cheatsSound);
    money += askMoney;
    moneySpent.innerText = money.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  } else {
    alert("Something went wrong with your input.\nPlease try again.");
  }
});
getCrypto.addEventListener('click', function() {
  let askCrypto = prompt("How much crypto do you want to add?");
  askCrypto = parseInt(askCrypto);
  if (askCrypto <= 0 || !isNaN(askCrypto)) {
    playSound(cheatsSound);
    crypto += askCrypto;
    totalCryptoElement.innerText = crypto.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  } else {
    alert("Something went wrong with your input.\nPlease try again.");
  }
});

let getAchevements = document.querySelector('.get-achievements');
let permanentAdblocker = document.querySelector('.permanent-adblocker');
let guarenteedJackpot = document.querySelector('.guaranteed-jackpot');
let getAllCryptoLb = document.querySelector('.get-all-cryptolb');
let getAllLb = document.querySelector('.get-all-lb');
let getAllAds = document.querySelector('.get-all-ads');

getAchevements.addEventListener('click', function() {
  getAchevements.disabled = true;
  achievementEarned.fill(true);
  achievementBox.querySelectorAll('.achievement').forEach(achievement => {
    achievement.classList.add('unlocked');
  });
  const popupDiv = document.createElement('div');
  popupDiv.className = 'achievement-popup-box';
  popupDiv.innerHTML = `
    <h1 class="achievement-icon">🏆</h1>
    <div class="upper-achievement-popup">
      <h2 class="achievement-name">Cheat Used</h2>
      <p class="achievement-desc">Unlocked all achievements.</p>
    </div>
  `;

  playSound(cheatsSound);
  document.body.appendChild(popupDiv);
  popupDiv.style.animation = "achievement-earned 5s";
  setTimeout(() => {
    popupDiv.style.animation = "";
    popupDiv.remove();
  }, 5000);
});

let permamentAdsOff = false;
permanentAdblocker.addEventListener('click', function() {
  if (!permamentAdsOff) {
    permanentAdblocker.innerText = "Disable Permanent Adblocker";
  } else {
    permanentAdblocker.innerText = "Enable Permanent Adblocker";
  }
  playSound(cheatsSound);
  permamentAdsOff = !permamentAdsOff;
});

guarenteedJackpot.addEventListener('click', function() {
  let remainingSevens = 18 - upgradeLuckLevel;
  symbols = [];
  for (let i = 0; i < remainingSevens; i++) {
    symbols.push("7️⃣");
  }
  playSound(cheatsSound);
  guarenteedJackpot.disabled = true;
});

getAllCryptoLb.addEventListener('click', function() {
  cryptoRewardListLb.forEach((reward, index) => {
    if (reward !== 500 && !colors.includes(reward)) {
      colors.push(reward);
      cryptoRewardListLb[index] = 500;
    }
  });
  unlockAchievement(24);
  unlockAchievement(38);
  playSound(cheatsSound);
  getAllCryptoLb.disabled = true;
});
getAllLb.addEventListener('click', function() {
  rewardListLb.forEach((reward, index) => {
    if (reward !== 100 && !colors.includes(reward)) {
      colors.push(reward);
      rewardListLb[index] = 100;
    }
  });
  unlockAchievement(34);
  unlockAchievement(13);
  playSound(cheatsSound);
  getAllLb.disabled = true;
});
getAllAds.addEventListener('click', function() {
  adsPurchased.fill(true);
  adsBought = 25;
  purchasedAdsBox.style.display = "block";
  menuPurchasedAdsBtn.style.display = "block";
  adTitle.forEach((ad, index) => {
    let adBought = document.createElement('h1');
    adBought.innerText = ad;
    boughtAds.appendChild(adBought);
  });
  unlockAchievement(28);
  unlockAchievement(27);
  playSound(cheatsSound);
  getAllAds.disabled = true;
});

let destroyFunction = document.querySelector('.destroy-function');
let destroyStyle = document.querySelector('.destroy-style');
let destroyWebsite = document.querySelector('.destroy-website');

destroyFunction.addEventListener('click', function() {
  if (confirm("Are you sure you want to destroy the function?\nThis will remove all functionality of the website and cause irreversable changes.\nAre you sure you want to continue?")) {
    // Remove all event listeners
    const allElements = document.querySelectorAll('*');
    allElements.forEach(element => {
        const clone = element.cloneNode(true);
        element.parentNode.replaceChild(clone, element);
    });
    // Clear all intervals and timeouts
    let highestId = window.setTimeout(() => {}, 0);
    for (let i = 0; i < highestId; i++) {
        clearTimeout(i);
        clearInterval(i);
    }
    // Stop auto mining
    if (isAutoMining) {
        stopAutoMining();
    }
    // Stop background music
    backgroundAudio.pause();
    // Reset or null important variables
    money = null;
    crypto = null;
    symbols = [];
    alert("All functionality has been destroyed!");
    playSound(cheatsSound);
    destroyFunction.disabled = true;
  }
});
destroyStyle.addEventListener('click', function() {
  if (confirm("Are you sure you want to destroy the style?\nThis will remove all the styles of the website and cause irreversable changes.\nAre you sure you want to continue?")) {
    const styleSheets = document.styleSheets;
    while(styleSheets.length > 0) {
      styleSheets[0].disabled = true;
      styleSheets[0].ownerNode.remove();
    }
    alert("All styles have been destroyed!");
    playSound(cheatsSound);
    destroyStyle.disabled = true;
  }
});
destroyWebsite.addEventListener('click', function() {
  if (confirm("Are you sure you want to destroy the website?\nThis will remove all the parts of the website that you can see and cause irreversable changes.\nAre you sure you want to continue?")) {
    document.body.innerHTML = "";
    playSound(cheatsSound);
    alert("Website cleared and destroyed!");
  }
});

let secretSong1 = document.querySelector('.play-secret-song-one');
let secretSong4 = document.querySelector('.play-secret-song-four');
let secretSong7 = document.querySelector('.play-secret-song-seven');
let secretSong9 = document.querySelector('.play-secret-song-nine');
let secretMessageBtn = document.querySelector('.secret-message');

secretSong1.addEventListener('click', function() {playSecretSong(song1, 1, secretSong1);});
secretSong4.addEventListener('click', function() {playSecretSong(song4, 4, secretSong4);});
secretSong7.addEventListener('click', function() {playSecretSong(song7, 7, secretSong7);});
secretSong9.addEventListener('click', function() {playSecretSong(song9, 9, secretSong9);});

function playSecretSong(song, songNum, btn) {
  if (song.paused) {
    song.play();
    btn.innerText = `Stop Secret Song ${songNum}`;
  } else {
    song.pause();
    btn.innerText = `Play Secret Song ${songNum}`;
  }
}
secretMessageBtn.addEventListener('click', function() {
  playSound(cheatsSound);
  alert(secretMessage);
});

// Secret
const song1 = new Audio('./assets/bg-music/bg-music-1.m4a');
const song4 = new Audio('./assets/bg-music/bg-music-4.m4a');
const song7 = new Audio('./assets/bg-music/bg-music-7.m4a');
const song9 = new Audio('./assets/bg-music/bg-music-9.m4a');

const secretMessage = "You have found the secret message :O\nNow stop cheating and get back to playing!";

// Save and load game

let saveGameToFile = document.querySelector('.save-file'); //saves a .json file to you computer
let loadGameFromFile = document.querySelector('.load'); //loads a .json file from your computer
let saveGame = document.querySelector('.save'); //saves a cookie with the game data
let restartGame = document.querySelector('.restart'); //deletes all cookies and reloads website

// Function to collect all game data for saving
function getGameData() {
  return {
      // Core game variables
      money: money,
      crypto: crypto,
      totalSpins: totalSpins,
      jackpotPrize: jackpotPrize,
      twoPairPrize: twoPairPrize,
      addedBonus: addedBonus,
      symbols: symbols,
      
      // Upgrades
      upgradeLuckLevel: upgradeLuckLevel,
      upgradeIncomeLevel: upgradeIncomeLevel,
      upgradeSpinLevel: upgradeSpinLevel,
      upgradeLuckPrice: upgradeLuckPrice,
      upgradeIncomePrice: upgradeIncomePrice,
      upgradeSpinPrice: upgradeSpinPrice,
      
      // Food & backgrounds
      foodBought: foodBought,
      foodsOwned: foodsOwned,
      foodMultiplier: foodMultiplier,
      backgroundsOwned: backgroundsOwned,
      bgColorMultiplier: bgColorMultiplier,
      lolBgNegativeMultiplier: lolBgNegativeMultiplier,
      
      // Theme data
      colors: colors,
      pointer: pointer,
      redToOrangeClicked: redToOrangeClicked,
      greenToOrangeClicked: greenToOrangeClicked,
      blueToPurpleClicked: blueToPurpleClicked,
      ultraThemeClicked: ultraThemeClicked,
      superThemeClicked: superThemeClicked,
      bodyClasses: document.body.className,
      
      // Loan data
      onLoan: onLoan,
      repayLoan: repayLoan,
      totalLoansTaken: totalLoansTaken,
      
      // Crypto data
      perClickCrypto: perClickCrypto,
      cryptoLolBgNegativeMultiplier: cryptoLolBgNegativeMultiplier,
      dogecoinPerClick: dogecoinPerClick,
      bitcoinPerClick: bitcoinPerClick,
      ethereumPerClick: ethereumPerClick,
      dogecoinCryptoOwned: dogecoinCryptoOwned,
      bitcoinCryptoOwned: bitcoinCryptoOwned,
      ethereumCryptoOwned: ethereumCryptoOwned,
      dogecoinPrice: dogecoinPrice,
      bitcoinPrice: bitcoinPrice,
      ethereumPrice: ethereumPrice,
      dogeCoinGiveMoney: dogeCoinGiveMoney,
      bitcoinGiveMoney: bitcoinGiveMoney,
      ethereumGiveMoney: ethereumGiveMoney,
      
      // Crypto upgrades
      dogecoinLevel: dogecoinLevel,
      bitcoinLevel: bitcoinLevel,
      ethereumLevel: ethereumLevel,
      upgradeDogecoinPrice: upgradeDogecoinPrice,
      upgradeBitcoinPrice: upgradeBitcoinPrice,
      upgradeEthereumPrice: upgradeEthereumPrice,
      
      // NFTs and cars
      nftsBought: nftsBought,
      nftShopBonus: nftShopBonus,
      nftBonus: nftBonus,
      nftsOwned: nftsOwned,
      carBonus: carBonus,
      carsOwned: carsOwned,
      bikeOwned: bikeOwned,
      carOwned: carOwned,
      
      // Trophies
      millionTrophyObtained: millionTrophyObtained,
      oneMillionCryptoObtained: oneMillionCryptoObtained,
      
      // Scam coin
      scamCoinBought: scamCoinBought,
      prizeLog: prizeLog.innerHTML,
      
      // Ads
      adblockerOff: adblockerOff,
      permamentAdsOff: permamentAdsOff,
      adsPurchased: adsPurchased,
      adsBought: adsBought,
      totalAdsViewed: totalAdsViewed,
      adsClosed: adsClosed,
      
      // Loot boxes
      normalListLb: normalListLb,
      rewardListLb: rewardListLb,
      cryptoRewardListLb: cryptoRewardListLb,
      
      // Achievements
      achievementEarned: achievementEarned,
      
      // Auto-mining
      isAutoMining: isAutoMining,
      
      // Game state
      finsihedMessageShown: finsihedMessageShown,
      cheatsActive: cheatsActive
  };
}

// Save game to file
saveGameToFile.addEventListener('click', function() {
  try {
      const gameData = getGameData();
      const jsonData = JSON.stringify(gameData, null, 2);
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = 'slots-tycoon-save.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      alert("Game saved to file successfully!");
  } catch (error) {
      console.error("Error saving game:", error);
      alert("Error saving game: " + error.message);
  }
});

// Load game from file
loadGameFromFile.addEventListener('click', function() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  
  input.onchange = e => {
      const file = e.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = event => {
          try {
              const gameData = JSON.parse(event.target.result);
              loadGameData(gameData);
              alert("Game loaded successfully!");
          } catch (error) {
              console.error("Error loading game:", error);
              alert("Error loading game: " + error.message);
          }
      };
      reader.readAsText(file);
  };
  
  input.click();
});

// Apply loaded game data
function loadGameData(gameData) {
  try {
      // Handle constant arrays by modifying contents
      symbols.length = 0;
      gameData.symbols.forEach(symbol => symbols.push(symbol));
      
      colors.length = 0;
      gameData.colors.forEach(color => colors.push(color));
      
      // Core game variables
      money = gameData.money;
      crypto = gameData.crypto;
      totalSpins = gameData.totalSpins;
      jackpotPrize = gameData.jackpotPrize;
      twoPairPrize = gameData.twoPairPrize;
      addedBonus = gameData.addedBonus;
      
      // Upgrades
      upgradeLuckLevel = gameData.upgradeLuckLevel;
      upgradeIncomeLevel = gameData.upgradeIncomeLevel;
      upgradeSpinLevel = gameData.upgradeSpinLevel;
      upgradeLuckPrice = gameData.upgradeLuckPrice;
      upgradeIncomePrice = gameData.upgradeIncomePrice;
      upgradeSpinPrice = gameData.upgradeSpinPrice;
      
      // Food & backgrounds
      foodBought = gameData.foodBought;
      foodsOwned = gameData.foodsOwned;
      foodMultiplier = gameData.foodMultiplier;
      backgroundsOwned = gameData.backgroundsOwned;
      bgColorMultiplier = gameData.bgColorMultiplier;
      lolBgNegativeMultiplier = gameData.lolBgNegativeMultiplier;
      
      // Theme data
      pointer = gameData.pointer;
      redToOrangeClicked = gameData.redToOrangeClicked;
      greenToOrangeClicked = gameData.greenToOrangeClicked;
      blueToPurpleClicked = gameData.blueToPurpleClicked;
      ultraThemeClicked = gameData.ultraThemeClicked;
      superThemeClicked = gameData.superThemeClicked;
      document.body.className = gameData.bodyClasses;
      
      // Loan data
      onLoan = gameData.onLoan;
      repayLoan = gameData.repayLoan;
      totalLoansTaken = gameData.totalLoansTaken;
      
      // Crypto data
      perClickCrypto = gameData.perClickCrypto;
      cryptoLolBgNegativeMultiplier = gameData.cryptoLolBgNegativeMultiplier;
      dogecoinPerClick = gameData.dogecoinPerClick;
      bitcoinPerClick = gameData.bitcoinPerClick;
      ethereumPerClick = gameData.ethereumPerClick;
      dogecoinCryptoOwned = gameData.dogecoinCryptoOwned;
      bitcoinCryptoOwned = gameData.bitcoinCryptoOwned;
      ethereumCryptoOwned = gameData.ethereumCryptoOwned;
      dogecoinPrice = gameData.dogecoinPrice;
      bitcoinPrice = gameData.bitcoinPrice;
      ethereumPrice = gameData.ethereumPrice;
      dogeCoinGiveMoney = gameData.dogeCoinGiveMoney;
      bitcoinGiveMoney = gameData.bitcoinGiveMoney;
      ethereumGiveMoney = gameData.ethereumGiveMoney;
      
      // Crypto upgrades
      dogecoinLevel = gameData.dogecoinLevel;
      bitcoinLevel = gameData.bitcoinLevel;
      ethereumLevel = gameData.ethereumLevel;
      upgradeDogecoinPrice = gameData.upgradeDogecoinPrice;
      upgradeBitcoinPrice = gameData.upgradeBitcoinPrice;
      upgradeEthereumPrice = gameData.upgradeEthereumPrice;
      
      // NFTs and cars
      nftsBought = gameData.nftsBought;
      nftShopBonus = gameData.nftShopBonus;
      nftBonus = gameData.nftBonus;
      nftsOwned = gameData.nftsOwned;
      carBonus = gameData.carBonus;
      carsOwned = gameData.carsOwned;
      bikeOwned = gameData.bikeOwned;
      carOwned = gameData.carOwned;
      
      // Trophies
      millionTrophyObtained = gameData.millionTrophyObtained;
      oneMillionCryptoObtained = gameData.oneMillionCryptoObtained;
      
      // Scam coin
      scamCoinBought = gameData.scamCoinBought;
      
      // Ads
      adblockerOff = gameData.adblockerOff;
      permamentAdsOff = gameData.permamentAdsOff;
      adsPurchased = gameData.adsPurchased;
      adsBought = gameData.adsBought;
      totalAdsViewed = gameData.totalAdsViewed;
      adsClosed = gameData.adsClosed;
      
      // Achievements
      achievementEarned = gameData.achievementEarned;
      
      // Auto-mining
      if (gameData.isAutoMining && !isAutoMining) {
          cryptoAutoMine.click(); // Toggle auto mining on
      } else if (!gameData.isAutoMining && isAutoMining) {
          cryptoAutoMine.click(); // Toggle auto mining off
      }

      if (gameData.prizeLog) {
        prizeLog.innerHTML = gameData.prizeLog;
      }
      
      // Game state
      finsihedMessageShown = gameData.finsihedMessageShown;
      cheatsActive = gameData.cheatsActive;
      
      // Update UI
      updateGameUI();
  } catch (error) {
      console.error("Error applying game data:", error);
      throw error;
  }
}

// Update all UI elements to reflect loaded data
function updateGameUI() {
  // Money display
  moneySpent.innerText = money.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  
  // Crypto display
  totalCryptoElement.innerText = crypto.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  
  // Update upgrades UI
  upgradeLuck.innerText = `$${upgradeLuckPrice}`;
  upgradeIncome.innerText = `$${upgradeIncomePrice}`;
  upgradeSpin.innerText = `$${upgradeSpinPrice}`;
  
  // Update level displays
  if (upgradeLuckLevel >= 15) {
      upgradeLuck.disabled = true;
      upgradeLuckContainer.querySelector('p').innerText = `Max Level (Lv. 15)`;
  } else {
      upgradeLuckContainer.querySelector('p').innerText = `Lv. ${upgradeLuckLevel} > Lv. ${upgradeLuckLevel + 1}`;
  }
  
  if (upgradeIncomeLevel >= 15) {
      upgradeIncome.disabled = true;
      upgradeIncomeContainer.querySelector('p').innerText = `Max Level (Lv. 15)`;
  } else {
      upgradeIncomeContainer.querySelector('p').innerText = `Lv. ${upgradeIncomeLevel} > Lv. ${upgradeIncomeLevel + 1}`;
  }
  
  if (upgradeSpinLevel >= 15) {
      upgradeSpin.disabled = true;
      upgradeSpinContainer.querySelector('p').innerText = `Max Level (Lv. 15)`;
  } else {
      upgradeSpinContainer.querySelector('p').innerText = `Lv. ${upgradeSpinLevel} > Lv. ${upgradeSpinLevel + 1}`;
  }
  
  // Update background shop buttons
  if (redToOrangeClicked) {
      redToOrangeBgFade.innerText = "Change";
  }
  if (greenToOrangeClicked) {
      greenToYellowBgFade.innerText = "Change";
  }
  if (blueToPurpleClicked) {
      blueToPurpleBgFade.innerText = "Change";
  }
  if (ultraThemeClicked) {
      ultraThemeBgFade.innerText = "Change";
  }
  if (superThemeClicked) {
      superThemeBgFade.innerText = "Change";
  }
  
  // Update loan UI
  if (onLoan) {
      takeLoan.disabled = true;
      payLoan.disabled = false;
      loanRepaymentLabel.innerText = repayLoan;
  } else {
      takeLoan.disabled = false;
      payLoan.disabled = true;
      loanRepaymentLabel.innerText = "0";
  }
  
  // Update crypto displays
  buyDogeCoin.innerText = `$${Math.trunc(dogecoinPrice).toLocaleString()}`;
  buyBitcoin.innerText = `$${Math.trunc(bitcoinPrice).toLocaleString()}`;
  buyEthereum.innerText = `$${Math.trunc(ethereumPrice).toLocaleString()}`;
  
  dogeCoinOwned.innerText = `${Math.trunc(dogecoinCryptoOwned).toLocaleString()} Coins Owned`;
  bitcoinOwned.innerText = `${Math.trunc(bitcoinCryptoOwned).toLocaleString()} Coins Owned`;
  ethereumOwned.innerText = `${Math.trunc(ethereumCryptoOwned).toLocaleString()} Coins Owned`;
  
  // Update crypto upgrades
  upgradeDogecoin.innerText = `₡${Math.trunc(upgradeDogecoinPrice).toLocaleString()}`;
  upgradeBitcoin.innerText = `₡${Math.trunc(upgradeBitcoinPrice).toLocaleString()}`;
  upgradeEthereum.innerText = `₡${Math.trunc(upgradeEthereumPrice).toLocaleString()}`;
  
  dogecoinLevelLabel.innerText = `Level ${dogecoinLevel} > ${dogecoinLevel+1}`;
  bitcoinLevelLabel.innerText = `Level ${bitcoinLevel} > ${bitcoinLevel+1}`;
  ethereumLevelLabel.innerText = `Level ${ethereumLevel} > ${ethereumLevel+1}`;
  
  // Update benefit displays
  dogecoinBenifetLabel.innerText = `₡${Math.trunc(dogeCoinGiveMoney).toLocaleString()} > ₡${Math.trunc(dogeCoinGiveMoney*1.5).toLocaleString()}`;
  bitcoinBenifetLabel.innerText = `₡${Math.trunc(bitcoinGiveMoney).toLocaleString()} > ₡${Math.trunc(bitcoinGiveMoney*1.5).toLocaleString()}`;
  ethereumBenifetLabel.innerText = `₡${Math.trunc(ethereumGiveMoney).toLocaleString()} > ₡${Math.trunc(ethereumGiveMoney*1.5).toLocaleString()}`;
  
  // Update food collection
  colectibles.innerHTML = '';
  foodBought.forEach(food => {
      const collectibleData = document.createElement('h1');
      collectibleData.innerText = food;
      colectibles.appendChild(collectibleData);
  });
  
  // Update NFT collection
  nftColectibles.innerHTML = '';
  nftsBought.forEach(nft => {
      const collectibleData = document.createElement('h1');
      collectibleData.innerText = nft;
      nftColectibles.appendChild(collectibleData);
  });
  
  // Update food buttons
  buttons.forEach((button, index) => {
      if (foodBought.includes(itemShopItems[index])) {
          button.disabled = true;
      }
  });
  
  // Update NFT buttons
  nftButtons.forEach((button, index) => {
      if (nftsBought.includes(nftShopItems[index])) {
          button.disabled = true;
      }
  });
  
  // Update car states
  if (bikeOwned) {
      bikeText.innerText = `Bought Bike`;
      bike.classList.add('bought-car');
      bike.classList.remove('car-shop');
  }
  if (carOwned) {
      carText.innerText = `Bought Car`;
      car.classList.add('bought-car');
      car.classList.remove('car-shop');
  }
  
  // Update trophy buttons
  if (millionTrophyObtained) {
      millionTrophy.disabled = true;
  }
  if (oneMillionCryptoObtained) {
      oneMillionCrypto.disabled = true;
  }
  
  // Update scam coin UI
  if (scamCoinBought) {
      scamCoinDesc.style.display = "none";
      scamCoinSellPrice.style.display = "block";
      buyScamCoin.innerText = "$80,000";
      adblocker.style.display = 'block';
      menuAdblockerBtn.style.display = 'block';
  } else {
      scamCoinDesc.style.display = "block";
      scamCoinSellPrice.style.display = "none";
      buyScamCoin.innerText = "$100,000";
      adblocker.style.display = 'none';
      menuAdblockerBtn.style.display = 'none';
  }
  
  // Update ad blocker button
  buyAdblocker.innerText = adblockerOff ? "Buy Adblocker Subscription" : "Cancel Adblocker Subscription";
  
  // Update purchased ads
  boughtAds.innerHTML = '';
  if (adsBought > 0) {
      purchasedAdsBox.style.display = "block";
      menuPurchasedAdsBtn.style.display = "block";
      
      adTitle.forEach((ad, index) => {
          if (adsPurchased[index]) {
              const adBought = document.createElement('h1');
              adBought.innerText = ad;
              boughtAds.appendChild(adBought);
          }
      });
  }
  
  // Update achievements
  document.querySelectorAll('.achievement').forEach((achievement, index) => {
      if (achievementEarned[index]) {
          achievement.classList.add('unlocked');
      } else {
          achievement.classList.remove('unlocked');
      }
  });

  // Update cheats menu
  if (cheatsActive) {
    cheatsMenu.style.display = 'flex';
  }

  // Update trophies display
  if (millionTrophyObtained) {
      let trophyIcon = document.createElement('h1');
      trophyIcon.innerText = '🥇';
      ownedTrophies.appendChild(trophyIcon);
  }

  // Update clicked achievements
  if (achievementEarned[35]) {
      document.querySelector(".you-found-me").style.cursor = 'default';
  }
  if (achievementEarned[44]) {
      credits.style.cursor = 'default';
  }
  if (achievementEarned[47]) {
      thing.style.cursor = 'default';
  }

  // Update food and NFT collections
  colectibles.innerHTML = '';
  foodBought.forEach(food => {
      const collectibleData = document.createElement('h1');
      collectibleData.innerText = food;
      colectibles.appendChild(collectibleData);
  });

  nftColectibles.innerHTML = '';
  nftsBought.forEach(nft => {
      const collectibleData = document.createElement('h1');
      collectibleData.innerText = nft;
      nftColectibles.appendChild(collectibleData);
  });

  // Update crypto stats
  dogecoinStatLabel.innerText = `${Math.trunc(dogecoinPerClick).toLocaleString()}`;
  bitcoinStatLabel.innerText = `${Math.trunc(bitcoinPerClick).toLocaleString()}`;
  ethereumStatLabel.innerText = `${Math.trunc(ethereumPerClick).toLocaleString()}`;
  nftStatLabel.innerText = `${Math.trunc(nftBonus)}`;
  carStatLabel.innerText = `${Math.trunc(carBonus)}`;
  cryptoBackgroundStatLabel.innerText = cryptoLolBgNegativeMultiplier === 0.8 ? "20" : "0";

  // Update crypto trophies
  cryptoTrophies.innerHTML = '';
  if (achievementEarned[21]) {
      let trophyIcon = document.createElement('h1');
      trophyIcon.innerText = '💵';
      cryptoTrophies.appendChild(trophyIcon);
      oneHundredKCrypto.disabled = true;
  }
  if (achievementEarned[22]) {
      let trophyIcon = document.createElement('h1');
      trophyIcon.innerText = '💸';
      cryptoTrophies.appendChild(trophyIcon);
      oneMillionCrypto.disabled = true;
  }
  if (achievementEarned[23]) {
      let trophyIcon = document.createElement('h1');
      trophyIcon.innerText = '💳';
      cryptoTrophies.appendChild(trophyIcon);
      tenMillionCrypto.disabled = true;
  }

  // Update all disabled buttons
  if (getAllAds.disabled) getAllAds.disabled = true;
  if (getAchevements.disabled) getAchevements.disabled = true;
  if (getAllLb.disabled) getAllLb.disabled = true;
  if (getAllCryptoLb.disabled) getAllCryptoLb.disabled = true;
  if (guarenteedJackpot.disabled) guarenteedJackpot.disabled = true;
  if (destroyFunction.disabled) destroyFunction.disabled = true;
  if (destroyStyle.disabled) destroyStyle.disabled = true;

  // Update game stats
  updateStats();
  updateCryptoPerClick();
  
  // Check game state
  gameOverCheck();
}

// Cookie management functions
function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1);
      if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length));
  }
  return null;
}

function deleteCookie(name) {
  setCookie(name, '', -1);
}

// Save game to cookie
saveGame.addEventListener('click', function() {
  try {
      // Get game data
      const gameData = getGameData();
      const jsonData = JSON.stringify(gameData);
      deleteCookie('slotsTycoonSave');
      localStorage.setItem('slotsTycoonSave', jsonData);
      
      alert("Game saved successfully!");
      playSound(upgradeSound);
  } catch (error) {
      console.error("Error saving game:", error);
      alert("Error saving game: " + error.message);
  }
});

// Restart game (delete save and refresh)
restartGame.addEventListener('click', function() {
  if (confirm("Are you sure you want to restart the game? All progress will be lost!")) {
      // Delete the save data
      deleteCookie('slotsTycoonSave');
      localStorage.removeItem('slotsTycoonSave');
      
      // Refresh the page
      playSound(loseAudio);
      setTimeout(() => {
          window.location.reload();
      }, 500);
  }
});

// Check for saved game on page load
window.addEventListener('load', function() {
  // Try localStorage first (more reliable for larger saves)
  let savedGame = localStorage.getItem('slotsTycoonSave');
  
  // Fall back to cookies if localStorage is empty
  if (!savedGame) {
      savedGame = getCookie('slotsTycoonSave');
  }
  
  if (savedGame) {
      if (confirm("Would you like to load your saved game?")) {
          try {
              const gameData = JSON.parse(savedGame);
              loadGameData(gameData);
              console.log("Game loaded successfully!");
          } catch (error) {
              console.error("Error loading saved game:", error);
              alert("Error loading saved game: " + error.message);
          }
      }
  }
});

