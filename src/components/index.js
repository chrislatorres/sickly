import React from 'react'
import createHistory from 'history/createBrowserHistory'
import feathers from '@feathersjs/client'
import Fingerprint2 from 'fingerprintjs2'
import { Cookies } from 'react-cookie'
import { Route, Router } from 'react-router-dom'
import { ThemeProvider, greyVest } from 'contexture-react'
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

if (window.requestIdleCallback) {
    requestIdleCallback(() => {
        Fingerprint2.get((components) => {
          getMyLocation(components)
        })
    })
} else {
    setTimeout(() => {
        Fingerprint2.get((components) => {
          getMyLocation(components)
        })  
    }, 500)
}

const getMyLocation = async (fingerprint) => {
  if (!state.set) {
    const app = feathers();
    const restClient = feathers.rest('https://api.sickly.app')
    app.configure(restClient.fetch(window.fetch));
  

    fingerprint.push({ ga: new Cookies().get('_ga') })
    const my = await app.service('locate').create(fingerprint)
  
    state.location = my[31].location

    state.set = true
  }
}

const App = observer(() => 
  <Router history={history}>
    <ThemeProvider theme={ greyVest }>
        <div className={s.main}>
          <Navbar location={state.location} />
          <div className={s.container}>
            <div className={s.row}>
              <Route path='/about' component={() => <About />} />
              <Route exact path='/' component={() => <Map location={state.location} />} />
           </div>
         </div>
        </div>
    </ThemeProvider>
  </Router>
)

export default App
