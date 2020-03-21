import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import { ThemeProvider, greyVest } from 'contexture-react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import Navbar from './Navbar'
import Map from './Map'
import Updates from './Updates'
import Contribute from './Contribute'
import Cases from './Cases'
import About from './About'

import s from '../assets/css/app.css'

let state = observable({
  viewport: { center: [32.9483, -96.7299], zoom: 10 }
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
              <Route path='/contribute' component={Contribute} />
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
