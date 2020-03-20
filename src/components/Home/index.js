import React from 'react'
import { Box } from 'grey-vest'
import s from '../../assets/css/page.css'
import logo from '../../assets/images/logoIcon.png'

let Home = () => 
  <Box className={s.box}> 
    <div className={s.container}>
        <img src={logo}/>
        <h1>Welcome to Sickly</h1>
        <small>Face the data. Coronavirus is here.</small>
        <p>
          Sickly texts your phone when there is a new case near you.<br/>
          <a href="https://github.com/sponsors/ltchris">You can support the project here.</a><br/>
          <a href="mailto:sickly@hideaddress.net">You can contact me here.</a><br/>
        </p>
    </div>
  </Box>

export default () => <Home />
