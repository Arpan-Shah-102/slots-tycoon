spin = document.querySelector('.spin');
autoSpin = document.querySelector('.auto-spin');

terminal = document.querySelector('.terminal');
moneySpent = document.querySelector('.money > span');
money = 1000

a = document.querySelector('.a');
b = document.querySelector('.b');
c = document.querySelector('.c');

body = document.querySelector('body');
colorThemes = document.querySelector('.color-themes');

slotSound = new Audio('./assets/slot-spin-sound.mp3');
slotPayout = new Audio('./assets/slot-payout.mp3');
jackpot = new Audio('./assets/jackpot.mp3');

spin.addEventListener("click", function() {spinSlot(1, false)});
autoSpin.addEventListener("click", function() {
  try {
    numberOfItereations = Number(prompt("How many times would you like to spin?"));
    if (isNaN(numberOfItereations) || numberOfItereations <= 0) {
      throw new Error("Invalid number of iterations. Please enter a positive number.");
    }
    spinSlot(numberOfItereations, true);
  }
  catch (err) {
    alert("You did not enter a valid number. Please try again.");
    console.log(err);
  }
});

symbols = ['🍒','💎','🔔','🍉','⭐','🍇','7️⃣','🥇','🥈','🥉', '🍋', '🪙', '🥭'];
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
      moneySpent.innerText = money;

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
        if (s1 == s2 && s2 == s3) {
          money += 300
          terminal.innerText = "Congratulations! You won $300!";
          moneySpent.innerText = money;
          jackpot.play();
        }
        else if (s1 == s2 || s1 == s3 || s2 == s3) {
          money += 10
          terminal.innerText = "Congratulations! You won $10!";
          moneySpent.innerText = money;
          slotPayout.play();
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
    }, 1250 * j * multiplier);
  }
}

colorThemes.addEventListener("click", function () {body.classList.toggle("dark");});