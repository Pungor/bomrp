import { useEffect, useState } from "react"
import {  projectFirestore} from "../../firebase/config"
import './Logging.css'

export default function Logging() {
  window.scrollTo(0, 0)
  const [info , setInfo] = useState([]);

  useEffect(()=>{
    projectFirestore.collection('logging')
      .get().then((querySnapshot)=>{
        querySnapshot.forEach(element=>{
          var data = element.data();
          setInfo(arr => [...arr , data])
         
          })
        
      })
     
  }, [])


  return (
    <div className="logging">

   
            <table  key={info.id}>
              <caption>Felhasználói tevékenységek</caption>
              <thead>
                <tr>
                  <th>Felhasználó azonosító</th>
                  <th>Tevékenység dátuma</th>
                  <th>Tevékenység</th>
                </tr>
              </thead>
              
              {info.map(info => (
              <tbody>
                <tr>
                  <td >{info.userId}</td>
                  <td >{info.logDate}</td>
                  <td >{info.userAction}</td>
                </tr>
              </tbody>
           )          
          )}
  
            </table>
           
        

</div>
  )
}
