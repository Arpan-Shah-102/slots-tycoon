let totalSpins = 0;
let totalMoney = 5000;

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
const colors = ['black', 'white', 'red', 'green', 'teal', 'blue', 'purple'];
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

let playAgain = document.querySelector('.coninue-playing');
let finsihedMessageShown = false;

let foodMultiplier = 0;
let bgColorMultiplier = 0;
let lolBgNegativeMultiplier = 0;

spin.addEventListener("click", function() {
  try {
    if (10 > totalMoney) {
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
    } else if (numberOfItereations * (10 - totalBonus) > totalMoney) {
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

      totalMoney -= 10;
      if (addedBonus >= 1.15) {
        totalMoney += addedBonus;
      }
      totalMoney += foodMultiplier;
      totalMoney += bgColorMultiplier;
      totalMoney -= lolBgNegativeMultiplier;
      moneySpent.innerText = totalMoney.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

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
          totalMoney += jackpotPrize;
          moneyEarned += jackpotPrize;
          terminal.innerText = `Congratulations! You won $${moneyEarned.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}!`;
          moneySpent.innerText = totalMoney.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          jackpot.play();
          tag.innerText = `Spin ${totalSpins} - $${moneyEarned.toFixed(2)} - ${s1} ${s2} ${s3}`;
          prizeLog.insertBefore(tag, prizeLog.firstChild);
        }
        else if (s1 == s2 || s1 == s3 || s2 == s3) {
          totalMoney += twoPairPrize;
          moneyEarned += twoPairPrize;
          terminal.innerText = `You won $${moneyEarned.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}!`;
          moneySpent.innerText = totalMoney.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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

const menu = document.querySelector('.menu');
const navigation = document.querySelector('.navigation');
menu.addEventListener('click', function () {
  navigation.classList.toggle('show-nav');
});
const navButtons = ["slot-machine", "upgrades", "food-collection", "food-shop", "background-shop", "stats", "trophies", "loot-box", "options", "crypto-mine", "buy-crypto", "mine-crypto", "nft-collection", "nft-shop", "cars", "crypto-stats", "crypto-trophies", "crypto-loot-box", "prize-log", "credits"];
navButtons.forEach((item, index) => {
  document.querySelector(`.${item}-btn`).addEventListener("click", function () {
    document.querySelector(`.${item}-btn`).scrollIntoView({ behavior: "smooth" });
    window.location.hash = item;
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
  changBgColor.play();
  lolBgNegativeMultiplier = 0;
  ['img-1', 'img-2', 'img-3', 'img-4', 'img-5', 'img-6', 'img-7', 'img-8', 'img-9', 'img-10'].forEach(function (item) {
    if (item == colors[pointer]) {
      lolBgNegativeMultiplier = 5;
    }
  });
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

redToOrangeBgFade.addEventListener("click", function() {
  if (!redToOrangeClicked) {
    if (totalMoney >= 1000) {
      totalMoney -= 1000;
      moneySpent.innerText = totalMoney.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      bgColorMultiplier += 1.25;
      redToOrangeBgFade.innerText = "Change";
      bgPurchase.play();

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
    if (totalMoney >= 1000) {
      totalMoney -= 1000;
      moneySpent.innerText = totalMoney.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      bgColorMultiplier += 1.25;
      greenToYellowBgFade.innerText = "Change";
      bgPurchase.play();

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
    if (totalMoney >= 1000) {
      totalMoney -= 1000;
      moneySpent.innerText = totalMoney.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      bgColorMultiplier += 1.25;
      blueToPurpleBgFade.innerText = "Change";
      bgPurchase.play();

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
    if (totalMoney >= 3000) {
      totalMoney -= 3000;
      moneySpent.innerText = totalMoney.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      bgColorMultiplier += 5;
      ultraThemeBgFade.innerText = "Change";
      bgPurchase.play();

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
  if (!ultraThemeClicked) {
    if (totalMoney >= 2000) {
      totalMoney -= 2000;
      moneySpent.innerText = totalMoney.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      bgColorMultiplier += 3.5;
      superThemeBgFade.innerText = "Change";
      bgPurchase.play();

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
  if (totalMoney >= upgradeLuckPrice) {
    if (upgradeLuckLevel < 15) {
      totalMoney -= upgradeLuckPrice;
      moneySpent.innerText = totalMoney.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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
  if (totalMoney >= upgradeIncomePrice) {
    if (upgradeIncomeLevel < 15) {
      totalMoney -= upgradeIncomePrice;
      moneySpent.innerText = totalMoney.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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
  if (totalMoney >= upgradeSpinPrice) {
    if (upgradeSpinLevel < 15) {
      totalMoney -= upgradeSpinPrice;
      moneySpent.innerText = totalMoney.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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
    else if (totalMoney < 10) {
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
const itemShopItems = ["💩", "🍣", "🐲", "😺", "🐶", "🐔", "🐮", "🐷", "🐰", "🐵", "🍪", "🍕", "🍔", "🍟", "🍫", "🍤", "🍩", "🍜"];

const buttons = document.querySelectorAll('.items.food > div > button');
const colectibles = document.querySelector('.collect-food');

buttons.forEach((button, index) => {
  button.addEventListener('click', function() {
    if (totalMoney >= itemShopPrice[index]) {

      totalMoney -= itemShopPrice[index];
      moneySpent.innerText = totalMoney.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      button.disabled = true;
      foodPurchase.play();

      let colectibleData = document.createElement('h1');
      colectibleData.innerText = itemShopItems[index];
      colectibles.appendChild(colectibleData);
      foodMultiplier += itemShopPrice[index] * 0.001;
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
  if (spinStat == 1) {
    spinStat = (0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });;
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

let tenThousandTrophy = document.querySelector('.tenK > button');
let hundredThousandTrophy = document.querySelector('.oneHundredK > button');
let millionTrophy = document.querySelector('.oneMillion > button');

let ownedTrophies = document.querySelector('.normal-trophies');

tenThousandTrophy.addEventListener('click', function() {
  if (totalMoney >= 10000) {
    totalMoney -= 10000;
    moneySpent.innerText = totalMoney.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    tenThousandTrophy.disabled = true;
    trophyPurchsed.play();

    let trophyIcon = document.createElement('h1');
    trophyIcon.innerText = '🥉';
    ownedTrophies.appendChild(trophyIcon);
  } else {
    alert("You don't have enough money to buy this trophy.");
  }
  gameOverCheck();
});
hundredThousandTrophy.addEventListener('click', function() {
  if (totalMoney >= 100000) {
    totalMoney -= 100000;
    moneySpent.innerText = totalMoney.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    hundredThousandTrophy.disabled = true;
    trophyPurchsed.play();

    let trophyIcon = document.createElement('h1');
    trophyIcon.innerText = '🥈';
    ownedTrophies.appendChild(trophyIcon);
  } else {
    alert("You don't have enough money to buy this trophy.");
  }
  gameOverCheck();
});
millionTrophy.addEventListener('click', function() {
  if (totalMoney >= 1000000) {
    totalMoney -= 1000000;
    moneySpent.innerText = totalMoney.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    millionTrophy.disabled = true;
    trophyPurchsed.play();

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
  slotSound.muted = !slotSound.muted;
  slotPayout.muted = !slotPayout.muted;
  jackpot.muted = !jackpot.muted;
  upgradeSound.muted = !upgradeSound.muted;
  winAudio.muted = !winAudio.muted;
  loseAudio.muted = !loseAudio.muted;
  foodPurchase.muted = !foodPurchase.muted;
  changBgColor.muted = !changBgColor.muted;
  bgPurchase.muted = !bgPurchase.muted;
  trophyPurchsed.muted = !trophyPurchsed.muted;
  buyLootBox.muted = !buyLootBox.muted;
  openLootBox.muted = !openLootBox.muted;

  if (muteButton.innerText == "Mute SFX") {
    muteButton.innerText = "Unmute SFX";
  } else {
    muteButton.innerText = "Mute SFX";
  }
});
const bgMusic = document.querySelector('.bg-music-mute');
bgMusic.addEventListener('click', function () {
  backgroundAudio.pause();
  backgroundAudio.currentTime = 0;
  backgroundAudio.play();
  backgroundAudio.muted = !backgroundAudio.muted;

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
  if (totalMoney >= 500) {
    totalMoney -= 500;
    moneySpent.innerText = totalMoney.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    lbSpin.disabled = true;
    buyLootBox.play();

    for (let i = 0; i < 10; i++) {
      setTimeout(function () {
        lootBoxScreen.innerText = normalListLb[i];
      }, 100 * i);
    }
    setTimeout(function () {
      openLootBox.play();
      let randomIndex = Math.floor(Math.random() * 10);
      lootBoxScreen.innerText = normalListLb[randomIndex];

      if (rewardListLb[randomIndex] != 100) {
        colors.push(rewardListLb[randomIndex]);
        pointer = colors.length - 1;
        body.className = "";
        body.classList.add(rewardListLb[randomIndex]);

        rewardListLb[randomIndex] = 100;
        lbTerminal.innerText = `You won background #${randomIndex+1}!`;
        lolBgNegativeMultiplier = 5;
      } else {
        totalMoney += 100;
        moneySpent.innerText = totalMoney.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        lbTerminal.innerText = `You won $100!`;
      }
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
// let cryptoAutoMine = document.querySelector('.crypto-auto-mine');
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

let nftBonus = 0;
let carBonus = 0;

cryptoMine.addEventListener('click', function () {
  crypto += (dogecoinCryptoOwned * dogeCoinGiveMoney * cryptoLolBgNegativeMultiplier);
  crypto += (bitcoinCryptoOwned * bitcoinGiveMoney * cryptoLolBgNegativeMultiplier);
  crypto += (ethereumCryptoOwned * ethereumGiveMoney * cryptoLolBgNegativeMultiplier);
  crypto += nftBonus * cryptoLolBgNegativeMultiplier;
  crypto += carBonus * cryptoLolBgNegativeMultiplier;
  totalCryptoElement.innerText = crypto.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
});

// let cryptoAutoCollect = false;
// cryptoAutoMine.addEventListener('click', function () {
//   cryptoAutoCollect = !cryptoAutoCollect;

//   while (cryptoAutoCollect) {
//     setTimeout(function () {
//       crypto += (dogecoinCryptoOwned * dogeCoinGiveMoney);
//       crypto += (bitcoinCryptoOwned * bitcoinGiveMoney);
//       crypto += (ethereumCryptoOwned * ethereumGiveMoney);
//       totalCryptoElement.innerText = crypto.toLocaleString();
//     }, 1000);
//   }
// });

buyDogeCoin.addEventListener('click', function () {
  if (totalMoney >= dogecoinPrice) {
    totalMoney -= dogecoinPrice;
    moneySpent.innerText = totalMoney.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    dogecoinCryptoOwned += 1;
    dogecoinPerClick += dogeCoinGiveMoney;

    perClickCrypto = (dogecoinPerClick + bitcoinPerClick + ethereumPerClick);
    dogeCoinOwned.innerText = `${Math.trunc(dogecoinCryptoOwned)} Coins Owned`;
    cryptoPerClick.innerText = `${Math.trunc(perClickCrypto)}`;
    dogecoinStatLabel.innerText = `${Math.trunc(dogecoinPerClick)}`;
  }
  gameOverCheck();
});

buyBitcoin.addEventListener('click', function () {
  if (totalMoney >= bitcoinPrice) {
    totalMoney -= bitcoinPrice;
    moneySpent.innerText = totalMoney.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    bitcoinCryptoOwned += 1;
    bitcoinPerClick += bitcoinGiveMoney;

    perClickCrypto = (dogecoinPerClick + bitcoinPerClick + ethereumPerClick);
    bitcoinOwned.innerText = `${Math.trunc(bitcoinCryptoOwned)} Coins Owned`;
    cryptoPerClick.innerText = `${Math.trunc(perClickCrypto)}`;
    bitcoinStatLabel.innerText = `${Math.trunc(bitcoinPerClick)}`;
  }
  gameOverCheck();
});

buyEthereum.addEventListener('click', function () {
  if (totalMoney >= ethereumPrice) {
    totalMoney -= ethereumPrice;
    moneySpent.innerText = totalMoney.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    ethereumCryptoOwned += 1;
    ethereumPerClick += ethereumGiveMoney;

    perClickCrypto = (dogecoinPerClick + bitcoinPerClick + ethereumPerClick);
    ethereumOwned.innerText = `${Math.trunc(bitcoinCryptoOwned)} Coins Owned`;
    cryptoPerClick.innerText = `${Math.trunc(perClickCrypto)}`;
    ethereumStatLabel.innerText = `${Math.trunc(ethereumPerClick)}`;
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

const nftShopPrice = [0, 5000, 1000, 1000, 1500, 1500, 2000, 2500, 3000, 5000, 30000, 5000, 5000, 5000, 10000, 30000, 50000, 100000];
const nftShopItems = ["😁", "😏", "😌", "😛", "🤪", "😡", "😟", "😨", "😵", "🦷", "🦴", "👄", "🦶", "👅", "👀", "🫁", "🫀", "🧠"];

const nftButtons = document.querySelectorAll('.items.nft > div > button');
const nftColectibles = document.querySelector('.collect-nft');

nftButtons.forEach((button, index) => {
  button.addEventListener('click', function() {
    if (crypto >= nftShopPrice[index]) {
      crypto -= nftShopPrice[index];
      totalCryptoElement.innerText = crypto.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
      button.disabled = true;
      perClickCrypto += nftShopPrice[index] * 0.001;
      cryptoPerClick.innerText = `${Math.trunc(perClickCrypto)}`;

      let colectibleData = document.createElement('h1');
      colectibleData.innerText = nftShopItems[index];
      nftColectibles.appendChild(colectibleData);
      nftBonus += nftShopPrice[index] * 0.001;
      nftStatLabel.innerText = `${Math.trunc(nftBonus)}`;
      foodPurchase.play();
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

bike.addEventListener('click', function () {
  if (crypto >= 10000) {
    crypto -= 10000;
    totalCryptoElement.innerText = crypto.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    bikeText.innerText = `Bought Bike`;
    bike.classList.add('bought-car');
    bike.classList.remove('car-shop');
    carBonus += 10;
    carStatLabel.innerText = `${Math.trunc(carBonus)}`;
    perClickCrypto += 10;
    cryptoPerClick.innerText = `${Math.trunc(perClickCrypto)}`;
    bgPurchase.play();
  } else {
    alert("You don't have enough money to buy this car.");
  }
});
car.addEventListener('click', function () {
  if (crypto >= 20000) {
    crypto -= 20000;
    totalCryptoElement.innerText = crypto.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    carText.innerText = `Bought Bike`;
    car.classList.add('bought-car');
    car.classList.remove('car-shop');
    carBonus += 20;
    carStatLabel.innerText = `${Math.trunc(carBonus)}`;
    perClickCrypto += 20;
    cryptoPerClick.innerText = `${Math.trunc(perClickCrypto)}`;
    bgPurchase.play();
  } else {
    alert("You don't have enough money to buy this car.");
  }
});
raceCar.addEventListener('click', function () {
  if (crypto >= 30000) {
    crypto -= 30000;
    totalCryptoElement.innerText = crypto.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    raceCarText.innerText = `Bought Bike`;
    raceCar.classList.add('bought-car');
    raceCar.classList.remove('car-shop');
    carBonus += 30;
    carStatLabel.innerText = `${Math.trunc(carBonus)}`;
    perClickCrypto += 30;
    cryptoPerClick.innerText = `${Math.trunc(perClickCrypto)}`;
    bgPurchase.play();
  } else {
    alert("You don't have enough money to buy this car.");
  }
});

const oneHundredKCrypto = document.querySelector('.oneHundredKCrypto > button');
const oneMillionCrypto = document.querySelector('.oneMillionCrypto > button');
const tenMillionCrypto = document.querySelector('.tenMillionCrypto > button');

let cryptoTrophies = document.querySelector('.owned-crypto-trophies');

oneHundredKCrypto.addEventListener('click', function() {
  if (crypto >= 100000) {
    crypto -= 100000;
    totalCryptoElement.innerText = crypto.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    oneHundredKCrypto.disabled = true;
    trophyPurchsed.play();

    let trophyIcon = document.createElement('h1');
    trophyIcon.innerText = '💵';
    cryptoTrophies.appendChild(trophyIcon);
  } else {
    alert("You don't have enough money to buy this trophy.");
  }
});
oneMillionCrypto.addEventListener('click', function() {
  if (crypto >= 1000000) {
    crypto -= 1000000;
    totalCryptoElement.innerText = crypto.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    oneMillionCrypto.disabled = true;
    trophyPurchsed.play();

    let trophyIcon = document.createElement('h1');
    trophyIcon.innerText = '💸';
    cryptoTrophies.appendChild(trophyIcon);
  } else {
    alert("You don't have enough money to buy this trophy.");
  }
});
tenMillionCrypto.addEventListener('click', function() {
  if (crypto >= 10000000) {
    crypto -= 10000000;
    totalCryptoElement.innerText = crypto.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    tenMillionCrypto.disabled = true;
    trophyPurchsed.play();

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
    buyLootBox.play();

    for (let i = 0; i < 10; i++) {
      setTimeout(function () {
        cryptoLootBoxScreen.innerText = normalListLb[i];
      }, 100 * i);
    }
    setTimeout(function () {
      openLootBox.play();
      let randomIndex = Math.floor(Math.random() * 10);
      cryptoLootBoxScreen.innerText = normalListLb[randomIndex];

      if (cryptoRewardListLb[randomIndex] != 500) {
        colors.push(cryptoRewardListLb[randomIndex]);
        pointer = colors.length - 1;
        body.className = "";
        body.classList.add(cryptoRewardListLb[randomIndex]);

        cryptoRewardListLb[randomIndex] = 500;
        cryptoLbTerminal.innerText = `You won background #${randomIndex+1}!`
        // cryptoLolBgNegativeMultiplier = 0.8;
        lolBgNegativeMultiplier = 5;
        updateStats();
      } else {
        crypto += 500;
        totalCryptoElement.innerText = crypto.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
        cryptoLbTerminal.innerText = `You won $100!`
      }
      cryptoLbSpin.disabled = false;
    }, 1000);
  } else {
    alert("You don't have enough crypto to spin the loot box.");
  }
});

// Secret
const song1 = new Audio('./assets/bg-music/bg-music-1.m4a');
const song2 = new Audio('./assets/bg-music/bg-music-4.m4a');
const song3 = new Audio('./assets/bg-music/bg-music-7.m4a');
const song4 = new Audio('./assets/bg-music/bg-music-9.m4a');