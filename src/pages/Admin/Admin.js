import React from 'react'
import './Admin.css'
import { Link } from 'react-router-dom'


export default function Admin() {
  
  return (
    <div>
     <>
     <p><Link to="/signup">Regisztráció</Link></p> 
     <p><Link to="/createbom">Bom lista készítése</Link></p> 
     </>
    <p>BOM</p>
    <p>MRP</p>
    </div>
  )
}
