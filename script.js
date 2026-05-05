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

const getPseudo = () => localStorage.getItem("pseudo") || "Invité";

/* TRADE */
window.ajouterTrade = async () => {
  const jeu = document.getElementById("jeu")?.value;
  const donne = document.getElementById("donne")?.value;
  const cherche = document.getElementById("cherche")?.value;

  if (!jeu || !donne || !cherche) return alert("Remplis tout");

  await addDoc(collection(db, "trades"), {
    pseudo: getPseudo(),
    jeu,
    donne,
    cherche,
    createdAt: serverTimestamp()
  });
};

/* CHAT */
window.envoyerMessage = async () => {
  const message = document.getElementById("messageChat")?.value;

  if (!message) return;

  await addDoc(collection(db, "messages"), {
    pseudo: getPseudo(),
    message,
    createdAt: serverTimestamp()
  });
};

/* AFFICHAGE */
const messages = document.getElementById("messages");
if (messages) {
  onSnapshot(query(collection(db, "messages"), orderBy("createdAt")), snap => {
    messages.innerHTML = "";
    snap.forEach(doc => {
      const m = doc.data();
      messages.innerHTML += `<div class="chat-message">
        <strong>${m.pseudo}</strong>
        <p>${m.message}</p>
      </div>`;
    });
  });
}

/* PROFIL */
const profileName = document.getElementById("profileName");
if (profileName) {
  const pseudo = getPseudo();
  profileName.innerText = pseudo;
  document.getElementById("profileAvatar").src =
    "https://robohash.org/" + pseudo;

  if (pseudo === "alan224402") {
    document.getElementById("profileBadge").innerText = "👑 Fondateur";
  }
}

/* HEADER */
const userPseudo = document.getElementById("userPseudo");
if (userPseudo) userPseudo.innerText = getPseudo();
