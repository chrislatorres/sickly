import React from 'react'
import JavascriptTimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ReactTimeAgo from 'react-time-ago'
import MoonLoader from 'react-spinners/MoonLoader'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { Box } from 'grey-vest'
import { exampleTypes } from 'contexture-client'
import ContextureMobx from 'contexture-react/dist/utils/contexture-mobx'
import service from './service'
import s from '../../assets/css/page.css'

JavascriptTimeAgo.locale(en)

let state = observable({
  id: 'null',
  tree: {},
  numOfCases: 0,
  viewport: {} 
})

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
        { key: 'city', type: 'text', field: 'city', },
        { key: 'currency', type: 'text', field: 'currency', },
        { key: 'type', type: 'text', field: 'type', },
        { key: 'fiat_currency', type: 'text', field: 'fiat_currency', },
        { key: 'fiat_value', type: 'text', field: 'fiat_value', },
      ], 
    },
    { key: 'id', type: 'text', field: 'id', data: { operator: 'is', value: state.id } },
    { key: 'results', type: 'results' },
  ],
})

const Cards = observer((props) => props.data.reverse().map((card, i) => 
  card.location && card.date ? 
  <div key={i} className={s.cases}>
    <Box className={s.card}> 
      Feeling sickly in 
      <b> {card.location.city}, {card.location.region}, {card.location.country}</b>.<br/>
      <small className={s.date}><ReactTimeAgo date={card.date}/></small>
    </Box>
  </div>
  : null
))

let Cases = observer((props) => { 
  state.viewport = props.viewport 

  return ( props.data ? 
             <div className={s.container}><Cards data={props.data} /></div> 
           :   
             <div className={s.container}>
               <div className={s.loader}>
                 <MoonLoader size={50}/>
               </div> 
             </div> 
         )
})

export default Cases
