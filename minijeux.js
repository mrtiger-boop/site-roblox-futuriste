function rollDice() {
  const result = Math.floor(Math.random() * 6) + 1;
  document.getElementById("diceResult").innerText = "🎲 " + result;
}

function coinFlip() {
  const result = Math.random() < 0.5 ? "Pile" : "Face";
  document.getElementById("coinResult").innerText = "🪙 " + result;
}

function roulette() {
  const rewards = [
    "⭐ + Chance",
    "🌌 Nexus Power",
    "💎 Ultra rare",
    "🔥 Hot Trade",
    "⚡ Boost",
    "❌ Perdu"
  ];

  const result = rewards[Math.floor(Math.random() * rewards.length)];
  document.getElementById("rouletteResult").innerText = result;
}