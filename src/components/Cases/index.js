import React from 'react'
import JavascriptTimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ReactTimeAgo from 'react-time-ago'
import MoonLoader from 'react-spinners/MoonLoader'
import InfiniteScroll from 'react-infinite-scroller'
import feathers from '@feathersjs/client'
import io from 'socket.io-client'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { Box } from 'grey-vest'
import s from '../../assets/css/page.css'

JavascriptTimeAgo.locale(en)

let state = observable({
  loading: false,
  data: [], 
  hasMoreItems: true,
  viewport: {} 
})

const addData = (newCase) => {
   state.data.unshift(newCase)
}
const getSocketData = async () => {
  const app = feathers()
  const socket = io('https://api.sickly.app')
  app.configure(feathers.socketio(socket))
  app.service('cases').on('created', addData)
}
getSocketData()

const loadItems = (page) => {
  if (state.loading) { return }
  state.loading = true

  const app = feathers();
  const restClient = feathers.rest('https://api.sickly.app')
  app.configure(restClient.fetch(window.fetch))
  const cases = app.service('cases')
  
  cases.find({
    query: {
      $skip: page*15,
      $sort: {
        date: -1
      }   
    }   
  })
  .then((list) => {
    list.data.map( (newCase) => state.data.push(newCase) ) 
    page*15 > list.total ? state.hasMoreItems = false : null 
    state.loading = false
  })
}
loadItems(0)

let Cases = observer((props) => { 
  state.viewport = props.viewport 

  let items = []
  state.data.map((card, i) => card.location ? 
    items.push(
      <div key={i} className={s.cases}>
        <Box className={s.card}> 
          Feeling sickly in{' '}
          <b>
              {card.location.city ? `${card.location.city}, ` : null}  
              {card.location.region ? `${card.location.region}, ` : null}
              {card.location.country ? card.location.country : null}
          </b>.<br/>
          {card.date ? 
            <small className={s.date}><ReactTimeAgo date={card.date}/></small>
          : null}
        </Box>
      </div>
    )
   : null
  )

  return ( 
    <div className={s.container}>
      <InfiniteScroll
        pageStart={1}
        initialLoad={false}
        loadMore={loadItems}
        hasMore={state.hasMoreItems}
        loader={<MoonLoader key={0} />}
       >
         {items}
      </InfiniteScroll>
    </div> 
         )
})

export default Cases
