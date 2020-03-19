import React from 'react'
import F from 'futil'
import Form from 'mobx-autoform'
import {reaction} from 'mobx'
import { 
  Form,
  FormHeader,
  FormContent,
  FormFooter,
  FormField,
  DateTimeInput,
  TextInput,
  Button,
  Grid, 
  GridItem, 
  Box 
} from 'grey-vest'
import s from '../../assets/css/page.css'
import about from '../../assets/images/about.jpg'

const Submit = () => {
  let form = Form({
    fields: {
      email: {},
      password: {
        validator: x => !x && ['Password is required'],
      },
    },
    submit: async snapshot => {
  	// Throwing here will capture errors
      await serviceCall(snapshot)
    },
  })
  let [state, setState] = React.useState({
    email: '',
    date: new Date('2019-12-31T05:00Z'),
    source: '',
    location: '',
    confirmed: '',
    deceased: '',
    recovered: '',
    comments: '',
  })
  console.log("email is = " + email)

  let { email, date, source, location, confirmed, deceased, recovered, comments } = state  
  return (
    <Box className={s.box}> 
      <div className={s.container}>
          <h1>Submit A New Case</h1>
          <p>
    	 Hi I am <b>Christopher</b>, a freelance Software Engineer out of Dallas, Texas.<br/>
    	 I created Sickly to help people face the data on COVID-19 cases.<br/>
    	 Sickly texts your phone when there is a new case near you.<br/>
         Email is = {email}
          </p>
          <Form className={s.form}>
             <FormContent columns={2}>
               <FormField
                 width={1}
                 required
                 value={email} 
                 onChange={e => setState({ ...state, email: e.target.value })} 
                 label="Your Email"
                 placeholder="email@example.com"
               />
               <DateTimeInput 
                 native 
                 onChange={e => setState({ ...state, date: e.target.value })} 
               />
               <FormField
                 width={2}
                 required
                 value={source} 
                 onChange={e => setState({ ...state, source: e.target.value })} 
                 label="Source"
                 tooltip="A reputable, verifiable source to verify the toll."
               />
               <FormField
                 width={1}
                 required
                 value={location} 
                 onChange={e => setState({ ...state, location: e.target.value })} 
                 label="Location"
                 placeholder="Miami, Florida"
                 tooltip="Location of the case(s)."
               />
               <FormField
                 width={1}
                 value={confirmed} 
                 onChange={e => setState({ ...state, confirmed: e.target.value })} 
                 label="Confirmed"
                 type="number"
                 tooltip="Number of confirmed case(s)."
               />
               <FormField
                 width={1}
                 value={deceased} 
                 onChange={e => setState({ ...state, deceased: e.target.value })} 
                 label="Deceased"
                 type="number"
                 tooltip="Number of deceased case(s)."
               />
               <FormField
                 width={1}
                 value={recovered} 
                 onChange={e => setState({ ...state, recovered: e.target.value })} 
                 label="Recovered"
                 type="number"
                 tooltip="Number of recovered case(s)."
               />
               <FormField
                 width={2}
                 value={comments} 
                 onChange={e => setState({ ...state, comments: e.target.value })} 
                 label="Comments"
               />
             </FormContent>
             <FormFooter>
               <Button primary>Submit</Button>
             </FormFooter>
           </Form>
      </div>
    </Box>
  )
}

export default () => <Submit />
