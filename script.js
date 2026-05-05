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

window.ajouterTrade = async function () {
  const pseudo = getPseudo();
  const jeu = document.getElementById("jeu")?.value.trim();
  const donne = document.getElementById("donne")?.value.trim();
  const cherche = document.getElementById("cherche")?.value.trim();
  const rarete = document.getElementById("rarete")?.value || "Commun";

  if (!jeu || !donne || !cherche) {
    alert("Remplis tous les champs !");
    return;
  }

  try {
    await addDoc(collection(db, "trades"), {
      pseudo,
      jeu,
      donne,
      cherche,
      rarete,
      createdAt: serverTimestamp()
    });

    alert("Trade publié !");
    document.getElementById("jeu").value = "";
    document.getElementById("donne").value = "";
    document.getElementById("cherche").value = "";
  } catch (error) {
    alert("Erreur Firebase : " + error.message);
    console.error(error);
  }
};

window.envoyerMessage = async function () {
  const pseudo = getPseudo();
  const message = document.getElementById("messageChat")?.value.trim();

  if (!message) {
    alert("Écris un message !");
    return;
  }

  try {
    await addDoc(collection(db, "messages"), {
      pseudo,
      message,
      createdAt: serverTimestamp()
    });

    document.getElementById("messageChat").value = "";
  } catch (error) {
    alert("Erreur Firebase : " + error.message);
    console.error(error);
  }
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
          <span class="rarete">💎 ${t.rarete}</span>
        </div>
      `;
    });
  }, (error) => {
    console.error(error);
    listeTrades.innerHTML = `<p class="empty">Erreur Firebase : ${error.message}</p>`;
  });
}

const messages = document.getElementById("messages");

if (messages) {
  const qMessages = query(collection(db, "messages"), orderBy("createdAt", "asc"));

  onSnapshot(qMessages, (snapshot) => {
    messages.innerHTML = "";

    if (snapshot.empty) {
      messages.innerHTML = `
        <div class="chat-message bot">
          <strong>RbxTrade Nexus</strong>
          <p>Aucun message pour le moment.</p>
        </div>
      `;
      return;
    }

    snapshot.forEach((doc) => {
      const m = doc.data();

      messages.innerHTML += `
        <div class="chat-message">
          <strong>${m.pseudo}</strong>
          <p>${m.message}</p>
        </div>
      `;
    });

    messages.scrollTop = messages.scrollHeight;
  }, (error) => {
    console.error(error);
    messages.innerHTML = `<p class="empty">Erreur Firebase : ${error.message}</p>`;
  });
}

const userPseudo = document.getElementById("userPseudo");
if (userPseudo) {
  userPseudo.innerText = "👤 " + getPseudo();
}