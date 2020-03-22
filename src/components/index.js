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

history.listen((location, action) => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

let state = observable({
  viewport: {}
})

const updateViewport = (viewport) => {
  state.viewport = viewport
}

const App = observer(() => 
<Router history={history}>
  <ThemeProvider theme={ greyVest }>
      <div className={s.main}>
        <Navbar />
        <div className={s.container}>
          <div className={s.row}>
            <Route path='/updates' component={() => <Updates viewport={state.viewport} />} />
            <Route path='/cases' component={() => <Cases viewport={state.viewport} />} />
            <Route path='/about' component={() => <About />} />
            <Route exact path='/' component={() => <Map updateViewport={updateViewport} />} />
         </div>
       </div>
      </div>
  </ThemeProvider>
</Router>
)

export default App
