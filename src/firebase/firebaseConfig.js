import firebase from 'firebase/compat/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBQ-FkY34ki5lXPZmNbtf56LOEpkXapB9o',
  authDomain: 'nutricorp-43796.firebaseapp.com',
  projectId: 'nutricorp-43796',
  storageBucket: 'nutricorp-43796.appspot.com',
  messagingSenderId: '877439371488',
  appId: '1:877439371488:web:06971faca13491a8272885',
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// exportando los servicios de firebase
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
