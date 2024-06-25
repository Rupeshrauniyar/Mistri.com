import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
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

function LoginUser() {
  var login = document.querySelector("#login");
  login.addEventListener("click", async function (e) {
    e.preventDefault();

    var LoadingDiVCont = document.querySelector(".LoadingDiVCont");
    LoadingDiVCont.style.display = "flex";

    var UserEmail = document.querySelector("#UserEmail").value;
    var UserPassword = document.querySelector("#UserPassword").value;

    signInWithEmailAndPassword(auth, UserEmail, UserPassword)
      .then((SiggnedInUserCredential) => {
        const SiggnedInUser = SiggnedInUserCredential.user;
        if (SiggnedInUser) {
          LoadingDiVCont.style.display = "none";
          window.location.href = "index.html";
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        LoadingDiVCont.style.display = "none";
        var ErrorCont = document.querySelector(".ErrorCont");
        ErrorCont.style.display = "flex";

        var Close = document.querySelector("#Close");
        Close.addEventListener("click", function () {
          ErrorCont.style.display = "none";
        });
      });
  });
}

LoginUser();

function GetLoggedInUser() {
  onAuthStateChanged(auth, (SiggnedInUser) => {
    if (SiggnedInUser) {
      window.location.href = "index.html";
    }
  });
}
