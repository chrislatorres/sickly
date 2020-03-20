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
import { Icon } from 'leaflet'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import s from '../../assets/css/page.css'
import { Input } from './input.js'

let state = observable({
  loading: false,
  sent: false,
  numSent: 0,
  lat: 51.505,
  lng: -0.09,
  zoom: 13,
})

const submit = async (snapshot) => {
  state.loading = true

  const app = feathers();
  const restClient = feathers.rest('https://api.asickly.com')
  app.configure(restClient.fetch(window.fetch));
  const submit = app.service('submit'); 
  
  submit.create(snapshot)
  .then(() => {
    state.loading = false
    state.sent = true
    state.numSent++
  })
}

let form = observable(Form({
  fields: {
    date: { props: { label: 'Date (Month-Day)', type: 'number', required: true, placeholder: '03-15'}, value: '' },
    source: { props: { label: 'URL To Verifiable Source', required: true }, value: '' },
    location: { props: { label: 'Location of Case(s)', required: true }, value: '' },
    confirmed: { props: { label: 'Number of Confirmed Cases', type: 'number', required: true }, value: '' },
  },
  submit
}))

const StatusBanner = observer(() => state.sent ? (
  <Banner className={s.banner}>
    You have successfuly submitted {state.numSent} cases.
  </Banner>
) : null )

const position = [state.lat, state.lng]

const Submit = observer(() => 
  <>
    <StatusBanner /> 
        <Map center={[45.4, -75.7]} zoom={12} className={s.leafletContainer}>
          <TileLayer
            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        </Map>
  </>
)

export default () => <Submit />
