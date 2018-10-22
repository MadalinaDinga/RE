import React, {Component} from 'react';
import firebase from '../../config/constants';

export function getDatabase() {
    return firebase.database().ref("users")
}

export function isAdmin(uid) {
    if(uid === null){
        return false
    }
    var flag
    getDatabase().child(uid + "/info/admin").on('value', function (isAdmin) {
        flag = isAdmin.val();
    });
    return flag;
}

export function addToVisit(uid,oid) {
    var db = getDatabase().child(uid + "/info/tovisit")
    var keyRef = db.push();
    keyRef.set({oid:oid})

}

export function isToVisit(uid,oid){
    if(uid === false){
        return false;
    }
    var db = getDatabase().child(uid + "/info/tovisit")
    var flag = false;
    db.on('value', (snapshot) => {
        snapshot.forEach(function (child) {
            if(child.val().oid === oid){
                flag = true

            }
        })
    });
    return flag;
}
export function removeToVisit(uid,oid) {
    var db = getDatabase().child(uid + "/info/tovisit")
    var key;
    db.on('value', (snapshot) => {
        snapshot.forEach(function (child) {
            if(child.val().oid === oid){
                key = child.key;
                db.child(key).remove().then(()=>{
                    console.log("Remove done")
                })
            }
        })
    });
    //var ref = db.child(uid + "/info/tovisit/"+key);

}

