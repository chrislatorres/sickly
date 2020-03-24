import React from 'react'
import createHistory from 'history/createBrowserHistory'
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
})

const updateLocation = (location) => { state.location = location }

const App = observer(() => 
<Router history={history}>
  <ThemeProvider theme={ greyVest }>
      <div className={s.main}>
        <Navbar location={state.location} />
        <div className={s.container}>
          <div className={s.row}>
            <Route path='/updates' component={() => <Updates location={state.location} />} />
            <Route path='/cases' component={() => <Cases location={state.location} />} />
            <Route path='/about' component={() => <About />} />
            <Route exact path='/' component={() => <Map updateLocation={updateLocation} />} />
         </div>
       </div>
      </div>
  </ThemeProvider>
</Router>
)

export default App
