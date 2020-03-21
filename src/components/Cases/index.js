import React from 'react'
import feathers from '@feathersjs/client'
import JavascriptTimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ReactTimeAgo from 'react-time-ago'
import ReactPullToRefresh from 'react-pull-to-refresh'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { Box } from 'grey-vest'
import { exampleTypes } from 'contexture-client'
import ContextureMobx from 'contexture-react/dist/utils/contexture-mobx'
import service from './service'
import s from '../../assets/css/page.css'

JavascriptTimeAgo.locale(en)

let state = observable({
  data: {},
  id: 'null',
  tree: {},
  numOfCases: 0,
  viewport: {} 
})

const getData = async () => {
  var app = feathers();
  var restClient = feathers.rest('https://api.sickly.app')
  app.configure(restClient.fetch(window.fetch));
  state.data = await app.service('submit').find()
}
getData()

let types = exampleTypes
          

let Client = ContextureMobx({
  types,
  service,
})

state.tree = Client({
  key: 'root',
  type: 'group',
  join: 'and',
  schema: 'Test',
  children: [
    { key: 'criteria', 
      type: 'group', 
      join: 'and', 
      children: [
        { key: 'balance', type: 'text', field: 'balance', },
        { key: 'currency', type: 'text', field: 'currency', },
        { key: 'type', type: 'text', field: 'type', },
        { key: 'decimals', type: 'number', field: 'decimals', },
        { key: 'fiat_currency', type: 'text', field: 'fiat_currency', },
        { key: 'fiat_value', type: 'text', field: 'fiat_value', },
        { key: 'updated_at', type: 'number', field: 'updated_at', },
        { key: 'resource_type', type: 'text', field: 'resource_type', },
      ], 
    },
    { key: 'id', type: 'text', field: 'id', data: { operator: 'is', value: state.id } },
    { key: 'results', type: 'results' },
  ],
})

const handleRefresh = (resolve, reject) => {
  console.log("refreshing")
  getData().then(() => resolve()).catch(() => reject()) 
  console.log("refreshed")
}

const Cards = observer(() => state.data.map((card, i) => 
  <div key={i} className={s.cases}>
    <Box className={s.card}> 
      Feeling sickly in <b>{card.location}</b>.<br/>
      <small className={s.date}><ReactTimeAgo date={card.date}/></small>
    </Box>
  </div>
))

let Cases = observer((props) => { 
  state.viewport = props.viewport 
  
  return(
    <ReactPullToRefresh
      className={s.refresh}
      onRefresh={handleRefresh}>
      <h3>Pull down to refresh</h3>
      <Cards />
    </ReactPullToRefresh>
  )
})

export default Cases
