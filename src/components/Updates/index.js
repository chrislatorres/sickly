import React from 'react'
import feathers from '@feathersjs/client'
import JavascriptTimeAgo from 'javascript-time-ago'
import ShowMoreText from 'react-show-more-text'
import en from 'javascript-time-ago/locale/en'
import PullToRefresh from 'pulltorefreshjs'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { exampleTypes } from 'contexture-client'
import ContextureMobx from 'contexture-react/dist/utils/contexture-mobx'
import service from './service'
import s from '../../assets/css/page.css'
import logo from '../../assets/images/logoIcon.png'

JavascriptTimeAgo.locale(en)

let state = observable({
  data: null,
  id: 'null',
  tree: {},
  numOfCases: 0,
  viewport: {} 
})

const getData = async () => {
  var app = feathers();
  var restClient = feathers.rest('https://api.sickly.app')
  app.configure(restClient.fetch(window.fetch));
  state.data = await app.service('updates').find({ 
    query: { 
        $limit: 500,
        $skip: 0
    } 
  })
}
getData()

let types = exampleTypes
          

let Client = ContextureMobx({
  types,
  service,
})

state.tree = Client({
  key: 'root',
  type: 'group',
  join: 'and',
  schema: 'Test',
  children: [
    { key: 'criteria', 
      type: 'group', 
      join: 'and', 
      children: [
        { key: 'city', type: 'text', field: 'city', },
        { key: 'currency', type: 'text', field: 'currency', },
        { key: 'type', type: 'text', field: 'type', },
        { key: 'fiat_currency', type: 'text', field: 'fiat_currency', },
        { key: 'fiat_value', type: 'text', field: 'fiat_value', },
      ], 
    },
    { key: 'id', type: 'text', field: 'id', data: { operator: 'is', value: state.id } },
    { key: 'results', type: 'results' },
  ],
})



const Cards = observer(() => state.data.map((card, i) => 
  ['coronavirus', 'covid'].some(v => card.firstComment.includes(v)) ?
    <div key={i} className={[s.card, s.post].join(' ')}> 
      <div className={s.username}>
        <img className={s.favicon} src={logo} />
        <span>{card.ownerUsername}</span>
      </div>
      <img src={card.imageUrl} className={s.cardImg} />
      <div className={s.comments}>
        <span>
          <ShowMoreText
            /* Default options */
            lines={3}
            more='more'
            less=''
            expanded={false}
          >
            <span className={s.url}>{card.ownerUsername} {'   '}</span>
            {card.firstComment}
          </ShowMoreText>
        </span>
      </div>
    </div>
  : null
))

let Cases = observer((props) => { 
  state.viewport = props.viewport 

  React.useEffect(() => {
    PullToRefresh.init({
      onRefresh() {
        getData()
      }
    })

    return () => PullToRefresh.destroyAll()
  }, []) 

  return ( state.data ? <div className={s.container}><Cards /></div> : <h1>Loading...</h1> )
})

export default Cases
