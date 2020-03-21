import React from 'react'
import feathers from '@feathersjs/client'
import { Link } from 'react-router-dom'
import LocationIcon from '@material-ui/icons/LocationOn'
import PersonIcon from '@material-ui/icons/Person'
import NotificationsIcon from '@material-ui/icons/NotificationsNone'
import AddCircleIcon from '@material-ui/icons/ControlPoint'
import FavoriteIcon from '@material-ui/icons/FavoriteBorder'
import s from '../../assets/css/navbar.css'

const submitCase = async (viewport) => {
  var app = feathers();
  var restClient = feathers.rest('https://api.sickly.app')
  app.configure(restClient.fetch(window.fetch));
  app.service('cases').create({ date: Date.now(), location: viewport.center })
}

const Navbar = (props) => 
    <div className={s.sidenavContainer}>
      <div className={s.sidenav}>
        <div className={s.sidenavTop}>
          <ul>
            <li>
              <Link to="/"><LocationIcon/>Explore</Link>
            </li>
            <li>
              <Link to="/updates"><NotificationsIcon/>Updates</Link>
            </li>
            <li>
              <a onClick={() => submitCase(props.viewport)}><AddCircleIcon/>I{"'"}m Sick</a>
            </li>
            <li>
              <Link to="/cases"><PersonIcon/>Cases</Link>
            </li>
            <li>
              <Link to="/about"><FavoriteIcon/>About</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>

export default Navbar 
