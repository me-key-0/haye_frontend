// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { signOut } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyDTj6_35Zg9e2_RIjaBHNdGpjeS6Hz4JdU",
    authDomain: "haye-7ff6f.firebaseapp.com",
    projectId: "haye-7ff6f",
    storageBucket: "haye-7ff6f.appspot.com",
    messagingSenderId: "605968498095",
    appId: "1:605968498095:web:01521dc81f43fb7284c35a",
    measurementId: "G-JGF6XDY9Q3"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
};
export const signOutFromGoogle = () => {
    return signOut(auth);
};


