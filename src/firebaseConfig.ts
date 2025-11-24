// Firebase para EXPO / React Native (sem analytics)
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuração do seu Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAmUMXKz-IcphLT2IbUHUNxyupghzrMwQE",
  authDomain: "imobiliaria-app-3b5ed.firebaseapp.com",
  projectId: "imobiliaria-app-3b5ed",
  storageBucket: "imobiliaria-app-3b5ed.firebasestorage.app",
  messagingSenderId: "634938181174",
  appId: "1:634938181174:web:ef34219f033e9be97e7a97",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta serviços
export const auth = getAuth(app);
export const db = getFirestore(app);
