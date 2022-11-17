import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useFirestore } from '../../hooks/useFirestore'
import { projectAuth, projectFirestore} from "../../firebase/config"
import { useLog } from '../../hooks/useLog'


import './CreateMaterial.css'


export default function CreateMaterial() {

  const [materialName, setMaterialName] = useState('')
  const [materialId, setMaterialId] = useState('')
  const [materialDate, setMaterialDate] = useState('')
  const [materialStatus, setMaterialStatus] = useState('')
  const [volType, setVolType] = useState('')
  const inventoryCode='0101'
  const volumen=0
  const {logging}= useLog()
  //const { uid } = projectAuth.currentUser

  const {addDocument} = useFirestore('materiallist')
  const [createLoggingId , setCreateLoggingId] = useState([]);
  const history = useHistory()

  useEffect(()=>{
    projectFirestore.collection('logging')
      .get().then((querySnapshot)=>{
        querySnapshot.forEach(element=>{
          var data = element.data();
          setCreateLoggingId(arr => [...arr , data])
         
          })
        
      })
     
  }, [])

  const handleSubmit = async(e) => {
    e.preventDefault()

    await addDocument({
      material:materialName,
      materialId:materialId,
      certifyDate:materialDate,
      status:materialStatus,
      volType: volType,
      inventoryCode:inventoryCode,
      volumen:volumen,
      maxInvLevel:0,
      orderQuantity:0,
      reorderPoint:0,
      securityInvLevel:0,
      orderedVolumen:0,
      
    })
      setMaterialDate('')
      setMaterialId('')
      setMaterialName('')
      setVolType('')
      
      logging(projectAuth.currentUser.email, new Date(), "új anyag létrehozva", createLoggingId.length)
      history.push('/admin')
  }



  return (
    <div className="create">
      <h2 className="page-title">Új anyag rögzítése</h2>
      <form onSubmit={handleSubmit}>

        <label>
          <span>Anyag neve</span>
          <input 
            type="text" 
            onChange={(e) => setMaterialName(e.target.value)}
            value={materialName}
            required
          />
        </label>
        <label>
          <span>Anyag azonosítója</span>
          <input 
            type="text" 
            onChange={(e) => setMaterialId(e.target.value)}
            value={materialId}
            required
          />
        </label>
 
        <label>
          <span>Gyártás/hitelesítés éve</span>
          <input 
            type="text" 
            onChange={(e) => setMaterialDate(e.target.value)}
            value={materialDate}
            required
          
          />
        </label>
        <label>
          <span>Egyedi nyilvántartású (gyári számmal rendelkezik)?</span>
          <select id='statusSelect' onChange={(e)=>setMaterialStatus(e.target.value)}>
            <option value="true" >igen</option> 
            <option value="false" >nem</option>
            <option value="-" selected>-</option>
          </select>
        </label>
        <label>
          <span>Kiszerelési egység</span>
          <select id='volType' onChange={(e)=>setVolType(e.target.value)}>
            <option value="m" >méter</option> 
            <option value="db" >db</option>
            <option value="-" selected>-</option>
          </select>
        </label>

        <button className="btn">Rögzítés</button>
      </form>
    </div>
  )
}
