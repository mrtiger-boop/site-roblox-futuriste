import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDMxU_41Ss7MXy6HPA-XudDMUZtERI5Y78",
  authDomain: "rbxtrade-nexus.firebaseapp.com",
  projectId: "rbxtrade-nexus",
  storageBucket: "rbxtrade-nexus.firebasestorage.app",
  messagingSenderId: "944237639747",
  appId: "1:944237639747:web:89c56404ad45533ecb3cf6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function pseudoToEmail(pseudo) {
  return pseudo.toLowerCase().replaceAll(" ", "") + "@rbxtrade.com";
}

window.register = async function () {
  const pseudo = document.getElementById("pseudoRegister").value.trim();
  const password = document.getElementById("passwordRegister").value.trim();

  if (!pseudo || !password) {
    alert("Remplis tous les champs !");
    return;
  }

  if (password.length < 6) {
    alert("Le mot de passe doit faire au moins 6 caractères.");
    return;
  }

  try {
    const email = pseudoToEmail(pseudo);
    await createUserWithEmailAndPassword(auth, email, password);

    localStorage.setItem("pseudo", pseudo);

    alert("Compte créé !");
    window.location.href = "index.html";
  } catch (error) {
    alert("Erreur inscription : " + error.message);
    console.error(error);
  }
};

window.login = async function () {
  const pseudo = document.getElementById("pseudoLogin").value.trim();
  const password = document.getElementById("passwordLogin").value.trim();

  if (!pseudo || !password) {
    alert("Remplis tous les champs !");
    return;
  }

  try {
    const email = pseudoToEmail(pseudo);
    await signInWithEmailAndPassword(auth, email, password);

    localStorage.setItem("pseudo", pseudo);

    alert("Connecté !");
    window.location.href = "index.html";
  } catch (error) {
    alert("Erreur connexion : pseudo ou mot de passe incorrect.");
    console.error(error);
  }
};