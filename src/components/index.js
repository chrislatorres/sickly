import React from 'react'
import createHistory from 'history/createBrowserHistory'
import feathers from '@feathersjs/client'
import { Route, Router } from 'react-router-dom'
import { ThemeProvider, greyVest } from 'contexture-react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import ReactGA from 'react-ga'
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
  location: {},
  viewport: {},
  set: false
})

const updateLocation = (location) => { state.location = location }

const getMyLocation = async () => {
  if (!state.set) {
    const app = feathers();
    const restClient = feathers.rest('https://api.sickly.app')
    app.configure(restClient.fetch(window.fetch));
  
    const my = await app.service('locate').create({}).then()
  
    state.viewport.center = [my.location.ll[0], my.location.ll[1]]
    state.location = my.location

    state.set = true
  }
}
getMyLocation()

const App = observer(() => {
  return (
    <Router history={history}>
      <ThemeProvider theme={ greyVest }>
          <div className={s.main}>
            <Navbar location={state.location} />
            <div className={s.container}>
              <div className={s.row}>
                <Route path='/updates' component={() => <Updates location={state.location} />} />
                <Route path='/cases' component={observer(() => <Cases location={state.location} />)} />
                <Route path='/about' component={() => <About />} />
                <Route exact path='/' component={() => <Map viewport={state.viewport} />} />
             </div>
           </div>
          </div>
      </ThemeProvider>
    </Router>
  )
})

export default App
