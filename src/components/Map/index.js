import React from 'react'
import feathers from '@feathersjs/client'
import MyLocationIcon from '@material-ui/icons/MyLocation'
import LayersIcon from '@material-ui/icons/LayersOutlined'
import FeedIcon from '@material-ui/icons/DynamicFeed'
import countries from 'i18n-iso-countries'
import states from './states.json'
import { toJS, observable } from 'mobx'
import { observer } from 'mobx-react'
import { 
  Banner
} from 'grey-vest'
import { Map, Marker, CircleMarker, Tooltip, TileLayer } from 'react-leaflet'
import HeatmapLayer from 'react-leaflet-heatmap-layer'
import L from 'leaflet' 
import s from '../../assets/css/page.css'
import m from '../../assets/css/map.css'
import sickly from '../../assets/images/logo.png'
import Cases from '../Cases'

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

let state = observable({
  isOpened: false,
  data: null,
  points: [],
  pointsLoaded: false,
  maxNumCases: null,
  radius: true,
  loading: false,
  sent: false,
  numSent: 0,
  set: false,
  location,
  viewport: { 
    center: [0, 0], 
    zoom: 3 
  },
  locating: false,
})

const changeCasesOpened = () => { state.isOpened = !state.isOpened }

const getData = async () => { 
  let app = feathers(); 
  let restClient = feathers.rest('https://coronadatascraper.com/') 
  app.configure(restClient.fetch(window.fetch)); 
  let data = await app.service('data.json').find() 
  
  state.data = data
  const numCases = data.map(location => location.cases ? location.cases : 0 ) 
  const locations = data.map(loc => { 
    if(loc.coordinates) {
      state.points.push([loc.coordinates[1], loc.coordinates[0]])
    }
  })
  Promise.all([locations, numCases].flat()).then(() => {
    state.pointsLoaded = true
    state.maxNumCases = Math.max( ...numCases ) 
  })
}
getData()

const getMyLocation = async () => {
  if (state.viewport.zoom < 5) {
    state.viewport.zoom = 8 
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

  if (state.viewport.zoom < 8 && mark.county) {
    return 
  } else if (state.viewport.zoom < 5 && mark.state) {
    if (!['USA', 'CAN'].includes(mark.country)) {
      return 
    }
  } 

  const coordinates = toJS(mark.coordinates)
  const position = [coordinates[1], coordinates[0]] 

  const scale = Math.log10(mark.cases) / Math.log10(state.maxNumCases) 
  const scaledRadius = 35 * ( Math.log10(mark.cases) / Math.log10(state.maxNumCases) )
  const radius = state.radius ? scaledRadius : 15 
  const color = `rgba(0, 0, 255, ${scale})`
 
  return  state.viewport.zoom < 6 ?
    <div key={i} className={s.markerDiv}>
        <Marker position={position} color={color} >
          <Tooltip>
            <h2><b>
              {mark.county ? `${mark.county}, ` : null}
              {mark.state ? 
                mark.country === "USA" ? 
                  `${states[mark.state]}, ` 
                :
                  `${mark.state}, ` 
              : null}
              {countries.getName(mark.country, "en")}
            </b></h2>
            <p>Total Confirmed Cases: <b>{mark.cases}</b></p>
            { mark.deaths ? <p>Total Deaths: <b>{mark.deaths}</b></p> : null}
          </Tooltip>
        </Marker>
    </div>
  : 
    <div key={i} className={s.markerDiv}>
        <CircleMarker radius={radius} center={position} color={color} >
          <Tooltip>
            <h2><b>
              {mark.county ? `${mark.county}, ` : null}
              {mark.state ? 
                mark.country === "USA" ? 
                  `${states[mark.state]}, ` 
                :
                  `${mark.state}, ` 
              : null}

              {countries.getName(mark.country, "en")}
            </b></h2>
            <p>Total Confirmed Cases: <b>{mark.cases}</b></p>
            { mark.deaths ? <p>Total Deaths: <b>{mark.deaths}</b></p> : null}
          </Tooltip>
        </CircleMarker>
    </div>
}))

const MapPage = observer((props) => {
  let southWest = L.latLng(-90, -180);
  let northEast = L.latLng(90, 180); 
  
  if (!state.set) {
    if (props.location.ll) {
      state.viewport.center = [props.location.ll[0], props.location.ll[1]]
      state.set = true
    } 
  }
  
  return (
  <div className={m.map}>
    <StatusBanner /> 
    <img src={sickly} className={m.logo} />
   <Cases isOpened={state.isOpened} changeOpened={changeCasesOpened} />
   <div className={m.layersCircle}>
      <a onClick={() => { state.radius = !state.radius }}>
        <LayersIcon className={m.layersIcon} />
      </a>
    </div>
   <div className={m.feedCircle}>
      <a onClick={() => { state.isOpened = !state.isOpened }}>
        <FeedIcon className={m.feedIcon} />
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
      { state.pointsLoaded ?
        <HeatmapLayer
              points={ toJS(state.points) }
              longitudeExtractor={m => m[1]}
              latitudeExtractor={m => m[0]}
              radius={30}
              max={3}
              blur={15}
              intensityExtractor={() => 1} />
      : null }
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
