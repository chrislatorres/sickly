import React from 'react'
import _ from 'lodash'
import F from 'futil'
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
import MultiSlider, { Progress, Dot } from 'react-multi-bar-slider'
import s from '../../assets/css/page.css'
import { Input } from './input.js'

let state = observable({
  location: 0,
  checked: [false, false, false],
  slide: { progress: 10 },
  viewport: {},
  loading: false,
  sent: false,
})

const submit = async (snapshot) => {
  state.loading = true

  const app = feathers();
  const restClient = feathers.rest('https://api.sickly.app')
  app.configure(restClient.fetch(window.fetch));
  const submit = app.service('cases'); 
  
  snapshot.intensity = state.slide.progress
  snapshot.location = state.location
  console.log(snapshot)

  submit.create(snapshot)
  .then(() => {
    state.loading = false
    state.sent = true
  })
}

const form = Form({
  fields: {
    daysSick: { 
      props: { label: 'Number Of Days Sick', type: 'number', required: true }, 
      value: '' 
    },
    symptoms: { 
      props: { label: 'Symptoms', options: F.autoLabelOptions(['Fever', 'Cough', 'Shortness of Breath']), columnCount: 3, type: 'checkboxList', required: true }, 
      value: state.checked 
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
 
  let handleSlide = newProgress => { state.slide = { progress: newProgress } }

  return(
    <div className={s.sickPopup}>
      <StatusBanner /> 
      <Box className={s.box}> 
        <p>
          <b>Location:</b><br/>
            {state.location.city ? `${state.location.city}, ` : null}
            {state.location.region ? `${state.location.region}, ` : null}
            {state.location.country ? `${state.location.country}` : null}
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
          <p><b>Intensity of Symptoms:</b></p>
          <MultiSlider onSlide={handleSlide}>
            <Progress 
              color={state.slide.progress > 70 ? 'red' : state.slide.progress > 40 ? 'yellow' : '#0076de' } 
              roundedCorners 
              progress={state.slide.progress}
           >
              <Dot 
                color={'#454545'}
                width={50}
                height={50}
                iconStyle={ { top: -15 } }
                icon={'https://user-images.githubusercontent.com/29695350/77191664-4a7dd800-6aa9-11ea-9368-9dad0ab6b494.png'}
              />
            </Progress>
          </MultiSlider>
          <br/>
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
