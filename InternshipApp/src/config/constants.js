import firebase from 'firebase'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyC-SxHzBo610BA8XuqwZaC5ZhCcsjFdu04",
    authDomain: "internship-e3e7c.firebaseapp.com",
    databaseURL: "https://internship-e3e7c.firebaseio.com",
    projectId: "internship-e3e7c",
    storageBucket: "internship-e3e7c.appspot.com",
    messagingSenderId: "521300114531"
};
firebase.initializeApp(config);
export default firebase
export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;
