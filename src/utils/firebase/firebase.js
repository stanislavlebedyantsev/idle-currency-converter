import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
};


firebase.initializeApp(firebaseConfig);

export const database = firebase.database();
const provider = new firebase.auth.GoogleAuthProvider();
export default firebase;

export const pushFirebaseDatabase = (rates) => {
  firebase.database().ref('/rates').push(rates);
};
export const getLastFirebaseDatabase = () => {
  return firebase
    .database()
    .ref('/rates')
    .limitToLast(1)
    .once('value')
    .then((snapshot) => Object.values(snapshot.val()))
    .catch((e) => false);
};
export const getValuesFirebaseDatabase = () => {
  return firebase
    .database()
    .ref('/rates')
    .once('value')
    .then((snapshot) => Object.values(snapshot.val()));
};

export const signInByGoogleAuthFirebase = () => {
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then(({ user }) => user);
};


export const createUserWithEmailAndPassword = (email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((resp) => resp);
};

export const signInByEmailAuthFirebase = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(({ user }) => user);
};

export const signOutFirebase = () => {
  return firebase.auth().signOut();
};
