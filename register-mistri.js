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
import {
  getStorage,
  ref as sRef,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
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
const ImgDb = getStorage(app);

async function CreateMistri() {
  var DocumentProof = document.querySelector("#DocumentProof");
  var Image;

  DocumentProof.addEventListener("change", function (e) {
    Image = e.target.files[0];
    var DisplayProof = document.querySelector("#DisplayProof");
    if (Image) {
      const Reader = new FileReader();
      Reader.onload = function (event) {
        DisplayProof.src = event.target.result;
      };
      Reader.readAsDataURL(Image);
    }
  });

  var ProfilePicture = document.querySelector("#ProfilePicture");
  var ProfileImage;

  ProfilePicture.addEventListener("change", function (e) {
    ProfileImage = e.target.files[0];
    var DisplayProfile = document.querySelector("#DisplayProfile");
    if (ProfileImage) {
      const ProfileReader = new FileReader();
      ProfileReader.onload = function (event) {
        DisplayProfile.src = event.target.result;
      };
      ProfileReader.readAsDataURL(ProfileImage);
    }
  });

  var register = document.querySelector("#register");
  register.addEventListener("click", async function (e) {
    e.preventDefault();

    var LoadingDiVCont = document.querySelector(".LoadingDiVCont");
    LoadingDiVCont.style.display = "flex";
    var MistriEmail = document.querySelector("#MistriEmail").value;
    var MistriPassword = document.querySelector("#MistriPassword").value;
    var MistriFirstName = document.querySelector("#FirstName").value;
    var MistriSecondName = document.querySelector("#SecondName").value;
    var MistriPhoneNumber = document.querySelector("#MistriPhoneNumber").value;
    var MistriAge = document.querySelector("#MistriAge").value;
    var MistriAddress = document.querySelector("#MistriAddress").value;
    var MistriCateogory = document.querySelector("#MistriCateogory").value;

    if (
      MistriEmail === "" ||
      MistriPassword === "" ||
      MistriFirstName === "" ||
      MistriSecondName === "" ||
      MistriPhoneNumber === "" ||
      MistriAge === "" ||
      MistriAddress === "" ||
      Image === undefined
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
      var LoadingDiVCont = document.querySelector(".LoadingDiVCont");
      LoadingDiVCont.style.display = "flex";

      createUserWithEmailAndPassword(auth, MistriEmail, MistriPassword)
        .then(async (MistriCredential) => {
          async function uploadImage(Image, folder) {
            const StorageRef = sRef(
              ImgDb,
              `${folder}/+${Date.now()}+${Image.name}`
            );
            const UploadBuffer = await uploadBytesResumable(StorageRef, Image);
            const ImageUrl = await getDownloadURL(UploadBuffer.ref);
            return ImageUrl;
          }

          const ImageUrl = await uploadImage(Image, "Document Proof");

          const ProfilePic = await uploadImage(ProfileImage, "Profile Picture");

          const Mistri = MistriCredential.user;

          await setDoc(doc(db, "Users", Mistri.uid), {
            Email: MistriEmail,
            FirstName: MistriFirstName,
            SecondName: MistriSecondName,
            PhoneNumber: MistriPhoneNumber,
            Age: MistriAge,
            Address: MistriAddress,
            DocumentProof: ImageUrl,
            ProfilePic: ProfilePic,
            History: [],
            Pending: [],
            Role: "Mistri",
            MistriCateogory,
            id: Mistri.uid,
          });
          await setDoc(doc(db, "Mistri", Mistri.uid), {
            Email: MistriEmail,
            FirstName: MistriFirstName,
            SecondName: MistriSecondName,
            PhoneNumber: MistriPhoneNumber,
            Age: MistriAge,
            Address: MistriAddress,
            DocumentProof: ImageUrl,
            ProfilePic: ProfilePic,
            History: [],
            Pending: [],
            Role: "Mistri",
            MistriCateogory,
            id: Mistri.uid,
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

                signInWithEmailAndPassword(auth, MistriEmail, MistriPassword)
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
              });
            });
          }
          DisplaySuccess();
        })

        .catch((err) => {
          if (err.code) {
            function DisplayError() {
              var LoadingDiVCont = document.querySelector(".LoadingDiVCont");
              LoadingDiVCont.style.display = "none";
              var ErrorCont = document.querySelector(".ErrorCont");
              ErrorCont.style.display = "flex";
              document.querySelector("#ErrorMessage").textContent = err.code;
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

CreateMistri();
