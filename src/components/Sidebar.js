import { NavLink } from "react-router-dom"
//import { useAuthContext } from '../hooks/useAuthContext'


// styles & images
import "./Sidebar.css"
import DashboardIcon from '../assets/dashboard_icon.svg'


export default function Sidebar() {
  //const { user } = useAuthContext()

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="user">
          
          <p>Hello user</p>  
        </div>  
        <nav className="links">
          <ul>
            <li>
              <NavLink exact to="/">
                <img src={DashboardIcon} alt="dashboard icon" />
                <span>Kezdőoldal</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/bom">
                  <span>BOM lista</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/mrp">
                  <span>MRP</span>
              </NavLink>
              <NavLink to="/raktár">
                  <span>Raktárkészlet</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
