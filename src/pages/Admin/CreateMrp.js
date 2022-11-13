import { useEffect, useState } from "react"
import {  projectFirestore} from "../../firebase/config"
import { useHistory } from 'react-router-dom'
import './CreateMrp.css'

export default function CreateMrp() {

  //window.scrollTo(0, 0)
  const [info,setInfo] = useState([])
  const [docId, setDocId]=useState([])
  const history = useHistory()
  const updateMaterial= projectFirestore.collection('materiallist')
  
  const [materialName,setMaterialName] = useState('')
  const [minimum,setMinimum] = useState('')
  const [maximum,setMaximum] = useState('')
  const [reorder,setReorder] = useState('')
  const [orderQuantity,setOrderQuantity] = useState('')

  let phMin=()=>{
    for(var i=0;i<info.length;i++){
      if(info[i].material===materialName){

       return info[i].securityInvLevel

      }
    }
  }

  let phMax=()=>{
    for(var i=0;i<info.length;i++){
      if(info[i].material===materialName){

       return info[i].maxInvLevel

      }
    }
  }
  let phReorder=()=>{
    for(var i=0;i<info.length;i++){
      if(info[i].material===materialName){

       return info[i].reorderPoint

      }
    }
  }
  let phOrderQuantity=()=>{
    for(var i=0;i<info.length;i++){
      if(info[i].material===materialName){

       return info[i].orderQuantity

      }
    }
  }
 

  useEffect(()=>{
    projectFirestore.collection('materiallist')
      .get().then((querySnapshot)=>{
        querySnapshot.forEach(element=>{
          var data = element.data();
          var dataId=element.id
          setInfo(arr => [...arr , data])
          setDocId(arr2 => [...arr2 , dataId])
        
          })
        
      })
    
  }, [])
  const handleSubmit = (e) => {
    e.preventDefault()

    for(var i=0;i<info.length;i++){
     if(info[i].material===materialName){

 
       updateMaterial.doc(docId[i]).update({
        maxInvLevel:parseInt(maximum), 
        orderQuantity:parseInt(orderQuantity), 
        reorderPoint:parseInt(reorder), 
        securityInvLevel:parseInt(minimum),}  
       )

    }
  }
    history.push('/admin')


  }

  return (
    <div className="create">
      <h2 className="page-title">MRP szintek beállítása</h2>
      <form onSubmit={handleSubmit}>
        <label>
        <span>Anyag kiválasztása</span>
          <select id='chooseMaterial' onChange={(e)=>setMaterialName(e.target.value)

                }>    
            <option defaultValue={"-"}>-</option>  
              {info.map(info=>(
            <option key={info} value={info.material} >{info.material}</option>                    
                        ))}       
          </select>
        </label>      
        <label>
        <span>Minimális készlet:</span>
        <input 
          type="number" min="0" 
          onChange={(e) => setMinimum(e.target.value)}
          value={minimum}
          placeholder={phMin()}

          
        />
        </label>
        <label>
        <span>Maximális készlet:</span>
        <input 
          type="number" min="0" 
          onChange={(e) => setMaximum(e.target.value)}
          value={maximum}
          placeholder={phMax()}
          
        />
        </label>
        <label>
        <span>Jelzőkészlet szint:</span>
        <input 
          type="number" min="0" 
          onChange={(e) => setReorder(e.target.value)}
          value={reorder}
          placeholder={phReorder()}
          
        />
        </label>
        <label>
        <span>Rendelési tételnagyság:</span>
        <input 
          type="number" min="0" 
          onChange={(e) => setOrderQuantity(e.target.value)}
          value={orderQuantity}
          placeholder={phOrderQuantity()}
          
        />
        </label>
        <button className="btn">Módosít</button>
      </form>
  </div> 
  )

}
