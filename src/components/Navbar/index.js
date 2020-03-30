import React from 'react'
import { Link } from 'react-router-dom'
import LocationIcon from '@material-ui/icons/LocationOn'
import ChartIcon from '@material-ui/icons/ShowChart'
import FavoriteIcon from '@material-ui/icons/FavoriteBorder'
import s from '../../assets/css/navbar.css'

const Navbar = () => 
  <div className={s.sidenav}>
    <ul>
      <li>
        <Link to="/"><LocationIcon/>Explore</Link>
      </li>
      <li>
        <Link to="/chart"><ChartIcon/>Chart</Link>
      </li>
      <li>
        <Link to="/about"><FavoriteIcon/>About</Link>
      </li>
    </ul>
  </div>

export default Navbar 
