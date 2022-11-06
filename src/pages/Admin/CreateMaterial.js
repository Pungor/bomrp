import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useFirestore } from '../../hooks/useFirestore'



import './CreateMaterial.css'


export default function CreateMaterial() {

  const [materialName, setMaterialName] = useState('')
  const [materialId, setMaterialId] = useState('')
  const [materialDate, setMaterialDate] = useState('')
  const [materialStatus, setMaterialStatus] = useState('')
  const [volType, setVolType] = useState('')
  const inventoryCode='0101'
  const materialIn=''
  const materialOut=''
  const volumen=0


  const {addDocument} = useFirestore('materiallist')

  const history = useHistory()

  
  const handleSubmit = async(e) => {
    e.preventDefault()

    await addDocument({
      material:materialName,
      id:materialId,
      date:materialDate,
      status:materialStatus,
      volType: volType,
      inventoryCode:inventoryCode,
      materialIn:materialIn,
      materialOut:materialOut,
      volumen:volumen,
    })
      setMaterialDate('')
      setMaterialId('')
      setMaterialName('')
      setVolType('')
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
