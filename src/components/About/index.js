import React from 'react'
import s from '../../assets/css/page.css'

let About = () => 
  <div className={s.container}>
      <h1>Welcome to Sickly</h1>
      <p>
       Sickly was built by <b>2</b> humans from <b>Dallas, TX</b>.<br/>
       <a href="mailto:sickly@hideaddress.net?subject=Sickly&body=Hi">Click here to email us.</a><br/>
      </p>
  </div>

export default () => <About />
