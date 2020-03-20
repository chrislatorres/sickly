import React from 'react'
import { Box } from 'grey-vest'
import s from '../../assets/css/page.css'

let Data = () => 
  <Box className={s.box}> 
    <div className={s.container}>
      <h1>Data API</h1>
      <p>
        The Sickly API allows you to access real-time verified COVID-19 data sourced at a more granular city level.<br/>
        If you are interested in using the Sickly API, <a href="mailto:sickly@hideaddress.net">you can contact me here.</a><br/>
        At this time, Sickly API access is paid in order to be able to sustain the project.<br/>
      </p>
    </div>
  </Box>

export default () => <Data />
