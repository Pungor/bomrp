import { useEffect, useState } from "react"
import {  projectFirestore} from "../../firebase/config"
import './OrderedMaterial.css'

export default function OrderedMaterial() {

    const [infoOrder , setInfoOrder] = useState([])

    useEffect(()=>{

          projectFirestore.collection('order')
          .get().then((querySnapshot)=>{
            querySnapshot.forEach(element=>{
              var data = element.data();
              setInfoOrder(arr => [...arr , data])

            
              })
            
          })
      }, [])
    
  return (
    <div className="ordered">

   
    <table>
      <caption>Anyagrendelési lista</caption>
      <thead>
        <tr>
          <th>Anyag kódja</th>
          <th>Anyag</th>
          <th>Mennyiség</th>
          <th>Mértékegység</th>
          <th>Státusz</th>
          <th>Rendelési dátum</th>
          <th>Rendelő</th>
        </tr>
      </thead>
      
      {infoOrder.map(element => (
      <tbody >
        <tr key={element}>
          <td >{element.tempMaterialId}</td>
          <td >{element.tempMaterial}</td>
          <td >{element.tempVolumen}</td>
          <td >{element.tempVolType}</td> 
          <td >{element.tempStatus}</td>           
          <td >{element.tempDate}</td>  
          <td >{element.tempUser}</td>  

        </tr>
      </tbody>
      )    
  )}

    </table>


</div>
  )
}
