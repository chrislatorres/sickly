import React from 'react'
import feathers from '@feathersjs/client'
import n from 'country-js'
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
  loading: false,
  sent: false,
  numSent: 0,
  geo: { 
    center: [0, 0], 
    zoom: 3,
    set: null
  },
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
  let numCases = await data[0].Countries.map((country) => country.TotalConfirmed) 
  state.maxNumCases = Math.max(...numCases) 
}
getData()

const setViewport = (zoom) => { 
  getMyLocation(zoom)
  state.viewport = state.geo
}


const getMyLocation = async (zoom) => {
  const app = feathers();
  const restClient = feathers.rest('https://api.sickly.app')
  app.configure(restClient.fetch(window.fetch));
  const my = await app.service('locate').create({}).then()

  state.geo.center = [my.location.ll[0], my.location.ll[1]]

  if (zoom) {
    state.geo.zoom = zoom 
  }
}

const StatusBanner = observer(() => state.sent ? (
  <Banner className={s.banner}>
    You have successfuly submitted {state.numSent} cases.
  </Banner>
) : null )

const Markers = observer(() => state.data[0].Countries.map((mark, i) => { 
  const search = n.search(mark.Country)[0]
  let position

  if (search) {
    const { latitude, longitude } = search.geo
    position = [latitude, longitude]
  } else {
    return 
  }

  const scale = Math.log10(mark.TotalConfirmed) / Math.log10(state.maxNumCases) 
  const radius = 100 * ( Math.log10(mark.TotalConfirmed) / Math.log10(state.maxNumCases) )
  const color = `rgba(0, 0, 255, ${scale})`
 
  return (
    <div key={i} className={s.markerDiv}>
      <CircleMarker radius={radius} center={position} color={color} >
        <Tooltip>
          <h2><b>{mark.Country}</b></h2>
          <p>Total Confirmed Cases: <b>{mark.TotalConfirmed}</b></p>
          <p>Total Deaths: <b>{mark.TotalDeaths}</b></p>
          <p>Total Recovered: <b>{mark.TotalRecovered}</b></p>
        </Tooltip>
      </CircleMarker>
    </div>
  )
}))

const MapPage = observer((props) => {
  let southWest = L.latLng(-90, -180);
  let northEast = L.latLng(90, 180); 
  
  React.useEffect(() => {
    if(!state.geo.set) {
      state.geo.set = true
      setViewport(3)
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
      <a onClick={() => setViewport(12)}>
        <MyLocationIcon className={m.myLocationIcon} />
      </a>
    </div>
    <Map 
      onViewportChanged={(viewport) => { state.viewport = viewport } } 
      viewport={ toJS(state.viewport) } 
      minZoom={3} 
      maxZoom={20} 
      maxBounds={L.latLngBounds(southWest, northEast)}
      maxBoundsViscosity={1}
      zoomControl={false} 
      className={s.leafletContainer}
    >
      <TileLayer
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
        attribution='https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
      />
      { state.data ? <Markers /> : null }
    </Map>
  </div>
  )
})

export default MapPage 
