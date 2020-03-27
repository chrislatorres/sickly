import React from 'react'
import createHistory from 'history/createBrowserHistory'
import feathers from '@feathersjs/client'
import { Route, Router } from 'react-router-dom'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import ReactGA from 'react-ga'
import Navbar from './Navbar'
import Map from './Map'
import About from './About'
import s from '../assets/css/app.css'

const history = createHistory()

history.listen((location) => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

let state = observable({
  location: {},
  set: false
})

const getMyLocation = () => {
  if (!state.set) {
    const app = feathers();
    const restClient = feathers.rest('https://api.sickly.app')
    app.configure(restClient.fetch(window.fetch));
  
    app.service('locate').create({}).then(my => {
      state.location = my.location
      state.set = true
    })
  }
}
getMyLocation()

const App = observer(() => 
  <Router history={history}>
    <div className={s.container}>
      <Navbar location={state.location} />
      <Route path='/about' component={() => <About />} />
      <Route exact path='/' component={() => <Map location={state.location} />} />
   </div>
  </Router>
)

export default App
