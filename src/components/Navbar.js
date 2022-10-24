import React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

import './Navbar.css'


export default function Navbar() {
    const {logout, isPending} =useLogout()
    const { user } = useAuthContext()
  return (
    <nav className="navbar">
    <ul>
         <li className="logo">        
          <span>Készletkezelő rendszer</span>
        </li>
        
        {!user && (
         <>
            <li><Link to="/login">Bejelentkezés</Link></li>
            <li><Link to="/signup">Regisztráció</Link></li>            
         </>
         )}
         {user && (
            <li>
                {!isPending && <button className="btn" onClick={logout}>Kijelentkezés</button>}
                {isPending && <button className="btn" disabled>Folyamatban</button>}
           </li>
      )}
    </ul>
  </nav>
  )
}
