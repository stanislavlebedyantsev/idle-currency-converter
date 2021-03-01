import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL
}

firebase.initializeApp(firebaseConfig)

const database = firebase.database()


const initDatabase = (rates) => {
  database.ref('/rates').set([rates])
}

// //insert data
// const writeRatesToDatabase = (rates) => {
//   database.ref('/rates').set(rates)
// }

// //update data. Updates only changed data
// const updateRatesToDatabase = (rates) => {
//   database.ref('/rates').update(rates)
// }
// //read data
// const readRatesToDatabase = (rates) => {
//   database.ref('/rates').on('value', snap => console.log(snap.val()))
// }
// //delete data
// const deleteRatesToDatabase = (rates) => {
//   database.ref('/rates').remove()
// }