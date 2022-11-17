import { useEffect, useState } from "react"
import {  projectFirestore} from "../../firebase/config"
import './MaterialOrder.css'
import { useFirestore } from '../../hooks/useFirestore'
import { useHistory } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import { projectAuth} from "../../firebase/config"
import { useLog } from '../../hooks/useLog'

export default function MaterialOrder() {

  window.scrollTo(0, 0)
  const [info , setInfo] = useState([])
  const [orderMat, setOrderMat]=useState([])
  const [docId, setDocId]=useState([])
  const [orderLoggingId, setOrderLoggingId]=useState([])
  const { addDocument } = useFirestore('order')
  const history = useHistory()
  const [active, setActive] = useState(false);
  const { user } = useAuthContext()
  const updateMaterial= projectFirestore.collection('materiallist')
  const {logging}= useLog()
  //const { uid } = projectAuth.currentUser

  let tempVolumen=0
  let tempMaterial=0
  let tempMaterialId=0
  let tempVolType=0
  let tempStatus='aktív'
  let tempDocId=0

  
  let tdVolumenArray=[{}]

  let tdVolumen=()=>{
    
    for(var i=0;i<info.length;i++){
      tempVolumen=info[i].volumen+info[i].orderedVolumen
      tempMaterial=info[i].material
      tempVolType=info[i].volType
      tempMaterialId=info[i].materialId
      tempDocId=i
   
     

      if(tempVolumen<info[i].reorderPoint){
          while(tempVolumen<info[i].maxInvLevel){
            tempVolumen+=info[i].orderQuantity
            
          }
          tdVolumenArray.push({tempMaterialId,tempMaterial,tempVolumen,tempVolType, tempStatus, tempDocId})
     

    
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
      projectFirestore.collection('order')
      .get().then((querySnapshot)=>{
        querySnapshot.forEach(element=>{
          var data = element.data();
          setOrderMat(arr => [...arr , data])
 
          })
        
      })
      projectFirestore.collection('logging')
      .get().then((querySnapshot)=>{
        querySnapshot.forEach(element=>{
          var data = element.data();
          setOrderLoggingId(arr => [...arr , data])
         
          })
        
      })
     
  }, [])

tdVolumen()

const handleClick=()=>{
  setActive(!active)
  tdVolumenArray.forEach((element)=>{
    if(element.tempStatus!=='rendelve'){
      addDocument({

        tempVolumen:element.tempVolumen,
        tempMaterial:element.tempMaterial,
        tempVolType:element.tempVolType,
        tempMaterialId:element.tempMaterialId,
        tempDate:new Date().toDateString(),
        tempStatus:'rendelve',
        tempUser:user.displayName,
        orderId:orderMat.length+1
      })
      updateMaterial.doc(docId[element.tempDocId]).update({
        orderedVolumen:parseInt(element.tempVolumen),
        }  
       )
    }
   
  })
  logging(projectAuth.currentUser.email, new Date(), "rendelés feladása", orderLoggingId.length)
  history.push('/feladottrendelések')
}
const orders=()=>{
  //logging(projectAuth.currentUser.email, new Date(), "rendelések lekérdezése")
  history.push('/feladottrendelések')

}

  return (
    <div className="order">

   
    <table>
      <caption>Anyagrendelési lista</caption>
      <thead>
        <tr>
          <th>Anyag kódja</th>
          <th>Anyag megnevezése</th>
          <th>Rendelendő mennyiség</th>
          <th>Mértékegység</th>
          <th>Státusz</th>
        </tr>
      </thead>
      
      {tdVolumenArray.map(element => (
      <tbody >
        <tr key={element}>
          <td >{element.tempMaterialId}</td>
          <td >{element.tempMaterial}</td>
          <td >{element.tempVolumen}</td>
          <td >{element.tempVolType}</td> 
          <td >{element.tempStatus}</td>           
      
        </tr>
      </tbody>
      )    
  )}

    </table>
    <button className="btn"  onClick={handleClick} style={{ backgroundColor: active ? "green" : "" }} >Rendelés rögzítése</button>

    <button className="btn"  onClick={orders} >Feladott rendelések</button>

</div>
  )
}


