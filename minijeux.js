let secretNumber = Math.floor(Math.random() * 10) + 1;
let reflexReady = false;
let reflexStart = 0;
let alienScore = 0;

function rollDice() {
  const r = Math.floor(Math.random() * 6) + 1;
  document.getElementById("diceResult").innerText = r === 6 ? "🎲 6 PARFAIT !" : "🎲 " + r;
}

function coinFlip() {
  document.getElementById("coinResult").innerText = Math.random() < 0.5 ? "🪙 Pile" : "🪙 Face";
}

function roulette() {
  const rewards = ["⭐ Bonus", "🌌 Nexus Power", "💎 Ultra rare", "🔥 Hot Trade", "⚡ Boost", "❌ Perdu"];
  document.getElementById("rouletteResult").innerText = rewards[Math.floor(Math.random() * rewards.length)];
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

  result.innerText = "Attends...";
  btn.innerText = "Patiente...";
  btn.classList.remove("ready-reflex");

  setTimeout(() => {
    reflexReady = true;
    reflexStart = Date.now();
    btn.innerText = "CLIQUE !";
    btn.classList.add("ready-reflex");
    result.innerText = "GO !";
  }, Math.floor(Math.random() * 3000) + 1500);
}

function guessNumber() {
  const value = Number(document.getElementById("guessInput").value);
  const result = document.getElementById("guessResult");

  if (!value) return result.innerText = "Entre un nombre";
  if (value === secretNumber) {
    result.innerText = "✅ Trouvé !";
    secretNumber = Math.floor(Math.random() * 10) + 1;
  } else if (value < secretNumber) {
    result.innerText = "⬆️ Plus haut";
  } else {
    result.innerText = "⬇️ Plus bas";
  }
}

function openCrystal() {
  const chance = Math.random();
  let result = "⚪ Commun";
  if (chance > 0.55) result = "🔵 Rare";
  if (chance > 0.75) result = "🟣 Épique";
  if (chance > 0.9) result = "🟡 Légendaire";
  if (chance > 0.98) result = "🌈 Mythique";
  if (chance > 0.997) result = "👑 Nexus Divin";
  document.getElementById("crystalResult").innerText = result;
}

function cosmicTarget() {
  const score = Math.floor(Math.random() * 101);
  document.getElementById("targetResult").innerText = score > 90 ? "🎯 Centre parfait !" : "🎯 " + score + "%";
}

function memoryCode() {
  const code = Math.floor(1000 + Math.random() * 9000);
  document.getElementById("memoryResult").innerText = "🧠 Code : " + code;
}

function planetLuck() {
  const planets = ["🪐 Saturne rare", "🌍 Terre", "🔴 Mars", "🟣 Planète Nexus", "🌌 Monde secret"];
  document.getElementById("planetResult").innerText = planets[Math.floor(Math.random() * planets.length)];
}

function bombGame() {
  const safe = Math.random() > 0.35;
  document.getElementById("bombResult").innerText = safe ? "✅ Désamorcée !" : "💥 Boom !";
}

function mysteryWord() {
  const words = ["Robux", "Trade", "Galaxy", "Nexus", "Avatar", "Legendary", "Obby"];
  document.getElementById("wordResult").innerText = "🧩 " + words[Math.floor(Math.random() * words.length)];
}

function rocketBoost() {
  const height = Math.floor(Math.random() * 10000);
  document.getElementById("rocketResult").innerText = "🚀 " + height + " km";
}

function blackHole() {
  const survived = Math.random() > 0.45;
  document.getElementById("blackHoleResult").innerText = survived ? "🛡️ Survécu !" : "🕳️ Aspiré...";
}

function galaxyChest() {
  const loot = ["🪙 Pièces cosmiques", "💎 Gemme", "⚡ Boost", "🎁 Coffre vide", "👑 Couronne Nexus"];
  document.getElementById("chestResult").innerText = loot[Math.floor(Math.random() * loot.length)];
}

function randomPotion() {
  const effects = ["🧪 Invisibilité", "🔥 Force", "⚡ Vitesse", "🌀 Téléportation", "😵 Potion ratée"];
  document.getElementById("potionResult").innerText = effects[Math.floor(Math.random() * effects.length)];
}

function alienClicker() {
  alienScore++;
  document.getElementById("alienResult").innerText = "👾 " + alienScore;
}

function satelliteScan() {
  const scans = ["🛰️ Signal faible", "📡 Joueur détecté", "🌌 Zone rare", "💎 Objet repéré", "❌ Rien trouvé"];
  document.getElementById("scanResult").innerText = scans[Math.floor(Math.random() * scans.length)];
}

function oracleNexus() {
  const predictions = [
    "🔮 Un bon trade arrive",
    "🌌 La chance te suit",
    "⚠️ Attention aux arnaques",
    "💎 Offre rare bientôt",
    "🔥 Ton profil va monter"
  ];
  document.getElementById("oracleResult").innerText = predictions[Math.floor(Math.random() * predictions.length)];
}

function bossChance() {
  const dmg = Math.floor(Math.random() * 101);
  document.getElementById("bossResult").innerText = dmg > 85 ? "🐉 Boss vaincu !" : "⚔️ " + dmg + " dégâts";
}

function shootingStar() {
  const wishes = ["🌠 Vœu accepté", "⭐ Chance +", "💫 Presque...", "🌌 Nexus t’écoute", "❌ Étoile ratée"];
  document.getElementById("starResult").innerText = wishes[Math.floor(Math.random() * wishes.length)];
}
