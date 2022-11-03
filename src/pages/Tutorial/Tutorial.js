import { useState, useEffect } from 'react'
import './Tutorial.css'
import { projectFirestore} from "../../firebase/config"


export default function Tutorial() {
  const [info, setInfo] = useState([]);
  const [Url, setUrl] = useState([]);
 
  useEffect(()=>{

  // let fileurl="bomrp-2dd1f.appspot.com/"
        projectFirestore.collection('files')
        .get().then((querySnapshot)=>{
          querySnapshot.forEach(element=>{
            var data = element.data();
            setInfo(arr => [...arr , data.fileName])
            setUrl(arr => [...arr , data])
            })
          
        })

  }, [])

      console.log(Url)
      console.log(info)

  return (
 
    <div className="tutorial">
      <div className='tutorialcard'>
        {
          Url.map(element=>{
           return <div key={element} className="card">            
                <a href={element.fileUrl}>{element.fileName}</a> 
              </div>
          })
        }
      </div>
    </div>
   
  )
}
