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

function CreateUser() {
  var register = document.querySelector("#register");
  register.addEventListener("click", async function (e) {
    e.preventDefault();

    var LoadingDiVCont = document.querySelector(".LoadingDiVCont");
    LoadingDiVCont.style.display = "flex";
    var UserEmail = document.querySelector("#UserEmail").value;
    var UserPassword = document.querySelector("#UserPassword").value;
    var UserFirstName = document.querySelector("#FirstName").value;
    var UserSecondName = document.querySelector("#SecondName").value;
    var UserPhoneNumber = document.querySelector("#UserPhoneNumber").value;
    var UserLocation = document.querySelector("#UserLocation").value;

    if (
      UserEmail === "" ||
      UserPassword === "" ||
      UserFirstName === "" ||
      UserSecondName === "" ||
      UserPhoneNumber === "" ||
      UserLocation === ""
    ) {
      function DisplayError() {
        var LoadingDiVCont = document.querySelector(".LoadingDiVCont");
        LoadingDiVCont.style.display = "none";
        var ErrorCont = document.querySelector(".FeildMissedErrorCont");
        ErrorCont.style.display = "flex";
        var Closes = document.querySelectorAll("#Close");
        Closes.forEach((Close) => {
          Close.addEventListener("click", function () {
            var ErrorCont = document.querySelector(".FeildMissedErrorCont");
            ErrorCont.style.display = "none";
          });
        });
      }
      DisplayError();
    } else {
      createUserWithEmailAndPassword(auth, UserEmail, UserPassword)
        .then(async (userCredential) => {
          const user = userCredential.user;
          if (user) {
            LoadingDiVCont.style.display = "none";
            await setDoc(doc(db, "Users", user.uid), {
              Email: UserEmail,
              FirstName: UserFirstName,
              SecondName: UserSecondName,
              PhoneNumber: UserPhoneNumber,
              Location: UserLocation,
              Booked: [],
              History: [],
              Role: "User",
              id: user.uid,
            });
            function DisplaySuccess() {
              var LoadingDiVCont = document.querySelector(".LoadingDiVCont");
              LoadingDiVCont.style.display = "none";
              var SuccessCont = document.querySelector(".SuccessCont");
              SuccessCont.style.display = "flex";

              var Closes = document.querySelectorAll("#Close");
              Closes.forEach((Close) => {
                Close.addEventListener("click", function () {
                  var SuccessCont = document.querySelector(".SuccessCont");
                  SuccessCont.style.display = "none";
                });
              });
            }
            DisplaySuccess();
            signInWithEmailAndPassword(auth, UserEmail, UserPassword)
              .then((SiggnedInUserCredential) => {
                const SiggnedInUser = SiggnedInUserCredential.user;
                if (SiggnedInUser) {
                  window.location.href = "index.html";
                }
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
              });
          }
        })
        .catch((error) => {
          if (error.code) {
            function DisplayError() {
              var LoadingDiVCont = document.querySelector(".LoadingDiVCont");
              LoadingDiVCont.style.display = "none";
              var ErrorCont = document.querySelector(".ErrorCont");
              ErrorCont.style.display = "flex";
              document.querySelector("#ErrorMessage").textContent = error.code;
              var Closes = document.querySelectorAll("#Close");
              Closes.forEach((Close) => {
                Close.addEventListener("click", function () {
                  var ErrorCont = document.querySelector(".ErrorCont");
                  ErrorCont.style.display = "none";
                });
              });
            }
            DisplayError();
          }
        });
    }
  });
}

CreateUser();

/* function GetLoggedInUser(){
onAuthStateChanged(auth, (SiggnedInUser) => {
if (SiggnedInUser) {
window.location.href="index.html" 
}  
});
 
}
GetLoggedInUser() */
