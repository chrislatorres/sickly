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
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import s from '../../assets/css/page.css'
import m from '../../assets/css/map.css'
import sickly from '../../assets/images/logo.png'

let state = observable({
  data: null,
  loading: false,
  sent: false,
  numSent: 0,
  geo: { 
    center: [0, 0], 
    zoom: 2,
    set: null
  },
  viewport: { 
    center: [0, 0], 
    zoom: 2 
  },
  locating: false,
})

const getData = async () => { 
  var app = feathers(); 
  var restClient = feathers.rest('https://api.sickly.app') 
  app.configure(restClient.fetch(window.fetch)); 
  state.data = await app.service('data').find() 
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
    position = [42, 42]
  }
  return (
    <div key={i} className={s.markerDiv}>
      <Marker position={position}>
        <Popup>{mark.Country}: {mark.TotalConfirmed}.</Popup>
      </Marker>
    </div>
  )
}))

const MapPage = observer((props) => {
  
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
    <Map onViewportChanged={(viewport) => { state.viewport = viewport } } viewport={ toJS(state.viewport) } boxZoom={true} dragging={true} tap={true} zoomControl={false} className={s.leafletContainer}>
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
