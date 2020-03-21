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
  location: '',
  geo: false,
  locating: false,
  loading: false,
  sent: false,
})

const submit = async (snapshot) => {
  state.loading = true

  const app = feathers();
  const restClient = feathers.rest('https://api.sickly.app')
  app.configure(restClient.fetch(window.fetch));
  const notify = app.service('notify'); 
  
  notify.create(snapshot)
  .then(() => {
    state.loading = false
    state.sent = true
  })
}

if (!navigator.geolocation) {
  state.geo = false
} else {
  state.locating = true

  navigator.geolocation.getCurrentPosition(position => {
    state.geo = true
    state.locating = false
    state.location = [position.coords.latitude, position.coords.longitude]
  }) 
}

let form = observable(Form({
  fields: {
    location: { props: { label: state.geo ? null : 'Your Location', hidden: state.geo, required: !state.geo }, value: state.location },
    email: { props: { label: 'Email' }, value: '' },
    phone: { props: { label: 'Phone Number', type: 'number' }, value: '' },
  },
  submit
}))

const StatusBanner = observer(() => state.sent ? (
  <Banner className={s.banner}>
    You have successfuly submitted, Sickly will now be sending you notifications.
  </Banner>
) : null )


const Notify = observer(() => 
  <>
    <StatusBanner /> 
    <Box className={s.box}> 
      <div className={s.container}>
          <h1>Be Notified</h1>
          <p>
           Sickly keeps you updated on new COVID-19 developments in your community.<br/>
          </p>
          <div className={s.form}>
             <FormContent columns={1}>
               {_.map(form.fields, (field) =>
                 <Input
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
      </div>
    </Box>
  </>
)

export default () => <Notify />
