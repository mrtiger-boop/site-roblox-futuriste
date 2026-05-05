/* ======================
   PROFIL +++
====================== */

const profileName = document.getElementById("profileName");
const profileAvatar = document.getElementById("profileAvatar");
const profileBadge = document.getElementById("profileBadge");
const tradeCount = document.getElementById("tradeCount");
const messageCount = document.getElementById("messageCount");
const profileLevel = document.getElementById("profileLevel");
const xpFill = document.getElementById("xpFill");

if (profileName && profileAvatar && profileBadge) {
  const pseudo = getPseudo();

  profileName.innerText = pseudo;
  profileAvatar.src = `https://robohash.org/${pseudo}.png?set=set4`;

  if (pseudo.toLowerCase() === "alan224402") {
    profileBadge.innerText = "👑 Fondateur";
    profileBadge.classList.add("founder-badge");
  } else if (pseudo === "Invité") {
    profileBadge.innerText = "Invité";
  } else {
    profileBadge.innerText = "🌌 Membre Nexus";
  }

  let userTrades = 0;
  let userMessages = 0;

  function updateLevel() {
    const xp = userTrades * 25 + userMessages * 5;
    const level = Math.max(1, Math.floor(xp / 100) + 1);
    const progress = xp % 100;

    if (profileLevel) profileLevel.innerText = level;
    if (xpFill) xpFill.style.width = progress + "%";
  }

  onSnapshot(collection(db, "trades"), (snapshot) => {
    userTrades = 0;

    snapshot.forEach((doc) => {
      if (doc.data().pseudo === pseudo) userTrades++;
    });

    if (tradeCount) tradeCount.innerText = userTrades;
    updateLevel();
  });

  onSnapshot(collection(db, "messages"), (snapshot) => {
    userMessages = 0;

    snapshot.forEach((doc) => {
      if (doc.data().pseudo === pseudo) userMessages++;
    });

    if (messageCount) messageCount.innerText = userMessages;
    updateLevel();
  });
}
