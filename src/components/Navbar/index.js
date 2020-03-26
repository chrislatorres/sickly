import React from 'react'
import { Link } from 'react-router-dom'
import LocationIcon from '@material-ui/icons/LocationOn'
import FavoriteIcon from '@material-ui/icons/FavoriteBorder'
import s from '../../assets/css/navbar.css'

const Navbar = () => 
    <>
    <div className={s.sidenavContainer}>
      <div className={s.sidenav}>
        <div className={s.sidenavTop}>
          <ul>
            <li>
              <Link to="/"><LocationIcon/>Explore</Link>
            </li>
            <li>
              <Link to="/about"><FavoriteIcon/>About</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    </>

export default Navbar 
