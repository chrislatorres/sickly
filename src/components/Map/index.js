import React from 'react'
import feathers from '@feathersjs/client'
import MyLocationIcon from '@material-ui/icons/MyLocation'
import LayersIcon from '@material-ui/icons/LayersOutlined'
import { toJS, observable } from 'mobx'
import { observer } from 'mobx-react'
import { 
  Banner
} from 'grey-vest'
import { Map, TileLayer } from 'react-leaflet'
import s from '../../assets/css/page.css'
import m from '../../assets/css/map.css'
import sickly from '../../assets/images/logo.png'

let state = observable({
  loading: false,
  sent: false,
  numSent: 0,
  geo: { 
    center: [0, 0], 
    zoom: 0 
  },
  viewport: { 
    center: [0, 0], 
    zoom: 0 
  },
  locating: false,
})

const setViewport = () => getMyLocation(17).then(() => state.viewport = state.geo) 

const getMyLocation = async (zoom) => {
  if (!navigator.geolocation) {
    const app = feathers();
    const restClient = feathers.rest('http://ip-api.com')
    app.configure(restClient.fetch(window.fetch));
    const ip = app.service('json').find()

    state.geo.center = [ip.lat, ip.lon]

    if (zoom) {
      state.geo.zoom = zoom 
    }
  } else {
    state.locating = true
    navigator.geolocation.getCurrentPosition(position => {
      state.geo.center = [position.coords.latitude, position.coords.longitude]
      state.locating = false
    }, async () => {
      const app = feathers();
      const restClient = feathers.rest('http://ip-api.com')
      app.configure(restClient.fetch(window.fetch));
      const ip = await app.service('json').find()

      state.geo.center = [ip.lat, ip.lon]
      if (zoom) {
        state.geo.zoom = zoom 
      }
      state.locating = false
    })
  }
}

const StatusBanner = observer(() => state.sent ? (
  <Banner className={s.banner}>
    You have successfuly submitted {state.numSent} cases.
  </Banner>
) : null )

const updateParentViewport = (updateViewport, viewport) => updateViewport(viewport)


const MapPage = observer((props) => {
  
  React.useEffect(() => {
    if(!state.geo.zoom) {
      setViewport()
    }

    return () => getMyLocation().then(props.updateViewport(state.geo))
  }, [])

  return (
  <div className={m.map}>
    <StatusBanner /> 
    <img src={sickly} className={m.logo} />
   <div className={m.layersCircle}>
      <a onClick={() => alert('layers')}>
        <LayersIcon className={m.layersIcon} />
      </a>
    </div>
    <div className={m.myLocationCircle}>
      <a onClick={() => setViewport()}>
        <MyLocationIcon className={m.myLocationIcon} />
      </a>
    </div>
    <Map onViewportChanged={(viewport) => state.viewport = viewport } viewport={ toJS(state.viewport) } zoomControl={false} className={s.leafletContainer}>
      <TileLayer
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
        attribution='https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
      />
    </Map>
  </div>
  )
})

export default MapPage 
