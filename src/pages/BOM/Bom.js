

import { useEffect, useState } from "react"
import {  projectFirestore} from "../../firebase/config"


import './Bom.css'

export default function Bom() {
 
  const [info , setInfo] = useState([]);

  useEffect(()=>{
    projectFirestore.collection('bom')
      .get().then((querySnapshot)=>{
        querySnapshot.forEach(element=>{
          var data = element.data();
          setInfo(arr => [...arr , data])
         
          })
        
      })
     
  }, [])

  return (
    
    <div className="bom">

        {info.map(info => (
                <div className="card">
                  <h2>{info.bomName}</h2>
                <div key={info.bomName}>

                 <p> <div className="material">
                    {info.material.map(mat=>(
                      <ul key={info.id}>
                        <p>{mat.volumen} {mat.volumenType} {mat.newMaterial}</p>
                      </ul>                    
                    ))}
                  </div>
                  </p>

                  <div className="note">
              
                      <p >Megjegyzés:<br/></p>
                   
                  </div>
                     {info.note}
                </div>
                </div>
              ))}
      
    
    </div>
  )  

}
