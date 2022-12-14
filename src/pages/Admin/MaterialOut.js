import { useEffect, useState } from "react"
import {  projectFirestore} from "../../firebase/config"
import { useFirestore } from '../../hooks/useFirestore'
import { useHistory } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import { projectAuth} from "../../firebase/config"
import { useLog } from '../../hooks/useLog'
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
 // const [materials, setMaterials] = useState([])
  //const [materialsUpdate, setMaterialsUpdate] = useState([])
  const history = useHistory()
  const updateMaterial= projectFirestore.collection('materiallist')
 // const updateCollMaterial= projectFirestore.collection('collageues')
  const [orderError, setOrderError] = useState("")
  const [goal, setGoal] = useState("")
  const [used, setUsed] = useState("")
  const [materialOutLoggingId, setMaterialOutLoggingId] = useState("")
  const {addDocument} = useFirestore('materialUsed')
  const { user } = useAuthContext()
  const {logging}= useLog()
  //const { uid } = projectAuth.currentUser



  const handleSubmit = async(e) => {
    e.preventDefault()
    for(var i=0;i<info.length;i++){
      if(info[i].material===materialName){
        if(info[i].volumen-volumen>0){
          updateMaterial.doc(docId[i]).update({
         
            volumen:info[i].volumen-volumen
             }  
           )
           await addDocument({
            usedMaterial:materialName,
            usedVolumen: volumen,
            usedVolumenType:info[i].volType,
            usedGoal:goal,
            usedInventory:code,
            usedDate:new Date().toDateString(),
            usedOperator: user.displayName,
            usedId: used.length+1, 
        
          })
          
        }else{
          
          setOrderError("T??l nagy ??rt??ket adt??l meg, ellen??rizd a rakt??rk??szletet!")
           // history.push('/admin')
        }

     }
    
   }
   logging(projectAuth.currentUser.email, new Date(), "anyagfelhaszn??l??s k??nyvel??se", materialOutLoggingId.length)
   history.push('/admin')
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
      projectFirestore.collection('materialUsed')
      .get().then((querySnapshot)=>{
        querySnapshot.forEach(collElement=>{
          var data = collElement.data();
          setUsed(arr => [...arr , data])


        
          })
        
      })
      projectFirestore.collection('logging')
      .get().then((querySnapshot)=>{
        querySnapshot.forEach(element=>{
          var data = element.data();
          setMaterialOutLoggingId(arr => [...arr , data])
         
          })
        
      })
  }, [])
  const usedMaterial=()=>{
    history.push('/kik??nyvelt')

  }
console.log(collId)
  return (
    
    <div className="materialOut">
    <h2 className="page-title">Felhaszn??land?? anyagok k??nyvel??se</h2>
    <form onSubmit={usedMaterial}> <button  >Kik??nyvelt anyagok</button></form>
    <form onSubmit={handleSubmit}>


      <label>
        <span>Anyag kiv??laszt??sa</span>
        <select id='chooseMaterial' required onChange={(e)=>setMaterialName(e.target.value)}>    
        <option defaultValue={"-"}>-</option>  
          {info.map(info=>(
             <option key={info} value={info.material}>{info.material}</option>                    
                    ))}       
        </select>
      </label>
      <label>
        <span>Anyag ??tt??rol??si helye (0101-es)</span>
          <select id='chooseCode' required onChange={(e)=>setCode(e.target.value)}>    
            <option defaultValue={"-"}>-</option>  
            {infoOrder.filter(filt=>filt.invCode.includes("7")).map(info=>(
             <option key={info} value={info.invCode}>{info.invCode}</option>                    
                    ))}    
              <option value="0101">0101</option>    
          </select>
      </label>
   
        <label>
          <span>Mennyis??g</span>
          <input 
            type="number" min="1"
            onChange={(e) => setVolumen(e.target.value)}
            value={volumen}
            required
          />
        </label>
        <label>
          <span>K??nyvel??s oka</span>
          <div >
            <select id='goal' required onChange={(e)=>setGoal(e.target.value)}>    
              <option defaultValue={"-"}>-</option>  
              <option value="anyagfelhaszn??l??s">anyagfelhaszn??l??s</option> 
              <option value="s??r??lt">s??r??lt</option> 
              <option value="elveszett">elveszett</option> 
  
              </select>
           </div>
        </label>

      <button className="btn">R??gz??t??s</button>
      {orderError!=="" && <div className="error">{orderError}</div>}
    </form>
  </div>
  )
}