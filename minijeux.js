let secretNumber = Math.floor(Math.random() * 10) + 1;
let reflexReady = false;
let reflexStart = 0;

function rollDice() {
  const result = Math.floor(Math.random() * 6) + 1;
  document.getElementById("diceResult").innerText =
    result === 6 ? "🎲 6 PARFAIT !" : "🎲 " + result;
}

function coinFlip() {
  const result = Math.random() < 0.5 ? "Pile" : "Face";
  document.getElementById("coinResult").innerText = "🪙 " + result;
}

function roulette() {
  const rewards = [
    "⭐ Bonus",
    "🌌 Nexus Power",
    "💎 Ultra rare",
    "🔥 Hot Trade",
    "⚡ Boost",
    "❌ Perdu"
  ];

  let result = rewards[Math.floor(Math.random() * rewards.length)];
  document.getElementById("rouletteResult").innerText = result;
}

function startReflex() {
  const btn = document.getElementById("reflexBtn");
  const result = document.getElementById("reflexResult");

  if (reflexReady) {
    const time = Date.now() - reflexStart;
    result.innerText = "⚡ " + time + " ms";
    btn.innerText = "Rejouer";
    btn.classList.remove("ready-reflex");
    reflexReady = false;
    return;
  }

  result.innerText = "Attends le vert...";
  btn.innerText = "Patiente...";
  btn.classList.remove("ready-reflex");

  const delay = Math.floor(Math.random() * 3000) + 1500;

  setTimeout(() => {
    reflexReady = true;
    reflexStart = Date.now();
    btn.innerText = "CLIQUE !";
    btn.classList.add("ready-reflex");
    result.innerText = "GO !";
  }, delay);
}

function guessNumber() {
  const input = document.getElementById("guessInput");
  const result = document.getElementById("guessResult");
  const value = Number(input.value);

  if (!value) {
    result.innerText = "Entre un nombre";
    return;
  }

  if (value === secretNumber) {
    result.innerText = "✅ Trouvé !";
    secretNumber = Math.floor(Math.random() * 10) + 1;
    input.value = "";
  } else if (value < secretNumber) {
    result.innerText = "⬆️ Plus haut";
  } else {
    result.innerText = "⬇️ Plus bas";
  }
}

function openCrystal() {
  const rarities = [
    "⚪ Commun",
    "🔵 Rare",
    "🟣 Épique",
    "🟡 Légendaire",
    "🌈 Mythique",
    "👑 Nexus Divin"
  ];

  const chances = Math.random();
  let result;

  if (chances < 0.45) result = rarities[0];
  else if (chances < 0.70) result = rarities[1];
  else if (chances < 0.87) result = rarities[2];
  else if (chances < 0.96) result = rarities[3];
  else if (chances < 0.995) result = rarities[4];
  else result = rarities[5];

  document.getElementById("crystalResult").innerText = result;
}
