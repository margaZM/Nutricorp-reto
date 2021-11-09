import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  doc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from './firebaseConfig';

// /*  TRAER TODAS LAS COLECCIONES */
export const querySnapshot = (db, col) => getDocs(collection(db, col));

// /*  AGREGA UNA COLECCION */
export const addCollection = (col, object) => addDoc(collection(db, col), object);

// /*  AGREGA COLECCION DE USUARIOS NUEVOS */
export const addUserCollection = (col, object, id) => setDoc(doc(db, col, id), object);

// /*  FILTRA POR UNA CONDICION */
export const filterQuery = (col, property, condition, value) => (
  query(collection(db, col), where(property, condition, value))
);

// /*  ACTUALIZA DATOS DE UNA SUBCOLECCION */
export const updateCollection = (col, id, object) => updateDoc(doc(db, col, id), object);


// /*  TRAE LA COLLECION */
export const getCollection = (col) => query(collection(db, col));
