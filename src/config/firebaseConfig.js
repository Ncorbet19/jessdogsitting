// Import the necessary services and SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAEJ8aZV3BcwjS0xijFxxPngpRy9PBkoMk",
  authDomain: "jilldogsitting.firebaseapp.com",
  projectId: "jilldogsitting",
  storageBucket: "jilldogsitting.appspot.com",
  messagingSenderId: "725353207033",
  appId: "1:725353207033:web:75f0fa27accfb4ffa67e28",
  measurementId: "G-7D55L8G25C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Export the necessary instances
export { db, analytics };
