import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot
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

/* ======================
   AFFICHER PSEUDO HEADER
====================== */

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

    snapshot.forEach((doc) => {
      const t = doc.data();

      listeTrades.innerHTML += `
        <div class="trade">
          <h3>👤 ${t.pseudo}</h3>
          <p><strong>🎮 Jeu :</strong> ${t.jeu}</p>
          <p><strong>📦 Donne :</strong> ${t.donne}</p>
          <p><strong>🔍 Cherche :</strong> ${t.cherche}</p>
          <span class="rarete">💱 TRADE</span>
        </div>
      `;
    });
  });
}

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

    snapshot.forEach((doc) => {
      const m = doc.data();
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
   PROFIL
====================== */

const profileName = document.getElementById("profileName");
const profileAvatar = document.getElementById("profileAvatar");
const profileBadge = document.getElementById("profileBadge");
const tradeCount = document.getElementById("tradeCount");
const messageCount = document.getElementById("messageCount");

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

  onSnapshot(collection(db, "trades"), (snapshot) => {
    let count = 0;

    snapshot.forEach((doc) => {
      if (doc.data().pseudo === pseudo) count++;
    });

    tradeCount.innerText = count;
  });

  onSnapshot(collection(db, "messages"), (snapshot) => {
    let count = 0;

    snapshot.forEach((doc) => {
      if (doc.data().pseudo === pseudo) count++;
    });

    messageCount.innerText = count;
  });
}
