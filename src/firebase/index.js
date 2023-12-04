import { initializeApp } from 'firebase/app'
import { getFirestore, collection, doc } from 'firebase/firestore'

export const firebaseApp = initializeApp({
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID,
})

// used for the firestore refs
const db = getFirestore(firebaseApp)

// here we can export reusable database references
export const productsRef = collection(db, 'urunler')
export const recipesRef = collection(db, 'receteler')

export const recipeIngredientsRef = (recipeId) =>  collection(db, 'receteler', recipeId, 'recete_urunler');
export const ingredientRef = (ingredientId) => doc(db, 'urunler' , ingredientId);
export const recipeRef = (recipeId) => doc(db, 'receteler', recipeId);




