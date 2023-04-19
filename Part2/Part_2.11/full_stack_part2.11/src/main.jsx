import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import axios from 'axios'

const promise = axios.get('http://localhost:3001/persons')

console.log(promise)
// Even though this response is executed before the second promise, the console will still
// output both promise objects while the client waits for the server to respond with the
// fufilled or rejected promise.
promise.then(response => {
  console.log(response)
})

const promise2 = axios.get('http://localhost:3001/foobar')
console.log(promise2)

  ReactDOM.createRoot(document.getElementById('root')).render(<App />)
