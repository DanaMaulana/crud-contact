import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCfOftBlGmLd1-6Jz9MhuJVRuYMN6SH-pk",
  authDomain: "crud-react-native-59a55.firebaseapp.com",
  databaseURL: "https://crud-react-native-59a55-default-rtdb.firebaseio.com",
  projectId: "crud-react-native-59a55",
  storageBucket: "crud-react-native-59a55.appspot.com",
  messagingSenderId: "937250486535",
  appId: "1:937250486535:web:535f43938328d16120ada2",
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const database = getDatabase(app);

export { app, database };
