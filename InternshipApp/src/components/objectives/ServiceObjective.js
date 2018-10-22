import React, {Component} from 'react';
import firebase from '../../config/constants';

var ServiceObjective = React.createClass( {    
    getFirebaseRef: function(i) {
        return {
            result: firebase.database().ref(i)
        }
    },
   
    getFirebaseChild: function(i,c) {
        return {
            result: firebase.database().ref(i).child(c)
        }
    },


    removeFirebaseChild: function(i,c) {
         firebase.database().ref(i).child(c).remove();
    },


    
    render: function() {}
});
