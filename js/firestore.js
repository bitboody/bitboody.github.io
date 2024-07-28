// // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRdJb17EqmZBbFd2e_lGbzw90hgKD_dxg",
  authDomain: "boodyscomputer.firebaseapp.com",
  projectId: "boodyscomputer",
  storageBucket: "boodyscomputer.appspot.com",
  messagingSenderId: "494071975200",
  appId: "1:494071975200:web:dd222c8439f6f3e1c89b45",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const activityTitle = document.getElementById("activity-title");
const activityDivTitle = document.getElementById("activity-div-title");
const activityState = document.getElementById("activity-state");
const activityImg = document.getElementById("activity-img");

async function getData() {
  const querySnapshot = await getDocs(collection(db, "activity"));
  querySnapshot.forEach((doc) => {
    const activity = doc.data();
    if (activity.title == "Spotify") {
      activityDivTitle.innerText = "Last listened to:";
      activityState.innerText = `${activity.state} - ${activity.details}`;
    } else if (activity.title == "Visual Studio Code") {
      activityDivTitle.innerText = "Last done:";
      activityTitle.innerText = activity.title;
      activityState.innerText = (activity.state + " - " + activity.details).replace("Workspace: ", "");
    } else {
      activityDivTitle.innerText = "Last played:";
      activityTitle.innerText = activity.title;
      activityState.innerText = activity.state + " - " + activity.details;
    }
    activityImg.src = activity.img;
  });
}

getData();