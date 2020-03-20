import React from 'react'
import { 
  Form,
  FormContent,
  FormFooter,
  FormField,
  TextInput,
  Button,
  Box 
} from 'grey-vest'
import s from '../../assets/css/page.css'

let Notify = () => 
  <Box className={s.box}> 
    <div className={s.container}>
        <h1>Be Notified Of New Cases</h1>
        <p>
          Sickly sends a text and email when there is a new Coronavirus case near you.<br/>
        </p>
           <FormContent columns={1}>
             <FormField
               label="Name"
               placeholder="Enter name..."
               error="This is an error message that extends to the next line"
               component={TextInput}
             />
             <FormField
               width={1}
               required
               label="Phone Number"
               placeholder="(xxx)-xxx-xxxx"
               tooltip="Sickly will send a text when there are new cases."
             />
             <FormField
               width={1}
               required
               label="Email"
               placeholder="email@example.com"
               tooltip="Sickly will send an email when there are new cases."
             />
             <FormField
               width={1}
               required
               label="Location"
               placeholder="Miami, Florida"
               tooltip="Sickly will notify you of cases near your location."
             />

           </FormContent>
           <FormFooter>
             <Button primary>Submit</Button>
           </FormFooter>
    </div>
  </Box>

export default () => <Notify />
