import React from 'react'
import { Grid, GridItem, Box } from 'grey-vest'
import s from './index.css'

let Data = () => 
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
              <h1>Data API</h1>
              <p>
                 Sickly uses <a href="https://covid19api.com/">the COVID-19 API</a>, the API allows you to access COVID-19 data sourced from <a href="https://github.com/CSSEGISandData/COVID-19">Johns Hopkins CSSE</a>.<br/>
              <hr/>
              </p>
              <div className={s.apiSection}>
                <h2 className={s.apiTitle}>List Routes</h2>
                <p className={s.apiDescription}>List all routes with parameters and descriptions.</p>
                <code className={s.apiCode}>
                 https://api.covid19api.com/ 
                </code> 
                <hr/>
              </div>
              <div className={s.apiSection}>
                <h2 className={s.apiTitle}>Get Summary Data</h2>
                <p className={s.apiDescription}>Return new cases and total cases per country.</p>
                <code className={s.apiCode}>
                 https://api.covid19api.com/summary
                </code> 
                <hr/>
              </div>
              <div className={s.apiSection}>
                <h2 className={s.apiTitle}>Get All Data</h2>
                <p className={s.apiDescription}>This call returns ~8MB of data and currently takes around 5 seconds.</p>
                <code className={s.apiCode}>
                 https://api.covid19api.com/all
                </code> 
                <hr/>
              </div>
              <div className={s.apiSection}>
                <h2 className={s.apiTitle}>Get All Countries</h2>
                <p className={s.apiDescription}>List all countries and their provinces.</p>
                <code className={s.apiCode}>
                 https://api.covid19api.com/countries
                </code> 
                <hr/>
              </div>

            </div>
          </div>
        </div>
      </Box>
    </GridItem>
  </Grid>

export default () => <Data />
