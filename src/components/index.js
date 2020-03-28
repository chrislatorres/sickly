import React from 'react'
import createHistory from 'history/createBrowserHistory'
import feathers from '@feathersjs/client'
import { Route, Router } from 'react-router-dom'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import ReactGA from 'react-ga'
import Navbar from './Navbar'
import Chart from './Chart'
import About from './About'
import Map from './Map'
import s from '../assets/css/app.css'

const history = createHistory()

history.listen((location) => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

let state = observable({
  data: null,
  maxNumCases: null,
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
      <Navbar location={state.location} />
      <Route path='/chart' component={() => <Chart data={state.data} />} />
      <Route path='/about' component={() => <About />} />
      <Route exact path='/' component={() => <Map data={state.data} maxNumCases={state.maxNumCases} location={state.location} />} />
   </div>
  </Router>
)

export default App
