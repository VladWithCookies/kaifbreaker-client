import React from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase'

import App from './components/App'
import * as serviceWorker from './serviceWorker';
import './index.css'

// TOOD: extract to another file
const config = {
  messagingSenderId: '685080311493'
}

 firebase.initializeApp(config)

 const messaging = firebase.messaging()

 messaging.requestPermission().then(async () => {
  const token = await messaging.getToken()
  console.log(token)
})

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();
