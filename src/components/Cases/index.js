import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { Box } from 'grey-vest'
import { exampleTypes } from 'contexture-client'
import ContextureMobx from 'contexture-react/dist/utils/contexture-mobx'
import service from './service'
import s from '../../assets/css/page.css'

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




let Cases = observer((props) => { 
  state.viewport = props.viewport 
  
  let coordinates = state.viewport.center[0] + ', ' + state.viewport.center[1]
  return(
    <div className={s.cases}>
      <Box className={s.card}> 
        <h1>COVID-19</h1>
        <small>Number of Cases: </small><b>{state.numOfCases}</b><br />
        <small>Location of Cases: </small><b>{coordinates}</b>
        <p>There are currently {state.numOfCases} cases in {coordinates}.</p>
      </Box>
    </div>
)
})

export default Cases
