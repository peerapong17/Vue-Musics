import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCdqBhYOvOt83dTkTHokoRdrIIMecHlhNY",
  authDomain: "muso-ninja-c6443.firebaseapp.com",
  projectId: "muso-ninja-c6443",
  storageBucket: "muso-ninja-c6443.appspot.com",
  messagingSenderId: "835675572789",
  appId: "1:835675572789:web:5470e0939a6850ae06bf7c",
  measurementId: "G-WSYTS6902C"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()
const arrayField = firebase.firestore.FieldValue;

// timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectFirestore, projectAuth, projectStorage, timestamp, arrayField }

