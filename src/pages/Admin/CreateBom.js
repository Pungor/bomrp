import { useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { useFirestore } from '../../hooks/useFirestore'
import {  projectFirestore, projectAuth} from "../../firebase/config"
import { useLog } from '../../hooks/useLog'

// styles
import './CreateBom.css'

export default function CreateBom() {  
  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [materials, setMaterials] = useState([])
  const [volumenType, setVolumenType] = useState('')
  const [volumen, setVolumen] = useState('')
  const [newMaterial, setNewMaterial] = useState('')
  const [info,setInfo] = useState([])
  const [bomLoggingId,setBomLoggingId] = useState([])
  const {logging}= useLog()
 
  const { addDocument } = useFirestore('bom')
  const history = useHistory()
  //const { uid } = projectAuth.currentUser

  useEffect(()=>{
    projectFirestore.collection('materiallist')
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
          setBomLoggingId(arr => [...arr , data])
         
          })
        
      })
    
  }, [])
  
  const handleSubmit = () => {
   
   
    addDocument({
        material:materials,
        bomName:title,
        note:method,

    })
    logging(projectAuth.currentUser.email, new Date(), "bom létrehozva", bomLoggingId.length)
    history.push('/admin')
    setMaterials("")
  }
  let text=""
  const list=()=>{

    text=(" " + volumen + " " + volumenType + " " + newMaterial)
    
    
    return text
  }


  const handleAdd = (e) => {
    e.preventDefault()
   
   materials.push({volumen,volumenType, newMaterial})
    //list()
    setNewMaterial("")
    setVolumen("")
    setVolumenType("")
    
    console.log(materials)

  }

  
  return (
    <div className="create">
      <h2 className="page-title">"Termékjegyzék": BOM lista készítése</h2>
      <form onSubmit={handleSubmit}>

        <label>
          <span>Bom neve</span>
          <input 
            type="text" 
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        <label>
          <span>Szükséges anyagok</span>
          <div className="ingredients">
            <select id='chooseMaterial' onChange={(e)=>setNewMaterial(e.target.value)}>    
              <option defaultValue={"-"}>-</option>  
                {info.map(info=>(
                  <option key={info} value={info.material}>{info.material}</option>                    
                          ))}       
              </select>
           </div>
        </label>
        <label>
          <span>Mértékegység:</span>
          <input 
            type="text" 
            onChange={(e) => setVolumenType(e.target.value)}
            value={volumenType}
             
          />
        </label>
      
        <label>
          <span>Mennyiség:</span>
          <input 
            type="number" min="0" 
            onChange={(e) => setVolumen(e.target.value)}
            value={volumen}
             
          />
        </label>
        <button onClick={handleAdd} className="btn">Hozzáad</button>
        <p>Anyaglista: {list()}</p>
        <label>
          <span>Megjegyzések</span>
          <textarea 
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>

        <button className="btn">Rögzítés</button>
      </form>
    </div>
  )
}
