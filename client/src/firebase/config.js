import firebase from "firebase";
import "firebase/auth";


const app = firebase.initializeApp( {
    apiKey: "AIzaSyBjzQmq6ocZbX3eFURX40SX_2Gh_kpe9NY",
    authDomain: "photogallery-6230a.firebaseapp.com",
    projectId: "photogallery-6230a",
    storageBucket: "photogallery-6230a.appspot.com",
    messagingSenderId: "107376060810",
    appId: "1:107376060810:web:76d23c573d8e0882da4073"
});

export default app  