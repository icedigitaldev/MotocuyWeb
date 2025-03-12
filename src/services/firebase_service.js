import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { logInfo } from '@/utils/logger.js';

const firebaseConfig = {
    apiKey: "AIzaSyCwBlSMCpFnquA0maSUzM68TEB-HF1OFJI",
    authDomain: "motocuy-3f14e.firebaseapp.com",
    projectId: "motocuy-3f14e",
    storageBucket: "motocuy-3f14e.appspot.com",
    messagingSenderId: "684315304449",
    appId: "1:684315304449:web:bc38a0bc97791dd66fd600",
    measurementId: "G-SBDDV3H4WG"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

logInfo("Firebase inicializado correctamente");

export { auth, db, storage, analytics };
