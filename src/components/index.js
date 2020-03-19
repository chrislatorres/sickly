import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import { ThemeProvider, greyVest } from 'contexture-react'

import Home from './Home'
import Navbar from './Navbar'

import s from './index.css'

const App = () => {
  let state = {
    loading: false,
  }
  return state.loading === true ? <h1>Loading</h1> : (
    <ThemeProvider theme={ greyVest }>
      <BrowserRouter>
	<div className={s.main}>
          <Navbar />
          <div className={s.container}>
            <div className={s.row}>
              <Switch>
                <Route path='/' component={Home} />
                <Route render={() => <h3>No Match</h3>} />
              </Switch>
           </div>
         </div>
       </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
export default App
