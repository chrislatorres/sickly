import React from 'react'
import feathers from '@feathersjs/client'
import { toJS, observable } from 'mobx'
import { observer } from 'mobx-react'
import { 
  Banner
} from 'grey-vest'
import { Map, TileLayer } from 'react-leaflet'
import s from '../../assets/css/page.css'

let state = observable({
  loading: false,
  sent: false,
  numSent: 0,
  geo: null,
  viewport: { 
    center: [32.9483, -96.7299], 
    zoom: 17 
  },
  locating: false,
})

const getLocation = async () => {
  if (!navigator.geolocation) {
    state.geo = false
    const app = feathers();
    const restClient = feathers.rest('http://ip-api.com')
    app.configure(restClient.fetch(window.fetch));
    const ip = app.service('json').find()

    state.viewport.center = [ip.lat, ip.lon]
  } else {
    state.locating = true
    navigator.geolocation.getCurrentPosition(position => {
      state.geo = true
      state.viewport.center = [position.coords.latitude, position.coords.longitude]
      state.locating = false
    }, async () => {
      const app = feathers();
      const restClient = feathers.rest('http://ip-api.com')
      app.configure(restClient.fetch(window.fetch));
      const ip = await app.service('json').find()

      state.viewport.center = [ip.lat, ip.lon]

      state.geo = true
      state.locating = false
    })
  }
}
getLocation()


const StatusBanner = observer(() => state.sent ? (
  <Banner className={s.banner}>
    You have successfuly submitted {state.numSent} cases.
  </Banner>
) : null )

const updateViewport = (viewport) => {
  state.updateParentViewport(viewport)
  state.viewport = viewport
}

const MapPage = observer((props) => {
  props.updateViewport(state.viewport)
  state.updateParentViewport = props.updateViewport

  return (
  <>
    <StatusBanner /> 
        <Map onViewportChanged={ updateViewport } viewport={toJS(state.viewport)} zoomControl={false} className={s.leafletContainer}>
          <TileLayer
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
            attribution='https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          />
        </Map>
  </>
  )
})

export default MapPage 
