import { initializeApp } from "firebase/app";
import { FacebookAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD4qqEX46YI2bSZlsZHPug6JtTb10DMawE",
  authDomain: "loginn-41432.firebaseapp.com",
  projectId: "loginn-41432",
  storageBucket: "loginn-41432.appspot.com",
  messagingSenderId: "1079725003788",
  appId: "1:1079725003788:web:7c0bca65ef210e5d694a29"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage();

export const provider = new GoogleAuthProvider();
export const provider1 = new GithubAuthProvider();
export const provider2 = new FacebookAuthProvider();
export default app;
