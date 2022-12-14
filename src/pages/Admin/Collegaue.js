import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useFirestore } from '../../hooks/useFirestore'
import {  projectFirestore} from "../../firebase/config"
import { projectAuth} from "../../firebase/config"
import { useLog } from '../../hooks/useLog'
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
 // const [materials, setMaterials] = useState([])
  const {logging}= useLog()

  const {addDocument} = useFirestore('collageues')
  const [info,setInfo] = useState([])
  const [collageueId,setCollageueId] = useState([])
  const history = useHistory()

  let permission=false
 
  if(projectAuth.currentUser.email==="admin@gmail.com"){
     permission=true
  }else if(projectAuth.currentUser.email==="zoltan.pungor@gmail.com"){
    permission=true
  }
  
    if(!permission){
     // logging(projectAuth.currentUser.email, new Date(), "oldal megtekintéséhez nincs jog") 
      history.push('/admin')

    }
 
  const handleSubmit = async(e) => {
    e.preventDefault()
 /*let materialName=""
 let volumen=0
 materials.push({materialName, volumen})
*/
    await addDocument({
     born: born,
     emailAddress:emailAddress,
     fam: fam,
     firstName:collFirstName,
     invCode: invCode,
     lastName: collLastName,
     skills: skills,
    // collMaterial:materials
    })
      setCollFirstName('')
      setCollLastName('')
      setEmailAddress('')
      setInvCode('')
      setSkills('')
      setFam('')
      setBorn('')
      logging(projectAuth.currentUser.email, new Date(), "kolléga adatainak megadása", collageueId.length)
      history.push('/admin')

  }
const collData=()=>{

 history.push('/kolléganyilvántartás')

}
useEffect(()=>{
  projectFirestore.collection('users')
    .get().then((querySnapshot)=>{
      querySnapshot.forEach(element=>{
        var data = element.data();
        setInfo(arr => [...arr , data])
       
        })
      
    })
    projectFirestore.collection('logging')
    .get().then((querySnapshot)=>{
      querySnapshot.forEach(element=>{
        var data = element.data();
        setCollageueId(arr => [...arr , data])
       
        })
      
    })
  
}, [])

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

      <select  onChange={(e)=>setEmailAddress(e.target.value)}>    
        <option defaultValue={"-"}>-</option>  
          {info.map(info=>(
             <option key={info} value={info.emailName}>{info.emailName}</option>                    
                    ))}       
        </select>
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
