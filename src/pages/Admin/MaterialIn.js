import { useEffect, useState } from "react"
import {  projectFirestore} from "../../firebase/config"
import { useFirestore } from '../../hooks/useFirestore'
import { useHistory } from 'react-router-dom'
import './MaterialIn.css'

export default function MaterialIn() {
  
  window.scrollTo(0, 0)
  const [materialName,setMaterialName] = useState('')
  const [volumen,setVolumen] = useState('')  
  const {addDocument} = useFirestore('incomingMaterial')
  const history = useHistory()

  var updateVolumen=null
  const [incoming,setIncoming] = useState([])
  const [info,setInfo] = useState([])

  //const [docId, setDocId]=useState([])
  const updateMaterial= projectFirestore.collection('materiallist')

  useEffect(()=>{
    projectFirestore.collection('materiallist')
      .get().then((querySnapshot)=>{
        querySnapshot.forEach(element=>{
          var data = element.data();
          setInfo(arr => [...arr , data])
         
          })
        
      })
      projectFirestore.collection('incomingMaterial')
      .get().then((querySnapshot)=>{
        querySnapshot.forEach(element=>{
          var data = element.data();
          setIncoming(arr => [...arr , data])
         
          })
        
      })
    
  }, [])
//console.log(incoming)
  const handleSubmit = async(e) => {
    e.preventDefault()

    await addDocument({
      materialName:materialName,
      volumen: parseInt(volumen),
      invCode:'0101',
      materialDate: new Date(),
    })   
//update the material volumen in materiallist
    updateVolumen+=parseInt(volumen)
    incoming.forEach(incoming=>{
      if(materialName===incoming.materialName){
       updateVolumen+=parseInt(incoming.volumen)
    }})
  //to get the doc.id for looping through each materials, and update the right material volumen
     updateMaterial.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
         //setDocId(doc.id)
         // console.log(doc.id)
          incoming.forEach(incoming=>{
            if(materialName===incoming.materialName){
            // updateVolumen+=parseInt(incoming.volumen)
            updateMaterial.doc(doc.id).update({volumen:updateVolumen})
          }})
            console.log(updateVolumen)
         // updateMaterial.doc(doc.id).update({volumen:updateVolumen})
      })})

   // console.log(updateVolumen)
     history.push('/admin')

  }

  return (
    
    
    <div className="materialIn">
    <h2 className="page-title">Beérkező anyagok könyvelése</h2>
    <form onSubmit={handleSubmit}>


      <label>
        <span>Anyag kiválasztása</span>
        <select id='chooseMaterial' onChange={(e)=>setMaterialName(e.target.value)}>    
        <option defaultValue={"-"}>-</option>  
          {info.map(info=>(
             <option key={info} value={info.material}>{info.material}</option>                    
                    ))}       
        </select>
      </label>
      <label>
        <span>Anyag betárolási helye</span>
        <span className="code">0101</span>
      </label>
   
        <label>
          <span>Mennyiség</span>
          <input 
            type="number" min="1"
            onChange={(e) => setVolumen(e.target.value)}
            value={volumen}
            required
          />
        </label>


      <button className="btn">Rögzítés</button>
    </form>
  </div>
  )
}
