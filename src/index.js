import React, { createContext } from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'
import App from './App'

// Initialize Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyC5BDsoxHs6AM-7DhOzuLlAWoNaBsGOwd8',
  authDomain: 'real-time-chat-62e1f.firebaseapp.com',
  projectId: 'real-time-chat-62e1f',
  storageBucket: 'real-time-chat-62e1f.appspot.com',
  messagingSenderId: '803473473161',
  appId: '1:803473473161:web:065d88ca70c818ca715058',
  measurementId: 'G-0CJBDNJM14'
})

export const Context = createContext(null)

const auth = firebase.auth()
const firestore = firebase.firestore()

ReactDOM.render(
  <Context.Provider
    value={{
      firebase,
      auth,
      firestore
    }}>
    <App />
  </Context.Provider>,
  document.getElementById('root')
)
