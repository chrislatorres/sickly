import React from 'react'
import { Grid, GridItem, Box } from 'grey-vest'
import s from '../../assets/css/page.css'
import about from '../../assets/images/about.jpg'

let Submit = () => 
  <Box className={s.box}> 
    <div className={s.container}>
        <h1>Submit A New Case</h1>
        <p>
  	 Hi I am <b>Christopher</b>, a freelance Software Engineer out of Dallas, Texas.<br/>
  	 I created Sickly to help people face the data on COVID-19 cases.<br/>
  	 Sickly texts your phone when there is a new case near you.<br/>
  	 <a href="https://github.com/sponsors/ltchris">You can support the project here.</a><br/>
  	 <a href="mailto:sickly@hideaddress.net">You can contact me here.</a><br/>
        </p>
    </div>
  </Box>

export default () => <Submit />
