import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  increment
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDMxU_41Ss7MXy6HPA-XudDMUZtERI5Y78",
  authDomain: "rbxtrade-nexus.firebaseapp.com",
  projectId: "rbxtrade-nexus",
  storageBucket: "rbxtrade-nexus.firebasestorage.app",
  messagingSenderId: "944237639747",
  appId: "1:944237639747:web:89c56404ad45533ecb3cf6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function getPseudo() {
  return localStorage.getItem("pseudo") || "Invité";
}

function formatTime(date) {
  if (!date) return "";
  return date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit"
  });
}

/* HEADER */
const userPseudo = document.getElementById("userPseudo");
if (userPseudo) {
  userPseudo.innerText = "👤 " + getPseudo();
}

/* ======================
   TRADES
====================== */

window.ajouterTrade = async function () {
  const pseudo = getPseudo();
  const jeu = document.getElementById("jeu")?.value.trim();
  const donne = document.getElementById("donne")?.value.trim();
  const cherche = document.getElementById("cherche")?.value.trim();

  if (!jeu || !donne || !cherche) {
    alert("Remplis tous les champs !");
    return;
  }

  await addDoc(collection(db, "trades"), {
    pseudo,
    jeu,
    donne,
    cherche,
    reputation: 0,
    reports: 0,
    createdAt: serverTimestamp()
  });

  document.getElementById("jeu").value = "";
  document.getElementById("donne").value = "";
  document.getElementById("cherche").value = "";
};

const listeTrades = document.getElementById("listeTrades");

if (listeTrades) {
  const qTrades = query(collection(db, "trades"), orderBy("createdAt", "desc"));

  onSnapshot(qTrades, (snapshot) => {
    listeTrades.innerHTML = "";

    if (snapshot.empty) {
      listeTrades.innerHTML = `<p class="empty">Aucun trade pour le moment.</p>`;
      return;
    }

    snapshot.forEach((document) => {
      const t = document.data();
      const id = document.id;

      listeTrades.innerHTML += `
        <div class="trade">
          <h3>👤 ${t.pseudo}</h3>
          <p><strong>🎮 Jeu :</strong> ${t.jeu}</p>
          <p><strong>📦 Donne :</strong> ${t.donne}</p>
          <p><strong>🔍 Cherche :</strong> ${t.cherche}</p>

          <div class="reputation-box">
            <span>⭐ Réputation : ${t.reputation || 0}</span>
            <span>⚠️ Signalements : ${t.reports || 0}</span>
          </div>

          <button onclick="ajouterReputation('${id}')">⭐ + Réputation</button>
          <button class="report-btn" onclick="signalerTrade('${id}')">⚠️ Signaler</button>
        </div>
      `;
    });
  });
}

window.ajouterReputation = async function (tradeId) {
  const key = "rep_" + tradeId;

  if (localStorage.getItem(key)) {
    alert("Tu as déjà donné une réputation à ce trade.");
    return;
  }

  await updateDoc(doc(db, "trades", tradeId), {
    reputation: increment(1)
  });

  localStorage.setItem(key, "true");
};

window.signalerTrade = async function (tradeId) {
  const key = "report_" + tradeId;

  if (localStorage.getItem(key)) {
    alert("Tu as déjà signalé ce trade.");
    return;
  }

  await updateDoc(doc(db, "trades", tradeId), {
    reports: increment(1)
  });

  localStorage.setItem(key, "true");
  alert("Trade signalé.");
};

/* ======================
   CHAT
====================== */

window.envoyerMessage = async function () {
  const pseudo = getPseudo();
  const message = document.getElementById("messageChat")?.value.trim();

  if (!message) {
    alert("Écris un message !");
    return;
  }

  await addDoc(collection(db, "messages"), {
    pseudo,
    message,
    createdAt: serverTimestamp()
  });

  document.getElementById("messageChat").value = "";
};

const messages = document.getElementById("messages");

if (messages) {
  const qMessages = query(collection(db, "messages"), orderBy("createdAt", "asc"));

  onSnapshot(qMessages, (snapshot) => {
    messages.innerHTML = "";

    if (snapshot.empty) {
      messages.innerHTML = `
        <div class="chat-message">
          <strong>RbxTrade Nexus</strong>
          <p>Aucun message pour le moment.</p>
        </div>
      `;
      return;
    }

    snapshot.forEach((document) => {
      const m = document.data();
      const time = m.createdAt?.toDate ? formatTime(m.createdAt.toDate()) : "";

      messages.innerHTML += `
        <div class="chat-message">
          <div class="chat-message-top">
            <strong>${m.pseudo}</strong>
            <span>${time}</span>
          </div>
          <p>${m.message}</p>
        </div>
      `;
    });

    messages.scrollTop = messages.scrollHeight;
  });
}

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

    snapshot.forEach((document) => {
      if (document.data().pseudo === pseudo) userTrades++;
    });

    if (tradeCount) tradeCount.innerText = userTrades;
    updateLevel();
  });

  onSnapshot(collection(db, "messages"), (snapshot) => {
    userMessages = 0;

    snapshot.forEach((document) => {
      if (document.data().pseudo === pseudo) userMessages++;
    });

    if (messageCount) messageCount.innerText = userMessages;
    updateLevel();
  });
}
