import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import { ThemeProvider, greyVest } from 'contexture-react'

import Navbar from './Navbar'
//import Home from './Home'
import Map from './Map'
import Search from './Search'
import Notify from './Notify'
import Submit from './Submit'
import Data from './Data'
import About from './About'

import s from '../assets/css/app.css'

const App = () => 
  <ThemeProvider theme={ greyVest }>
    <BrowserRouter>
      <div className={s.main}>
        <Navbar />
        <div className={s.container}>
          <div className={s.row}>
            <Switch>
              <Route path='/search' component={Search} />
              <Route path='/notify' component={Notify} />
              <Route path='/submit' component={Submit} />
              <Route path='/data' component={Data} />
              <Route path='/about' component={About} />
              
              <Route path='/' component={Map} />
              <Route render={() => <h3>No Match</h3>} />
            </Switch>
         </div>
       </div>
      </div>
    </BrowserRouter>
  </ThemeProvider>

export default App
