import React from 'react'
import ReactDOM from 'react-dom'
import App from './components'
import ReactGA from 'react-ga'
import * as serviceWorker from './serviceWorker'

ReactGA.initialize('UA-161402140-1')

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)

serviceWorker.register()
