import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB1LJD4Qsqg8VgB1FtY8qjTN7BMTCPyBHI",
  authDomain: "construtech-3746b.firebaseapp.com",
  projectId: "construtech-3746b",
  storageBucket: "construtech-3746b.appspot.com", // ✅ corrigido aqui
  messagingSenderId: "586132498297",
  appId: "1:586132498297:web:5cf1245230f002afcb71a8",
  measurementId: "G-E3S9N8X47N"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);

export {
  database,
  storage,
  ref,
  set,
  push,
  storageRef,
  uploadBytes,
  getDownloadURL
};
