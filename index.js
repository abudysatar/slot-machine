var btn = document.querySelector(".btn");
var slotMachine = document.querySelector(".slot-machine");
var reel = document.querySelectorAll(".reel img");
var balanceDisplay = document.getElementById("balance");
var balance = 30;

var buttonSound = document.getElementById("buttonSound");

btn.addEventListener("click", function () {
  buttonSound.currentTime = 0;
  buttonSound.play();

  if (balance <= 0) {
    document.querySelector("h1").textContent =
      "❌ Not enough balance to spin! ❌";
    return;
  }

  balance--;
  balanceDisplay.textContent = "Balance: $" + balance;

  var results = [];

  reel.forEach(function (img) {
    var start = Math.floor(Math.random() * 5) + 1;
    img.src = "img/reel" + start + ".png";
    results.push(start);
  });

  if (results[0] === results[1] && results[1] === results[2]) {
    if (results[0] === 1) {
      document.querySelector("h1").textContent =
        "🎉🎉🎉🎉🎰 BIG WIN JACKPOT! 🎉🎉🎉🎉🎰 ";
      balance += 10;
    } else {
      document.querySelector("h1").textContent = "🎉 You Win! 🎉";
      balance += 5;
    }
  } else {
    document.querySelector("h1").textContent = "❌ Try Again! ❌";
  }

  balanceDisplay.textContent = "Balance: $" + balance;
});

window.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    btn.click();
  }
});

const audio = new Audio("sounds/bruit-2-casino-56939.mp3");

audio.addEventListener("canplaythrough", () => {
  audio.play().catch((e) => {
    window.addEventListener(
      "click",
      () => {
        audio.play();
      },
      { once: true }
    );
  });
});
