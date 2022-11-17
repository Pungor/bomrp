import { useState, useEffect } from 'react'
import './Tutorial.css'
import { projectFirestore} from "../../firebase/config"
import Pdf from "../../assets/Szakdolgozat prezentacio Pungor Zoltán p0xw7f.pdf"
import Pdf2 from "../../assets/hmke.pdf"
import Pdf3 from "../../assets/szerelesi-utasitas.pdf"

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

/*
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

*/

const pdfShow=(prop)=>{
  if(prop==="hmke.pdf"){
    return Pdf2
  }else if(prop==="szerelesi-utasitas.pdf"){
      return Pdf3
    }else{
      return Pdf
    }
  }
  return (
 
    <div className="tutorial">
      <div className='tutorialcard'>
        {
          Url.map(element=>{
            return <div key={element} className="card">    
           
            <a href={pdfShow(element.fileName)}>{element.fileName}</a> 
 
              </div>
          })
        }
      </div>
    </div>
   
  )
}