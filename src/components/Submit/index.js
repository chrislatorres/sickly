import React from 'react'
import { Link } from 'react-router-dom'
import F from 'futil'
import _ from 'lodash'
import Form from 'mobx-autoform'
import feathers from "@feathersjs/client"
import { observable, reaction } from 'mobx'
import { observer } from 'mobx-react'
import { 
  FormHeader,
  FormContent,
  FormFooter,
  FormField,
  DateTimeInput,
  TextInput,
  Button,
  Grid, 
  GridItem, 
  Box,
  Banner
} from 'grey-vest'
import MoonLoader from "react-spinners/MoonLoader"
import s from '../../assets/css/page.css'
import { Input } from './input.js'

let state = observable({
  loading: false,
  sent: false,
  numSent: 0,
})

let form = observable(Form({
  fields: {
    email: { props: { label: 'Email', required: false }, value: '' },
    date: { props: { label: 'Date (Month-Day)', type: 'number', required: true, placeholder: '03-15'}, value: '' },
    source: { props: { label: 'Source', required: true }, value: '' },
    location: { props: { label: 'Location', required: true }, value: '' },
    confirmed: { props: { label: 'Confirmed', type: 'number', required: true }, value: '' },
    deceased: { props: { label: 'Deceased', type: 'number', required: true }, value: '' },
    recovered: { props: { label: 'Recovered', type: 'number', required: true }, value: '' },
    comments: { props: { label: 'Comments', type: 'textarea', width: 2, required: false }, value: '' },
  },
  submit: async snapshot => {
    state.loading = true

    const app = feathers();
    const restClient = feathers.rest('https://api.asickly.com')
    app.configure(restClient.fetch(window.fetch));
    const submit = app.service('submit'); 
    
    submit.create(snapshot)
    .then(res => {
      state.loading = false
      state.sent = true
      state.numSent++
    })
  },
}))

const StatusBanner = observer(() => state.sent ? (
  <Banner className={s.banner}>
    You have successfuly submitted {state.numSent} cases.
  </Banner>
) : null )


const Submit = observer(() => 
  <>
    <StatusBanner /> 
    <Box className={s.box}> 
      <div className={s.container}>
          <h1>Submit A New Case</h1>
          <p>
            You can submit a new COVID-19 case to Sickly here.<br/>
    	   <b>NOTE:</b> Please only report cases found from reputable, verifiable sources.<br/>
          </p>
          <div className={s.form}>
             <FormContent columns={2}>
               {_.map(form.fields, (field, values) =>
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

export default () => <Submit />
