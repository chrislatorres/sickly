import React from 'react'
import feathers from '@feathersjs/client'
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
      <Grid 
        gap="24px" 
        areas={[
         'left main',
        ]}
        rows="6fr"
        columns="320px minmax(0px, 1fr)"
        className={s.grid}
       >
	<GridItem area="left">
	  <Box className={s.box}>
	      <FilterList
		tree={tree}
		path={['root', 'criteria']}
		mapNodeToProps={componentForType(TypeMap)}
		fields={{
		  balance: { label: 'Balance' },
		  currency: { label: 'Currency' },
		  type: { label: 'Type' },
		  decimals: { label: 'Decimals' },
		  fiat_currency: { label: 'Fiat Currency' },
		  fiat_value: { label: 'Fiat Value' },
		  updated_at: { label: 'Updated At' },
		  resource_type: { label: 'Resource Type' },
		}}
	      />
	  </Box>
	</GridItem>
	<GridItem area="main">
	  <Box className={s.box}> 
	      <div>
		<PagedResultTable path={['root', 'results']} 
		  fields={{
		    balance: { label: 'Balance' },
		    currency: { label: 'Currency' },
		    type: { label: 'Type' },
		    decimals: { label: 'Decimals' },
		    fiat_currency: { label: 'Fiat Currency' },
		    fiat_value: { label: 'Fiat Value' },
		    updated_at: { label: 'Updated At' },
		    resource_type: { label: 'Resource Type' },
		  }} tree={tree}/>
	      </div>
	  </Box>
	</GridItem>
      </Grid>
    </div>
  )
})

export default () => <Search />
