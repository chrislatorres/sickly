import React from 'react'
import s from '../../assets/css/page.css'

let About = () => 
  <div className={s.container}>
      <h1>Welcome to Sickly</h1>
      <p>
       Sickly was built by <b>2</b> humans.<br/>
      </p>
      <p>
       Sickly uses data from <b>Corona Data Scraper</b>.<br/> 
      </p>
      <p>
       <a href="https://coronadatascraper.com/"><b>Corona Data Scraper</b></a> pulls COVID-19 Coronavirus case data from verified sources, finds the corresponding GeoJSON features, and adds population data.
      </p>
      <p>
       <a href="mailto:sickly@hideaddress.net?subject=Sickly&body=Hi">Click here to email us.</a><br/>
      </p>
      <p>
       <a href="https://github.com/ltchris/sickly-app/">Sickly is open source on GitHub.</a><br/>
      </p>
  </div>

export default () => <About />
