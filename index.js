import { getAuth, onAuthStateChanged , signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, getDocs, collection, enableIndexedDbPersistence, initializeFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

/* Importing Elements */  

const firebaseConfig = {
    apiKey: "AIzaSyBVSfn2Y7kXmPEhmMzrLlcTvUFoI9vHcMk",
    authDomain: "mistri-96063.firebaseapp.com",
    projectId: "mistri-96063",
    storageBucket: "mistri-96063.appspot.com",
    messagingSenderId: "399556928166",
    appId: "1:399556928166:web:97d1b52622aa5d90438a67"
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
            var LogOutBtn = document.querySelector("#LogOut");
            LogOutBtn.style.display = "initial";
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
            } catch (error) {
                
            }
        } else {
            var LogOutBtn = document.querySelector("#LogOut");
            LogOutBtn.style.display = "none";
            document.querySelector("#username").textContent = "Guest";
        }
    });
}
GetLoggedInUser();


var MistriClutter = ""
async function GetMistris() {
try{
const querySnapshots = await getDocs(collection(db, "Mistri"));
querySnapshots.forEach(doc => {
const Email = doc.data().Email;
const FirstName = doc.data().FirstName;
const SecondName = doc.data().SecondName;
const Age = doc.data().Age;
const PhoneNumber = doc.data().PhoneNumber;
const Cateogory = doc.data().MistriCateogory 
const Address = doc.data().Address;
const MistriFirstName = doc.data().FirstName
const MistriSecondName = doc.data().SecondName
const ProfilePicture = doc.data().ProfilePic
const Pending = doc.data().Pending
const UserId = doc.data().id







var MistriContainer = document.querySelector(".MistriContainer")
var books = document.querySelectorAll("#book")

var Status
var Background

if (Pending.length === 0) {
Status = "Available"
Background = "#59d28c"

}else{
Status = `Working <i class="fa-light fa-hammer"></i>`
Background ="red"
}

MistriClutter += 
`<div class="MistriCont">
<div class="MistriNav"> 
 <h3 id="MistriStatus" style="background-color:${Background};">${Status}</h3>
 <p>${Email}</p>
</div> 

<div class="ImageContainer skeleton" >
 <img src=${ProfilePicture} alt="" id="DisplayProfile">
</div>

<div class="MistriDetails ">
 <h3>${FirstName} ${SecondName}</h3>
 <p>${Cateogory}</p>
  <p>${Address}</p>
 <p id="certified">Certified<i class="fa-thin fa-circle-check"></i></p>

 </div>
 
<div class="BookMistri">
 
 <button id="book" >Book</button> 
 <button id="view" class=${UserId}>View Profile</button> 
 
 
 
 
 
</div> 
</div>
 `
 MistriContainer.innerHTML = MistriClutter; 
});


async function ViewProfile() {
var viewBtns = document.querySelectorAll("#view") 
viewBtns.forEach(viewBtn => {
 viewBtn.addEventListener("click", function(){
 var ClickedId = viewBtn.className
onAuthStateChanged(auth, async (user) => { 
 if (ClickedId === user.uid) {
  window.location.href=`profile.html?u=${ClickedId}`
 }else {
 window.location.href=`user.html?u=${ClickedId}`
 }
})
 })
})
}
ViewProfile() 


  
} catch(error) {
 
}

}
GetMistris()




function SkeletonLoading() {
  window.addEventListener("load", function() {
    var ImageContainers = document.querySelectorAll(".ImageContainer img");
    ImageContainers.forEach(img => {
      img.addEventListener("load", function() {
      console.log("loaded")
        img.parentElement.classList.remove("skeleton");
        img.parentElement.classList.add("loaded");
      });
    });
  });
}
SkeletonLoading()


function CategorySwiper() {
var swiper = new Swiper(".mySwiper", {
      slidesPerView: 3.6,
      spaceBetween: 20,
      
    }); 
}
CategorySwiper()



async function LogOut() {
    var LogOutBtn = document.querySelector("#LogOut");
    LogOutBtn.addEventListener("click", function() {
        signOut(auth).then(() => {
            // Sign-out successful
        }).catch((error) => {
            console.error("Error signing out: ", error);
        });
    });
}
LogOut();

