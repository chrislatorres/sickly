import React from 'react'
import { Grid, GridItem, Box } from 'grey-vest'
import s from './index.css'
import about from '../../assets/images/about.jpg'

let Home = () => 
  <Grid 
    gap="0px" 
    areas={[
     'main',
    ]}
    rows="1fr"
    columns="1fr"
    className={s.grid}
  >
    <GridItem area="main">
      <Box className={s.box}> 
        <div className={s.hero}>
          <div className={s.heroContainer}>
            <div className={s.heroInnerContainer}>
              <img src={about}/>
              <h1>Welcome to Sickly</h1>
              <p>
                 Hi I am <b>Christopher</b>, a Software Engineer out of Dallas, Texas.<br/>
                 I created Sickly to help people face the data on COVID-19 cases.<br/>
                 Sickly texts your phone when there is a new case near you.<br/>
                 <a href="https://github.com/sponsors/ltchris">You can support the project here.</a><br/>
                 <a href="mailto:sickly@hideaddress.net">You can contact me here.</a><br/>
              </p>
            </div>
          </div>
        </div>
      </Box>
    </GridItem>
  </Grid>

export default () => <Home />
