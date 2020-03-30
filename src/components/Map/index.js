import React from 'react'
import countries from 'i18n-iso-countries'
import { toJS, observable } from 'mobx'
import { observer } from 'mobx-react'
import { Map, CircleMarker, Tooltip, TileLayer } from 'react-leaflet'
import L from 'leaflet' 
import s from '../../assets/css/page.css'
import m from '../../assets/css/map.css'
import sickly from '../../assets/images/logo.png'
import states from './states.json'
import germany from './germany.json'

countries.registerLocale(require("i18n-iso-countries/langs/en.json"))

let state = observable({
  set: false,
  viewport: { 
    center: [31.35, -53.10], 
    zoom: 3 
  },
})

const MapPage = observer((props) => {
  let southWest = L.latLng(-90, -180);
  let northEast = L.latLng(90, 180); 

  return ( 
    <div className={m.map}>
      <img src={sickly} className={m.logo} />
      <Map 
        preferCanvas={true}
        viewport={ toJS(state.viewport) } 
        onViewportChanged={(viewport) => { 
          if (viewport.center && viewport.zoom) {
            state.viewport = viewport 
          } 
        }} 
        minZoom={3} 
        maxZoom={20} 
        maxBounds={L.latLngBounds(southWest, northEast)}
        maxBoundsViscosity={1}
        zoomControl={!L.Browser.mobile ? true : null}
        className={s.leafletContainer}
      >
        <TileLayer
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
          attribution='https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        />
        {
          props.data.map((mark, i) => { 
            if (!mark.coordinates || !mark.cases || mark.cases < 1) { return }
        
            const coordinates = toJS(mark.coordinates)
            const position = [parseFloat(coordinates[1]), parseFloat(coordinates[0])] 
          
            const scale = Math.log10(mark.cases) / Math.log10(props.maxNumCases) 
            const radius = 35 * ( Math.log10(mark.cases) / Math.log10(props.maxNumCases) )
            const color = `rgba(0, 0, 255, ${scale})`
           
            return ( 
              <div key={i} className={s.markerDiv}>
                  <CircleMarker radius={radius} position={position} center={position} color={color} >
                    <Tooltip className={m.tooltip}>
                      <h2><b>
                        {mark.county ? `${mark.county}, ` : null}
                        {mark.state ? 
                          mark.country === "USA" ? 
                            `${states[mark.state]}, ` 
                          : mark.country === "DEU" ?
                            `${germany[mark.state]}, ` 
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
            )
          })
        }
      </Map>
    </div>
  )
})

export default MapPage 
