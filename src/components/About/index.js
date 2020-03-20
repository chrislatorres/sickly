import React from 'react'
import { Box } from 'grey-vest'
import s from '../../assets/css/page.css'

let About = () => 
  <Box className={s.box}> 
    <div className={s.container}>
        <h1>Welcome to Sickly</h1>
        <p>
         Sickly was built by <b>2</b> Software Engineers out of <b>Dallas, Texas</b>.<br/>
         We created Sickly to help people <b>face the data</b> on COVID-19 cases.<br/>
         Sickly helps you keep up to date with cases <i>near you</i>.<br/>
         <a href="mailto:sickly@hideaddress.net?subject=Sickly&body=Hi">Click here to email us.</a><br/>
        </p>
    </div>
  </Box>

export default () => <About />
