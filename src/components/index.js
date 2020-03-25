import React from 'react'
import createHistory from 'history/createBrowserHistory'
import { Route, Router } from 'react-router-dom'
import { ThemeProvider, greyVest } from 'contexture-react'
import { toJS, observable } from 'mobx'
import { observer } from 'mobx-react'
import ReactGA from 'react-ga'
import feathers from '@feathersjs/client'
import io from 'socket.io-client'
import socketio from '@feathersjs/socketio-client'
import Navbar from './Navbar'
import Map from './Map'
import Updates from './Updates'
import Cases from './Cases'
import About from './About'

import s from '../assets/css/app.css'

const history = createHistory()

history.listen((location) => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

let state = observable({
  data: null,
  location: {},
})

const addData = (updates) => { 
  console.log(updates)
  state.data ? state.data = [...state.data, updates] : state.data = [updates]
}

const getInitData = async () => {
  const app = feathers();
  const restClient = feathers.rest('https://api.sickly.app')
  app.configure(restClient.fetch(window.fetch));
  const cases = app.service('cases');

  //state.data = await cases.find()
}
getInitData()

const getData = async () => {
  const app = feathers()

  const socket = io('https://api.sickly.app')
  app.configure(feathers.socketio(socket))
  app.service('cases').on('created', addData);
}
getData()

const updateLocation = (location) => { state.location = location }

const App = observer(() => 
<Router history={history}>
  <ThemeProvider theme={ greyVest }>
      <div className={s.main}>
        <Navbar location={state.location} />
        <div className={s.container}>
          <div className={s.row}>
            <Route path='/updates' component={() => <Updates location={state.location} />} />
            <Route path='/cases' component={observer(() => <Cases data={toJS(state.data)} location={state.location} />)} />
            <Route path='/about' component={() => <About />} />
            <Route exact path='/' component={() => <Map updateLocation={updateLocation} />} />
         </div>
       </div>
      </div>
  </ThemeProvider>
</Router>
)

export default App
