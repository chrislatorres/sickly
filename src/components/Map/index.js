import React from 'react'
import feathers from '@feathersjs/client'
import MyLocationIcon from '@material-ui/icons/MyLocation'
import LayersIcon from '@material-ui/icons/LayersOutlined'
import { toJS, observable } from 'mobx'
import { observer } from 'mobx-react'
import { 
  Banner
} from 'grey-vest'
import { Map, CircleMarker, Tooltip, TileLayer } from 'react-leaflet'
import L from 'leaflet' 
import s from '../../assets/css/page.css'
import m from '../../assets/css/map.css'
import sickly from '../../assets/images/logo.png'

let state = observable({
  data: null,
  maxNumCases: null,
  radius: true,
  loading: false,
  sent: false,
  numSent: 0,
  set: null,
  location,
  viewport: { 
    center: [0, 0], 
    zoom: 3 
  },
  locating: false,
})

const getData = async () => { 
  let app = feathers(); 
  let restClient = feathers.rest('https://api.sickly.app') 
  app.configure(restClient.fetch(window.fetch)); 
  let data = await app.service('data').find() 

  state.data = data 
  let numCases = await data.map(location => location.cases) 
  state.maxNumCases = Math.max(...numCases) 
}
getData()

const getMyLocation = async () => {
  const app = feathers();
  const restClient = feathers.rest('https://api.sickly.app')
  app.configure(restClient.fetch(window.fetch));
  const my = await app.service('locate').create({}).then()

  state.viewport.center = [my.location.ll[0], my.location.ll[1]]
  state.location = my.location

  if (!state.set) {
    state.set = true
  }
  else if (state.viewport.zoom < 5) {
    state.viewport.zoom = 7 
  } else if (state.viewport.zoom >= 5 && state.viewport.zoom < 10) {
    state.viewport.zoom = 11 
  } else if (state.viewport.zoom >= 10) {
    state.viewport.zoom = 3 
  }
}

const StatusBanner = observer(() => state.sent ? (
  <Banner className={s.banner}>
    You have successfuly submitted {state.numSent} cases.
  </Banner>
) : null )

const Markers = observer(() => state.data.map((mark, i) => { 
  if (!mark.coordinates) { return }

  if (state.viewport.zoom < 4 && mark.state) {
    return 
  } 
  else if (state.viewport.zoom < 6 && mark.county) {
    return 
  } 

  const coordinates = toJS(mark.coordinates)
  const position = [coordinates[1], coordinates[0]] 

  const scale = Math.log10(mark.cases) / Math.log10(state.maxNumCases) 
  const scaledRadius = 35 * ( Math.log10(mark.cases) / Math.log10(state.maxNumCases) )
  const radius = state.radius ? scaledRadius : 15 
  const color = `rgba(0, 0, 255, ${scale})`
 
  return (
    <div key={i} className={s.markerDiv}>
      <CircleMarker radius={radius} center={position} color={color} >
        <Tooltip>
          <h2><b>
            {mark.county ? `${mark.county}, ` : null}
            {mark.state ? `${mark.state}, ` : null}
            {mark.country}
          </b></h2>
          <p>Total Confirmed Cases: <b>{mark.cases}</b></p>
          { mark.deaths ? <p>Total Deaths: <b>{mark.deaths}</b></p> : null}
        </Tooltip>
      </CircleMarker>
    </div>
  )
}))

const MapPage = observer((props) => {
  let southWest = L.latLng(-90, -180);
  let northEast = L.latLng(90, 180); 
  
  React.useEffect(() => {
    if(!state.set) {
      getMyLocation().then(() => {
        props.updateLocation(state.location)
      })
    }
  }, [])

  return (
  <div className={m.map}>
    <StatusBanner /> 
    <img src={sickly} className={m.logo} />
   <div className={m.layersCircle}>
      <a onClick={() => { state.radius = !state.radius }}>
        <LayersIcon className={m.layersIcon} />
      </a>
    </div>
    <div className={m.myLocationCircle}>
      <a onClick={() => getMyLocation()}>
        <MyLocationIcon className={m.myLocationIcon} />
      </a>
    </div>
    <Map 
      preferCanvas={true}
      onViewportChanged={(viewport) => { state.viewport = viewport } } 
      viewport={ toJS(state.viewport) } 
      minZoom={3} 
      maxZoom={20} 
      onZoomEnd={(e) => { state.viewport.zoom = e.target.getZoom() }}
      maxBounds={L.latLngBounds(southWest, northEast)}
      maxBoundsViscosity={1}
      zoomControl={!L.Browser.mobile ? true : null}
      className={s.leafletContainer}
    >
      <TileLayer
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
        attribution='https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
      />
      { state.data && state.maxNumCases ? <Markers /> : null }
    </Map>
  </div>
  )
})

export default MapPage 
