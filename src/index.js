import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'
import App from './components'

ReactGA.initialize('UA-161402140-1')

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)
