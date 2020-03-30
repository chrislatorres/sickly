import React from 'react'
import createHistory from 'history/createBrowserHistory'
import feathers from '@feathersjs/client'
import BounceLoader from "react-spinners/BounceLoader"
import { Route, Router } from 'react-router-dom'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import Navbar from './Navbar'
import Chart from './Chart'
import About from './About'
import Map from './Map'
import s from '../assets/css/app.css'

const history = createHistory()

let state = observable({
  data: null,
  maxNumCases: null,
})

const getData = async () => { 
  let app = feathers(); 
  let restClient = feathers.rest('https://coronadatascraper.com/') 
  app.configure(restClient.fetch(window.fetch)); 
  let data = await app.service('data.json').find() 
  
  state.data = data
  const numCases = data.map(location => location.cases ? location.cases : 0 ) 
  Promise.all([numCases].flat()).then(() => {
    state.maxNumCases = Math.max( ...numCases ) 
  })  
}
getData()

const App = observer(() => 
  <Router history={history}>
    <div className={s.container}>
      <Navbar />
      <Route path='/about' component={() => <About />} />
      {state.data && state.maxNumCases ? (<>
        <Route path='/chart' component={() => <Chart data={state.data} />} />
        <Route exact path='/' component={() => <Map data={state.data} maxNumCases={state.maxNumCases} /> } />
      </>) : ( <div className={s.loader}><BounceLoader color={"#0076de"}/></div> )}
   </div>
  </Router>
)

export default App
