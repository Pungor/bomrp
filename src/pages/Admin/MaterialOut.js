import { useEffect, useState } from "react"
import {  projectFirestore} from "../../firebase/config"
import { useFirestore } from '../../hooks/useFirestore'
import { useHistory } from 'react-router-dom'

import './MaterialOut.css'

export default function MaterialOut() {
  window.scrollTo(0, 0)
  const [materialName,setMaterialName] = useState('')
  const [volumen,setVolumen] = useState('') 
  const [code,setCode] = useState('') 
  const [info,setInfo] = useState([])
  const [infoOrder,setInfoOrder] = useState([])
  const [docId, setDocId]=useState([])
  const [collId, setCollId]=useState([])
  const [materials, setMaterials] = useState([])

  const history = useHistory()
  const updateMaterial= projectFirestore.collection('materiallist')
  const updateCollMaterial= projectFirestore.collection('collageues')
  const [orderError, setOrderError] = useState("")


  const handleSubmit = async(e) => {
    e.preventDefault()
    for(var i=0;i<info.length;i++){
      if(info[i].material===materialName){
        if(info[i].volumen-volumen>0){
          updateMaterial.doc(docId[i]).update({
         
            volumen:info[i].volumen-volumen
             }  
          )
          for(var j=0;j<infoOrder.length;j++){
            if(infoOrder[j].filter(filt=>filt.includes("collMaterial"))){
              infoOrder[j].filter(filt=>filt.includes("collMaterial")).map(info=>{
                if(info.collMaterial.materialName===materialName && info.invCode===code){
                  let  feVolumen=0
                  feVolumen=parseInt(info.volumen)+parseInt(volumen)
                   materials.push({volumen:feVolumen, materialName:materialName})
                 
                }
                else{
                  materials.push(info)
                } 
              return materials
              })
              updateCollMaterial.doc(collId[j]).update({
          
                collMaterial:materials,
                  }  
                )
              }else{
                let  feVolumen=0
                feVolumen=parseInt(volumen)
                 materials.push({volumen:feVolumen, materialName:materialName})
                 updateCollMaterial.doc(collId[j]).update({
          
                  collMaterial:materials,
                    }  
                  )
                history.push('/admin')
              }

            }
         
             
        }else{
          
          setOrderError("Túl nagy értéket adtál meg, ellenőrizd a raktárkészletet!")
           // history.push('/admin')
        }
  

 
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
      projectFirestore.collection('collageues')
      .get().then((querySnapshot)=>{
        querySnapshot.forEach(collElement=>{
          var data = collElement.data();
          var coll = collElement.id;
          setInfoOrder(arr => [...arr , data])
          setCollId(arr2 => [...arr2 , coll])

        
          })
        
      })
  }, [])

  return (
    
    <div className="materialOut">
    <h2 className="page-title">Beérkező anyagok könyvelése</h2>
    <form onSubmit={handleSubmit}>


      <label>
        <span>Anyag kiválasztása</span>
        <select id='chooseMaterial' required onChange={(e)=>setMaterialName(e.target.value)}>    
        <option defaultValue={"-"}>-</option>  
          {info.map(info=>(
             <option key={info} value={info.material}>{info.material}</option>                    
                    ))}       
        </select>
      </label>
      <label>
        <span>Anyag áttárolási helye (0101-es raktárhelyről)</span>
          <select id='chooseCode' required onChange={(e)=>setCode(e.target.value)}>    
            <option defaultValue={"-"}>-</option>  
            {infoOrder.filter(filt=>filt.invCode.includes("7")).map(info=>(
             <option key={info} value={info.invCode}>{info.invCode}</option>                    
                    ))}      
          </select>
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
      {orderError!=="" && <div className="error">{orderError}</div>}
    </form>
  </div>
  )
}