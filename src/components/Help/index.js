import React from 'react'
import { Box } from 'grey-vest'
import s from '../../assets/css/page.css'
import apiList from './data.js'

let Help = () => 
  <Box className={s.box}> 
    <div className={s.container}>
      <h1>Help</h1>
      <p>
        Sickly uses <a href="https://covid19api.com/">the COVID-19 API</a>, the API allows you to access COVID-19 data sourced from <a href="https://github.com/CSSEGISandData/COVID-19">Johns Hopkins CSSE</a>.<br/>
      </p>
      <hr/>
      
      {apiList.map(api => 
      <div key={api.title} className={s.apiSection}>
        <h1 className={s.apiTitle}>{api.title}</h1>
        <p className={s.apiDescription}>{api.description}</p>
        <code className={s.apiCode}>
          {api.url}
        </code> 
        <hr/>
      </div>
      )}
    </div>
  </Box>

export default () => <Help />
