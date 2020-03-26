import React from 'react'
import { Link } from 'react-router-dom'
import LocationIcon from '@material-ui/icons/LocationOn'
import AddCircleIcon from '@material-ui/icons/ControlPoint'
import FavoriteIcon from '@material-ui/icons/FavoriteBorder'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import s from '../../assets/css/navbar.css'
import Sick from '../Sick'

let state = observable({
  isOpened: { 
    sick: false,
  }
}) 

const changeSickOpened = () => { state.isOpened.sick = !state.isOpened.sick }

const Navbar = observer((props) => 
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
)
export default Navbar 
