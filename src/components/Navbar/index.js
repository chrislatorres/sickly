import React from 'react'
import { Link } from 'react-router-dom'

import SearchIcon from '@material-ui/icons/SearchOutlined'
import SavedIcon from '@material-ui/icons/SaveOutlined'
import WhatsNewIcon from '@material-ui/icons/VolumeDownOutlined'
import HelpIcon from '@material-ui/icons/HelpOutlineOutlined'
import PersonIcon from '@material-ui/icons/PersonOutlined'
import FavoriteIcon from '@material-ui/icons/FavoriteBorder'

import logoIcon from '../../assets/images/logoIcon.png'
import logo from '../../assets/images/logo.png'
import s from './index.css'



const App = () =>  
  <div id="mySidenav" className={s.sidenav}>
    <div className={s.sidenavTop}>
      <ul>
        <li>
          <Link to="/">
            <img className={s.sidenavLogo} src={logoIcon}/><img className={s.sidenavLogoBg} src={logo}/>
          </Link>
          <div className={s.sidenavSpace}/>
        </li>
        <li>
          <Link to="/search"><SearchIcon/>Search</Link>
        </li>
        <li>
          <Link to="/notify"><WhatsNewIcon/>Notify Me</Link>
        </li>
        <li>
          <Link to="/submit"><PersonIcon/>Submit Case</Link>
        </li>
      </ul>
    </div>
    <div className={s.sidenavBottom}>
      <ul>
        <li>
          <Link to="/help"><HelpIcon/>Help Center</Link>
        </li>

        <li>
          <Link to="/data"><SavedIcon/>Access Data</Link>
        </li>
        <li>
          <Link to="/about"><FavoriteIcon/>About</Link>
        </li>
      </ul>
    </div>
  </div>

export default App
