import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import {
  FilterList,
  componentForType,
} from 'contexture-react'
import {
  PagedResultTable,
  TypeMap,
} from 'contexture-react/dist/exampleTypes'
import { Grid, GridItem, Box } from 'grey-vest'
import { exampleTypes } from 'contexture-client'
import ContextureMobx from 'contexture-react/dist/utils/contexture-mobx'
import service from './service'
import s from './index.css'

let state = observable({
  id: 'null',
  tree: {},
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




let Search = observer(() => {
  let { tree } = state

  return(
    <div className={s.search}>
      <Box className={s.box}> 
        <h1>Case Name</h1>
        <small>Number of Cases: </small><b>42</b><br />
        <small>Location of Cases: </small><b>Dallas, Texas</b>
        <p>Case Description</p>
      </Box>
    </div>
  )
})

export default () => <Search />
