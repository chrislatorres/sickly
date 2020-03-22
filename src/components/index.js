import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
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

ReactGA.initialize('UA-161402140-1', { standardImplementation: true })

let state = observable({
  viewport: {}
})

const updateViewport = (viewport) => {
  state.viewport = viewport
}

const App = observer(() => 
  <ThemeProvider theme={ greyVest }>
    <BrowserRouter>
      <div className={s.main}>
        <Navbar />
        <div className={s.container}>
          <div className={s.row}>
            <Switch>
              <Route path='/updates' component={() => <Updates viewport={state.viewport} />} />
              <Route path='/cases' component={() => <Cases viewport={state.viewport} />} />
              <Route path='/about' component={About} />
              
              <Route path='/' component={() => <Map updateViewport={updateViewport} />} />
              <Route render={() => <h3>No Match</h3>} />
            </Switch>
         </div>
       </div>
      </div>
    </BrowserRouter>
  </ThemeProvider>
)

export default App
