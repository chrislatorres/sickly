import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { Box } from 'grey-vest'
import { exampleTypes } from 'contexture-client'
import ContextureMobx from 'contexture-react/dist/utils/contexture-mobx'
import service from './service'
import s from '../../assets/css/page.css'
import data from './data.js'

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


const Cards = () => data.map(card => 
      <div className={s.cases}>
        <Box className={s.card}> 
          <h1>{card.title}</h1>
          <p><a href={card.url}>{card.url}</a></p>
          <img src={card.images[0]} />
          <p>There are currently {state.numOfCases} cases in {state.viewport.center}.</p>
        </Box>
      </div>
    )


let Updates = observer((props) => { 
  state.viewport = props.viewport 
  
  return(
    <Cards />
  )
})

export default Updates 
