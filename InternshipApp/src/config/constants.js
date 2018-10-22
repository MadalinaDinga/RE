import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyA38IPlH7_BhYAyTWiYT3BkSNbKJAUUGrA",
    authDomain: "turismcluj-59f95.firebaseapp.com",
    databaseURL: "https://turismcluj-59f95.firebaseio.com",
    projectId: "turismcluj-59f95",
    storageBucket: "turismcluj-59f95.appspot.com",
    messagingSenderId: "998365910018"
};

firebase.initializeApp(config)
export default firebase
export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth
