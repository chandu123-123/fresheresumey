import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmp7srnmsNi2r5dvuvmVuXioLVJY2IXPM",
  authDomain: "fresheresume-6f8bf.firebaseapp.com",
  projectId: "fresheresume-6f8bf",
  storageBucket: "fresheresume-6f8bf.appspot.com",
  messagingSenderId: "462155919412",
  appId: "1:462155919412:web:ead9d14e63e7336108da61"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);