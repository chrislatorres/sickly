import React from 'react'
import JavascriptTimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ReactTimeAgo from 'react-time-ago'
import InfiniteScroll from 'react-infinite-scroller'
import feathers from '@feathersjs/client'
import io from 'socket.io-client'
import { compose, withHandlers, lifecycle } from 'recompose'
import withClickOutside from 'react-click-outside'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import Box from 'grey-vest/dist/Box'
import s from '../../assets/css/page.css'

JavascriptTimeAgo.locale(en)

let state = observable({
  isOpened: true,
  changeOpened: null,
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

const yourEnhancer = compose(
    withHandlers({
        someHandler: () => () => { state.isOpened ? state.changeOpened()  : null },
    }), 
    withClickOutside,
    lifecycle({
        handleClickOutside() {
            this.props.someHandler();
        },
    }), 
)

let Cases = observer((props) => { 
  state.viewport = props.viewport 
  state.isOpened = props.isOpened
  state.changeOpened = props.changeOpened


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
    state.isOpened ?
    <div className={s.casesPopup}>
      <InfiniteScroll
        pageStart={1}
        initialLoad={false}
        loadMore={loadItems}
        useWindow={false}
        hasMore={state.hasMoreItems}
        loader={<></>}
       >
         {items}
      </InfiniteScroll>
    </div> 
    : null
         )
})

export default yourEnhancer(Cases)
