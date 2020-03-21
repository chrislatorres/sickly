import React from 'react'
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

if (!navigator.geolocation) {
  state.geo = false
} else {
  state.locating = true
  navigator.geolocation.getCurrentPosition(position => {
    state.locating = false
    state.viewport.center = [position.coords.longitude, position.coords.latitude]
  });
}


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
