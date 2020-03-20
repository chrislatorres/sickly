import React from 'react'
import F from 'futil'
import _ from 'lodash'
import Form from 'mobx-autoform'
import { observable, reaction } from 'mobx'
import { observer } from 'mobx-react'
import { 
  FormHeader,
  FormContent,
  FormFooter,
  FormField,
  DateTimeInput,
  NestedPicker
  TextInput,
  Button,
  Grid, 
  GridItem, 
  Box 
} from 'grey-vest'
import RingLoader from "react-spinners/RingLoader"
import s from '../../assets/css/page.css'
import about from '../../assets/images/about.jpg'
import { Input } from './input.js'

let state = observable({
  loading: false,
  sent: false,
})

let form = observable(Form({
  fields: {
    email: { props: { label: 'Email', required: false }, value: '' },
    date: { props: { label: 'Date', type: 'date', required: true, placeholder: '01/15/2020'}, value: '' },
    source: { props: { label: 'Source', required: true }, value: '' },
    location: { props: { label: 'Location', required: true }, value: '' },
    confirmed: { props: { label: 'Confirmed', type: 'number', required: true }, value: '' },
    deceased: { props: { label: 'Deceased', type: 'number', required: true }, value: '' },
    recovered: { props: { label: 'Recovered', type: 'number', required: true }, value: '' },
    comments: { props: { label: 'Comments', type: 'textarea', width: 2, required: false }, value: '' },
  },
  submit: async snapshot => {
    console.log(snapshot)
    state.loading = true
    //await serviceCall(snapshot)
    console.log(snapshot)
  },
}))

const Submit = observer(() => 
  state.loading === true ? 
    <Box className={s.box}> 
      <div className={s.container}>
        <h1>Loading...</h1>  
        <RingLoader
          size={150}
          color={"#0076de"}
          loading={state.loading}
          css={"display: inline-block; margin-right: 50px; margin-bottom: 50px"}
        />
      </div>
    </Box>
    : 
    state.sent ? <h1>Sent!</h1> :

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
             </FormFooter>
           </div>
      </div>
    </Box>
)

export default () => <Submit />
