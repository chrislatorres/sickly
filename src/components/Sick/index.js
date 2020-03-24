import React from 'react'
import _ from 'lodash'
import Form from 'mobx-autoform'
import feathers from "@feathersjs/client"
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { 
  FormContent,
  FormFooter,
  Button,
  Box,
  Banner
} from 'grey-vest'
import MoonLoader from "react-spinners/MoonLoader"
import s from '../../assets/css/page.css'
import { Input } from './input.js'

let state = observable({
  location: 0,
  viewport: {},
  loading: false,
  sent: false,
  numSent: 0,
})

const submit = async (snapshot) => {
  state.loading = true

  const app = feathers();
  const restClient = feathers.rest('https://api.sickly.app')
  app.configure(restClient.fetch(window.fetch));
  const submit = app.service('cases'); 
  
  submit.create(snapshot)
  .then(() => {
    state.loading = false
    state.sent = true
    state.numSent++
  })
}

const form = Form({
  fields: {
    confirmed: { 
      props: { label: 'Days Of Feeling Sick', type: 'number', required: true }, 
      value: '' 
    },
  },
  submit
})

const StatusBanner = observer(() => state.sent ? (
  <Banner className={s.banner}>
    You have successfuly self-reported.
  </Banner>
) : null )

const Sick = observer((props) => {
  state.viewport = props.viewport
  state.location = props.location

  return(
    <div className={s.sickPopup}>
      <StatusBanner /> 
      <Box className={s.box}> 
        <h1>I{"'"}m Sick 😷</h1>
        <p>
          <b>Location:</b><br/>
            {state.location.city ? `${state.location.city}, ` : null}
            {state.location.region ? `${state.location.region}, ` : null}
            {state.location.country ? `${state.location.country}.` : null}
        <br/>
        </p>
        <div className={s.form}>
          <FormContent columns={1}>
            {_.map(form.fields, (field, i) =>
              <Input
                key={i}
                field={field}
              />
            )}
            </FormContent>
            <FormFooter>
            <Button primary onClick={form.submit}>Submit</Button>
            <MoonLoader
              size={20}
              color={"#0076de"}
              loading={state.loading}
            />  
          </FormFooter>
        </div>
      </Box>
    </div>
  )
})

export default Sick
