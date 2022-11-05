import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useFirestore } from '../../hooks/useFirestore'

import './Collegaue.css'

export default function Collegaue() {
  window.scrollTo(0, 0)

  const [collLastName, setCollLastName] = useState('')
  const [collFirstName, setCollFirstName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [invCode, setInvCode] = useState('')
  const [skills, setSkills] = useState('')
  const [fam, setFam] = useState('')
  const [born, setBorn] = useState('')

  const {addDocument} = useFirestore('collageues')

  const history = useHistory()

 
  const handleSubmit = async(e) => {
    e.preventDefault()
 

   
    await addDocument({
     born: born,
     emailAddress:emailAddress,
     fam: fam,
     firstName:collFirstName,
     invCode: invCode,
     lastName: collLastName,
     skills: skills,
    })
      setCollFirstName('')
      setCollLastName('')
      setEmailAddress('')
      setInvCode('')
      setSkills('')
      setFam('')
      setBorn('')
   
      history.push('/admin')

  }
const collData=()=>{

 history.push('/kolléganyilvántartás')

}

  return (
    <div className="collageue">
    <h2 className="page-title">Kollégák adatainak rögzítése </h2>
    <form onSubmit={collData}> <button className='collbtn' >nyilvántartás</button></form>
   
    <br/>
    <form onSubmit={handleSubmit}>

      <label>
        <span>Kolléga vezetékneve</span>
        <input 
          type="text" 
          onChange={(e) => setCollLastName(e.target.value)}
          value={collLastName}
          required
        />
      </label>
      <label>
        <span>Kolléga keresztneve</span>
        <input 
          type="text" 
          onChange={(e) => setCollFirstName(e.target.value)}
          value={collFirstName}
          required
        />
      </label>
      <label>
        <span>E-mail cím</span>
        <input 
          type="e-mail" 
          onChange={(e) => setEmailAddress(e.target.value)}
          value={emailAddress}
          required
        />
      </label>

      <label>
        <span>Raktárhely kódja:</span>
        <input 
          type="text" 
          onChange={(e) => setInvCode(e.target.value)}
          value={invCode}
          required
        />
      </label>
      <label>
        <span>Szakképzettség</span>
        <input 
          type="text" 
          onChange={(e) => setSkills(e.target.value)}
          value={skills}
          required
        />
      </label>
      <label>
        <span>FAM engedély száma</span>
        <input 
          type="text" 
          onChange={(e) => setFam(e.target.value)}
          value={fam}
          required
        />
      </label>
      <label>
        <span>Születési idő:</span>
        <input 
          type="date" 
          onChange={(e) => setBorn(e.target.value)}
          value={born}
          required
        />
      </label>
      <button className="btn">Rögzítés</button>
    </form>
  </div>
  )
}
