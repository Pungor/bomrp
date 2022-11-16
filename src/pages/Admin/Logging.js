import { useEffect, useState } from "react"
import {  projectFirestore} from "../../firebase/config"
import './Logging.css'
import { projectAuth} from "../../firebase/config"
import { useHistory } from 'react-router-dom'

export default function Logging() {
  window.scrollTo(0, 0)
  const [info , setInfo] = useState([]);
  const history = useHistory()

  useEffect(()=>{
    projectFirestore.collection('logging')
      .get().then((querySnapshot)=>{
        querySnapshot.forEach(element=>{
          var data = element.data();
          setInfo(arr => [...arr , data])
         
          })
        
      })
     
  }, [])

  let permission=false
 
if(projectAuth.currentUser.email==="admin@gmail.com"){
   permission=true
}else if(projectAuth.currentUser.email==="zoltan.pungor@gmail.com"){
  permission=true
}

if(!permission){
  // logging(projectAuth.currentUser.email, new Date(), "oldal megtekintéséhez nincs jog") 
   history.push('/admin')
  
 }
  return (
    <div className="logging">

   
            <table  key={info.id}>
              <caption>Felhasználói tevékenységek</caption>
              <thead className="header">
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
