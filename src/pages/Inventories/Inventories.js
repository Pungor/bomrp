import { useEffect, useState } from "react"
import {  projectFirestore} from "../../firebase/config"
import './Inventories.css'

export default function Inventories() {

  window.scrollTo(0, 0)
  const [info , setInfo] = useState([]);

  useEffect(()=>{
    projectFirestore.collection('materiallist')
      .get().then((querySnapshot)=>{
        querySnapshot.forEach(element=>{
          var data = element.data();
          setInfo(arr => [...arr , data])
         
          })
        
      })
     
  }, [])


  return (
    <div className="inventories">

   
      <table  key={info.id}>
        <caption>Raktárkészlet lista </caption>
        <thead>
          <tr>
           <th>Raktárhely kódja</th>
            <th>Anyag kódja</th>
            <th>Anyag megnevezése</th>
            <th>Mennyiség</th>
            <th>Mértékegység</th>
          </tr>
        </thead>
        
        {info.map(info => (
        <tbody>
          <tr>
            <td >{info.inventoryCode}</td>
            <td >{info.materialId}</td>
            <td >{info.material}</td>
            <td >{info.volumen}</td>
            <td >{info.volType}</td>
          </tr>
        </tbody>
    )          
    )}

      </table>
   


</div>
  )
}
