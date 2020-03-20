import React from 'react'
import { Link } from 'react-router-dom'

import LocationIcon from '@material-ui/icons/LocationOn'
import SearchIcon from '@material-ui/icons/SearchOutlined'
import CodeIcon from '@material-ui/icons/Code'
import WhatsNewIcon from '@material-ui/icons/VolumeDownOutlined'
import PersonIcon from '@material-ui/icons/PersonOutlined'
import FavoriteIcon from '@material-ui/icons/FavoriteBorder'

import logoIcon from '../../assets/images/logoIcon.png'
import logo from '../../assets/images/logo.png'
import s from '../../assets/css/navbar.css'

const App = () =>  
<div className={s.sidenavContainer}>
  <Link to="/">
    <img className={s.sidenavHamburger} src={logoIcon}/>
  </Link>
  <div className={s.sidenav}>
    <div className={s.sidenavTop}>
      <ul>
        <li>
          <Link to="/"><LocationIcon/>Map</Link>
        </li>
        <li>
          <Link to="/search"><SearchIcon/>Search Cases</Link>
        </li>
        <li>
          <Link to="/notify"><WhatsNewIcon/>Notify Me</Link>
        </li>
        <li>
          <Link to="/submit"><PersonIcon/>Submit Case</Link>
        </li>
        <li>
          <Link to="/data"><CodeIcon/>Developers</Link>
        </li>
        <li>
          <Link to="/about"><FavoriteIcon/>About</Link>
        </li>
      </ul>
    </div>
  </div>
</div>

export default App
