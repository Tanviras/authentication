import './App.css';
import firebase from "firebase/app";
import React, { useState } from 'react';
import "firebase/analytics";
import "firebase/auth";
import firebaseConfig from './firebaseConfig';

firebase.initializeApp(firebaseConfig);

function App() {
const [user,setUser]=useState({displayName:'',email:'',photoURL:'',isSignedIn:'false'});


  const provider = new firebase.auth.GoogleAuthProvider();//copied



//sign-in-button
  const handleSignIn=()=>{
  firebase.auth().signInWithPopup(provider)//copied

    .then((result) => {
    const {displayName,email,photoURL}=result.user;

    const signedInUser={//destructure
      isSignedIn: true,
      displayName: displayName,
      email: email,
      photoURL: photoURL
    }

   setUser(signedInUser);
  //  console.log(signedInUser);//tahole amar sign-in kora email,name,email-dp dekhabe

   }).catch((error) => {
    var errorMessage = error.message;
    console.log(errorMessage);
    });
    }
//sign-in-button-end


//sign-out button
const handleSignOut=()=>{
  firebase.auth().signOut()//signOut() is a method,not made by me
  .then(result=>{
                const signedOutUser={//destructure
                  isSignedIn: false,
                  displayName: '',
                  email: '',
                  photoURL: ''
                }
  setUser(signedOutUser);

  }).catch((error)=> {
    var errorMessage = error.message;
    console.log(errorMessage);
    });
  
}
//sign-out-button-end


  return (
    <div className="App">

      {/* if-else-in-one-line */}
      {/* toggling between sign-in and sign-out */}
      {
      user.isSignedIn? <button onClick={handleSignOut}>Sign out</button>:
                        <button onClick={handleSignIn}>Sign in</button>
      }
     
     {/* if signed-in ,then show these */}
      {
        user.isSignedIn && <div> 
                                <p>Welcome {user.displayName}</p>
                                <p>E-mail:{user.email}</p>
                                <img src={user.photoURL} alt=""></img>
                                </div>
      }


    </div>
  );
}

export default App;
