import React from 'react'
import './Admin.css'
import { Link } from 'react-router-dom'


export default function Admin() {
  window.scrollTo(0, 0)
  return (
    <div>
     <>
     <div className='list'>
      <div className="card"><p ><Link to="/regisztráció">Kollégák regisztrációja</Link></p> </div>
      <div className="card"><p><Link to="/bombeállítás">Bom lista készítése</Link></p> </div>
      <br/>
      <div className="card"> <p><Link to="/anyagfelvitel">Anyagok felvitele</Link></p> </div>
      <div className="card">  <p><Link to="/mrpbeállítás">MRP szintek beállítása</Link></p> </div>
      <br/>
      <div className="card">  <p><Link to="/bejövőanyag">Beérkező anyagok</Link></p> </div>
      <div className="card">  <p><Link to="/kimenőanyag">Kimenő anyagok</Link></p> </div>
      <br/>     
      <div className="card">  <p><Link to="/segédletupload">Segédletek feltöltése</Link></p> </div>
      <div className="card">  <p><Link to="/anyagrendelés">Anyagrendelési lista</Link></p> </div>
      <br/> 
      <div className="card">  <p><Link to="/kollégák">Kollégák nyilvántartása</Link></p> </div>
      <div className="card">  <p><Link to="/napló">Napló</Link></p> </div>
     </div>
     </>

    </div>
  )
}
