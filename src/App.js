import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";


// Add the Firebase products that you want to use
import "firebase/auth";
import firebaseConfig from './firebase.config';

firebase.initializeApp(firebaseConfig);

function App() {

  const [user, setUser] = useState({
    isSignIn: false,
    name: "",
    email: "",
    photo: ""
  })

  var provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () => {
    firebase.auth().signInWithPopup(provider)
      .then(res => {
        const { displayName, photoURL, email } = res.user;
        const singedInUser = {
          isSignIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(singedInUser);
      })
      .catch(err => {
        console.log(err)
        console.log(err.message)
      })
  }

  const handleSignOut = () => {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      const signedOutUser = {
        isSignIn: false,
        name:'',
        photo:'',
        email:''
      }
      setUser(signedOutUser)



    }).catch(function(error) {
      // An error happened.
    });
  }


  return (
    <div className="App">

      {
        user.IsSignedIn ? <button onClick={handleSignOut}>Sign out</button> :
          <button onClick={handleSignIn}>Sign In</button>
      }



      {
        user.isSignIn &&
        <div>
          <p>Welcome here {user.name}</p>
          <p>your email: {user.email}</p>
          <img src={user.photo} alt=""></img>
        </div>
      }
    </div>
  );
}

export default App;
