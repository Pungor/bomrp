import { useEffect, useState } from "react"
import {  projectFirestore} from "../../firebase/config"
import './MaterialUsed.css'

export default function MaterialUsed() {
  window.scrollTo(0, 0)
  const [info , setInfo] = useState([]);
  
  const indexing=(a, b)=>{
    return b.usedId - a.usedId;
  }
  
  useEffect(()=>{
    projectFirestore.collection('materialUsed')
      .get().then((querySnapshot)=>{
        querySnapshot.forEach(element=>{
          var data = element.data();
          setInfo(arr => [...arr , data])
         
          })
        
      })
     
  }, [])
console.log(info)
  return (
    <div className="used">

   
    <table >
      <caption>Felhasznált anyagok </caption>
      <thead>
        <tr>
          <th>Anyag megnevezése</th>
          <th>Mennyiség</th>
          <th>Mértékegység</th>
          <th>Melyik raktárhelyre</th>
          <th>Ok</th>
          <th>Dátum</th>
          <th>Könyvelte</th>

        </tr>
      </thead>
      
      {info.sort(indexing).map(info => (
      <tbody key={info}>
        <tr>
          <td>{info.usedMaterial}</td>
          <td>{info.usedVolumen}</td>
          <td>{info.usedVolumenType}</td>
          <td>{info.usedInventory}</td>
          <td>{info.usedGoal}</td>
          <td>{info.usedDate.toString()}</td>
          <td>{info.usedOperator}</td>
        </tr>
      </tbody>
  )          
  )}

    </table>
 


</div>
  )
}
