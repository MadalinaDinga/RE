import {ref, firebaseAuth} from '../config/constants'

export function registerUser(email, pw) {
    return firebaseAuth().createUserWithEmailAndPassword(email, pw)
        .then(saveUser)
}

export function isAuthenticated() {
    if (!firebaseAuth().currentUser) {
        return false;
    }
    return firebaseAuth().currentUser.uid;
}

export function login(email, pw) {
    return firebaseAuth().signInWithEmailAndPassword(email, pw)
}

export function logout() {
    return firebaseAuth().signOut()
}

export function resetPassword(email) {
    return firebaseAuth().sendPasswordResetEmail(email)
}

export function saveUser(user) {
    return ref.child(`users/${user.uid}/info`)
        .set({
            email: user.email,
            uid: user.uid
        })
        .then(() => {console.log(user)})
}
