import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBSWiq8QO39V6AdYsIN6jXFTV5F8eUfhI",
  authDomain: "timeshare-exchange-platform.firebaseapp.com",
  projectId: "timeshare-exchange-platform",
  storageBucket: "timeshare-exchange-platform.appspot.com",
  messagingSenderId: "622909664725",
  appId: "1:622909664725:web:68bf675681ed12076f215c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
