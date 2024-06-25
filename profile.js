import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  enableIndexedDbPersistence,
  initializeFirestore,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

/* Importing Elements */

const firebaseConfig = {
  apiKey: "AIzaSyBVSfn2Y7kXmPEhmMzrLlcTvUFoI9vHcMk",
  authDomain: "mistri-96063.firebaseapp.com",
  projectId: "mistri-96063",
  storageBucket: "mistri-96063.appspot.com",
  messagingSenderId: "399556928166",
  appId: "1:399556928166:web:97d1b52622aa5d90438a67",
};

/* Firebase Credentials */
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

/* 
enableIndexedDbPersistence(db, { experimentalForceOwningTabs: true })
    .catch((err) => {
        if (err.code == 'failed-precondition') {
var RefreshPage = document.querySelector(".RefreshPage")  
RefreshPage.style.display="flex"         
var RefreshBtn = document.querySelector("#RefreshBtn") 
RefreshBtn.addEventListener("click", function(){
GetLoggedInUser() 
GetMistris() 
})
        } else if (err.code == 'unimplemented') {
            
        }
    }); */

async function GetLoggedInUser() {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      return user;
      try {
        const FetchMyDets = await getDoc(doc(db, "Users", user.uid));
        if (FetchMyDets.exists()) {
          const Role = FetchMyDets.data().Role;
          const MyEmail = FetchMyDets.data().Email;
          const MyFirstName = FetchMyDets.data().FirstName;
          const MySecondName = FetchMyDets.data().SecondName;
          const MyPhoneNumber = FetchMyDets.data().PhoneNumber;
          document.querySelector("#username").textContent = MyFirstName;
        }
      } catch (error) {}
    } else {
      var LogOutBtn = document.querySelector("#LogOut");
      LogOutBtn.style.display = "none";
      document.querySelector("#username").textContent = "Guest";
    }
  });
}
GetLoggedInUser();

var MistriClutter = "";

var MistriClutter = "";
async function GetMistris() {
  try {
    function ExtractUrl(param) {
      const UrlReader = new URLSearchParams(window.location.search);
      return UrlReader.get(param);
    }
    const UserId = ExtractUrl("u");
    const FetchMistri = await getDoc(doc(db, "Mistri", UserId));
    if (FetchMistri.exists()) {
      const Email = FetchMistri.data().Email;
      const FirstName = FetchMistri.data().FirstName;
      const SecondName = FetchMistri.data().SecondName;
      const Age = FetchMistri.data().Age;
      const PhoneNumber = FetchMistri.data().PhoneNumber;
      const Cateogory = FetchMistri.data().MistriCateogory;
      const Address = FetchMistri.data().Address;
      const ProfilePicture = FetchMistri.data().ProfilePic;
      const Pending = FetchMistri.data().Pending;

      console.log(FirstName);

      var MistriContainer = document.querySelector(".MistriContainer");
      var books = document.querySelectorAll("#book");

      var Status;
      var Background;

      if (Pending.length === 0) {
        Status = "Available";
        Background = "#59d28c";
      } else {
        Status = `Working <i class="fa-light fa-hammer"></i>`;
        Background = "red";
      }

      MistriClutter += `<div class="MistriCont">
<div class="MistriNav"> 
 <h3 id="MistriStatus" style="background-color:${Background};">${Status}</h3>
 <p>${Email}</p>
</div> 

<div class="ImageContainer skeleton" >
 <img src=${ProfilePicture} alt="" id="DisplayProfile">
</div>
<h3>${FirstName} ${SecondName}</h3>
<div class="MistriDetails ">
 
 <p>${Cateogory}</p>
  <p>${Address}</p>
  <p>${Age} Years</p>
  <p>${PhoneNumber} </p>
 

 </div>
 <p id="certified">Certified<i class="fa-thin fa-circle-check"></i></p>
<div class="BookMistri">
 
 <button id="book" >Book</button> 
 
 
 
 
 
 
</div> 
</div>
 `;
      MistriContainer.innerHTML = MistriClutter;
    }
  } catch (error) {}
}
GetMistris();
