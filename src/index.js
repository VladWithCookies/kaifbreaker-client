import React from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase'

import App from './App'
import * as serviceWorker from './serviceWorker';
import './index.css'

const config = {
  messagingSenderId: '995810719629'
}

 firebase.initializeApp(config)

 const messaging = firebase.messaging()

 messaging.requestPermission().then(async () => {
  const token = await messaging.getToken()
  console.log(token)
})

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();

