import { useEffect, useState } from "react"
import {  projectFirestore} from "../../firebase/config"
import { useFirestore } from '../../hooks/useFirestore'
import { useHistory } from 'react-router-dom'
import { projectAuth} from "../../firebase/config"
import { useLog } from '../../hooks/useLog'
import './MaterialIn.css'

export default function MaterialIn() {
  
  window.scrollTo(0, 0)
  const [materialName,setMaterialName] = useState('')
  const [volumen,setVolumen] = useState('')  
  const {addDocument} = useFirestore('incomingMaterial')
  const history = useHistory()
  let updateVolumen=null
  let referenceName=''
  let referenceVolumen=null
  let referenceId=''

  const [info,setInfo] = useState([])
  const [docId, setDocId]=useState([])
  const updateMaterial= projectFirestore.collection('materiallist')
  const {logging}= useLog()
  //const { uid } = projectAuth.currentUser

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
    
  }, [])
  console.log(info)
  const handleSubmit = async(e) => {
    e.preventDefault()

    await addDocument({
      materialName:materialName,
      volumen: parseInt(volumen),
      invCode:'0101',
      materialDate: new Date(),
    })   
    //update the material volumen in materiallist
    updateVolumen+=parseInt(volumen)

     for(var i=0;i<info.length;i++){
      if(info[i].material===materialName){
        referenceName=info[i].material
        referenceVolumen=info[i].volumen
        updateVolumen+=referenceVolumen
        referenceId=docId[i]
        console.log(referenceId)
        updateMaterial.doc(referenceId).update({volumen:updateVolumen})  
      }

     }
     console.log(referenceName)
     console.log(referenceVolumen)
    /*  updateMaterial.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
              updateMaterial.doc(referenceId).update({volumen:updateVolumen})     

        })})*/
     console.log(updateVolumen)
     console.log(updateVolumen)
     logging(projectAuth.currentUser.email, new Date(), "anyag betárolása")
     history.push('/admin')

  }

  return (
    
    
    <div className="materialIn">
    <h2 className="page-title">Beérkező anyagok könyvelése</h2>
    <form onSubmit={handleSubmit}>


      <label>
        <span>Anyag kiválasztása</span>
        <select id='chooseMaterial' onChange={(e)=>setMaterialName(e.target.value)}>    
        <option defaultValue={"-"}>-</option>  
          {info.map(info=>(
             <option key={info} value={info.material}>{info.material}</option>                    
                    ))}       
        </select>
      </label>
      <label>
        <span>Anyag betárolási helye</span>
        <span className="code">0101</span>
      </label>
   
        <label>
          <span>Mennyiség</span>
          <input 
            type="number" min="1"
            onChange={(e) => setVolumen(e.target.value)}
            value={volumen}
            required
          />
        </label>


      <button className="btn">Rögzítés</button>
    </form>
  </div>
  )
}
