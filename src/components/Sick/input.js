import React from 'react'
import {observer} from 'mobx-react'
import F from 'futil'
import { FormField } from 'grey-vest'

export let Input = observer(({ field }) =>
  <FormField {...{
    ...F.domLens.value('value', field),
    ...F.domLens.focus('focusing', field),
    ...field.props,
    ...!field.isValid && {style: { borderColor: 'red' }},
  }} 
  />
)
