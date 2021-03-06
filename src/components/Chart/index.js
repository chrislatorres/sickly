import React from 'react'
import feathers from '@feathersjs/client'
import JavascriptTimeAgo from 'javascript-time-ago'
import ShowMoreText from 'react-show-more-text'
import InfiniteScroll from 'react-infinite-scroll-component'
import countries from 'i18n-iso-countries'
import states from '../Map/states.json'
import germany from '../Map/germany.json'
import { Line } from 'react-chartjs-2'
import en from 'javascript-time-ago/locale/en'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import s from '../../assets/css/page.css'

countries.registerLocale(require("i18n-iso-countries/langs/en.json"))

JavascriptTimeAgo.locale(en)

let state = observable({
  //date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  date: '2020-3-26', 
  timeData: null,
  timeLocationData: null,
  items: Array.from({ length: 20 }),
  id: 'null',
  tree: {},
  set: false,
  numOfCases: 0,
  viewport: {} 
})

const getTimeSeries = async () => {
  var app = feathers();
  var restClient = feathers.rest('https://coronadatascraper.com')
  app.configure(restClient.fetch(window.fetch));
  state.timeData = await app.service('timeseries.json').find() 
  state.set = true
}
const getTimeSeriesLocation = async () => {
  var app = feathers();
  var restClient = feathers.rest('https://coronadatascraper.com')
  app.configure(restClient.fetch(window.fetch));
  state.timeLocationData = await app.service('timeseries-byLocation.json').find() 
  state.set = true
}


let Chart = observer((props) => { 

  React.useEffect(() => {
    if (!state.set) {
      getTimeSeries()
      getTimeSeriesLocation()
    }
  }, []) 
  
  const fetchMoreData = () => {
    setTimeout(() => {
      state.items = state.items.concat(Array.from({ length: 20 }))
    }, 50)
  }
  
  return (
    <InfiniteScroll
      dataLength={state.items.length} //This is important field to render the next data
      next={fetchMoreData}
      hasMore={true}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{textAlign: 'center'}}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
    { 
      state.items.map((index, i) => { 
        if (!state.timeData || !state.timeLocationData) { return }
        const card = props.data[i]

        if (state.timeData && state.timeData[state.date][i]) { 
          const county = county ? card.county : null

          let stateName = card.state ? card.state : null
          if (country === "USA" && card.state ) {
            stateName = states[card.state] 
          } else if (country === "DEU" && card.state) {
            stateName = germany[card.state] 
          } 

          const country = card.country ? countries.getName(card.country, "en") : null
    
          let locationName = "no location name"
    
          if (county) {
            locationName = `${county}, ${stateName}, ${country}` 
          } else if (stateName) {
            locationName = `${stateName}, ${country}` 
          } else if (country) {
            locationName = `${country}` 
          }

      
          const labels = Object.keys(state.timeData).map((date) => date)
          const graphData = {
            labels,
            datasets: [{
                data: labels.map(date => { 
                  if (state.timeLocationData[card.country]['dates'][date]) {
                    return state.timeLocationData[card.country]['dates'][date]['cases'] 
                  } else { 
                    return 0 
                  }
                }),
                label: locationName,
                borderColor: "#0076de",
                fill: false
            }]
          }

          return(
            <div key={`${state.items.length}-${i}`} className={[s.card, s.post].join(' ')}> 
              <div className={s.username}>
                <span>
                  {locationName ? locationName : null}
                </span>
              </div>
             {state.timeLocationData[card.country] ? 
               <Line data={graphData} /> 
             : null }
              <div className={s.comments}>
                <span>
                  <ShowMoreText
                    /* Default options */
                    lines={3}
                    more='more'
                    less=''
                    expanded={false}
                  >
                    {`There are ${state.timeData[state.date][i]['cases']} in ${locationName} on ${state.date}.` }
                  </ShowMoreText>
                </span>
              </div>
            </div>
          )
        }
      })                   
    }
    </InfiniteScroll>
  )
})

export default Chart
