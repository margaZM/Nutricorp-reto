import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  // sendPasswordResetEmail,
  signInWithEmailLink,
  // onAuthStateChanged,
  // sendEmailVerification,
  signOut,
  updateProfile
} from 'firebase/auth';
import { auth } from './firebaseConfig';

// función para registrarse con email
export const registerUser = (email, password) => (
  createUserWithEmailAndPassword(auth, email, password)
);

// función para loguearse con email
export const loginUser = (email, password) => signInWithEmailAndPassword(auth, email, password);

// // función para resetear contraseña
// export const resetPassword = (auth, email) => sendPasswordResetEmail(auth, email);

export const confirmEmail = (email, href) => signInWithEmailLink(auth, email, href);

// // observador de firebase
// export const onAuthentication = () => onAuthStateChanged(auth, (user) => user);

// verificador de correo
// export const verifyEmail = (user) => sendEmailVerification(user);

// Actualizar info del usuario
export const updateProfileUser = (objectUser) => updateProfile(auth.currentUser, objectUser);

// cerrar Sesión
export const logOut = () => signOut(auth);
