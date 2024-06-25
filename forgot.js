import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyBVSfn2Y7kXmPEhmMzrLlcTvUFoI9vHcMk",
  authDomain: "mistri-96063.firebaseapp.com",
  projectId: "mistri-96063",
  storageBucket: "mistri-96063.appspot.com",
  messagingSenderId: "399556928166",
  appId: "1:399556928166:web:97d1b52622aa5d90438a67",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

var find = document.querySelector("#find");
find.addEventListener("click", function (e) {
  e.preventDefault();
  var LoadingDiVCont = document.querySelector(".LoadingDiVCont");
  LoadingDiVCont.style.display = "flex";

  var email = document.querySelector("#UserEmail").value;
  sendPasswordResetEmail(auth, email)
    .then(() => {
      var SuccessCont = document.querySelector(".SuccessCont");
      SuccessCont.style.display = "flex";

      var LoadingDiVCont = document.querySelector(".LoadingDiVCont");
      LoadingDiVCont.style.display = "none";
      var Closes = document.querySelectorAll("#Close");
      var ErrorCont = document.querySelector(".ErrorCont");
      Closes.forEach((Close) => {
        Close.addEventListener("click", function () {
          SuccessCont.style.display = "none";
          ErrorCont.style.display = "none";
        });
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      var ErrorCont = document.querySelector(".ErrorCont");
      ErrorCont.style.display = "flex";
      var LoadingDiVCont = document.querySelector(".LoadingDiVCont");
      LoadingDiVCont.style.display = "none";
      var Closes = document.querySelectorAll("#Close");

      Closes.forEach((Close) => {
        Close.addEventListener("click", function () {
          ErrorCont.style.display = "none";
        });
      });
    });
});
