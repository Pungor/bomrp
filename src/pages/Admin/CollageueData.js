
import { useEffect, useState } from "react"
import {  projectFirestore} from "../../firebase/config"
import './CollageueData.css'

export default function CollageueData() {

    const [info , setInfo] = useState([]);
    
    useEffect(()=>{
       
      projectFirestore.collection('collageues')
        .get().then((querySnapshot)=>{
          querySnapshot.forEach(element=>{
            var data = element.data();
            setInfo(arr => [...arr , data])
          
            })
          
        })
       
    }, [])
 
  return (
    <div className="collageues">
    
        {info.map(info => (
                <div className="card" >
                  
                  <h2>{info.lastName} {info.firstName}</h2>

                  <div className="note">
                    <p>{info.emailAddress}</p>
                    <p>{info.born}</p>  
                    <p>{info.invCode}</p>
                    <p>{info.skills}</p>
                    <p>{info.fam}</p>
                             
                   
                  </div>
                     
                </div>
                
              ))}
      
    
    </div>
  )
}
