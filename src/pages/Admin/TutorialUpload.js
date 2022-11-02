import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { projectStorage} from "../../firebase/config"
import './TutorialUpload.css'

export default function TutorialUpload() {

  const [errorMessage, setErrorMessage] = useState(null)
  const[tutorial, setTutorial]=useState(null)
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
     
      const uploadPath = `tutorial/${tutorial.name}`
      const img =  projectStorage.ref(uploadPath).put(tutorial)
    //  const imgUrl = img.ref.getDownloadURL()
 
    // window.location.reload(false)
    setTutorial(null)
    
     history.push('/admin')
 
  }


  const handleFileChange = (e) => {
    setErrorMessage(null)
    setTutorial(null)
    let selected = e.target.files[0]


    if (!selected) {
      setErrorMessage('Válassz dokumentumot magadnak!')
      return
    }
   /* if (!selected.type.includes('image')) {
      setErrorMessage('Fényképet kell választani!')
      return
    }
    if (selected.size > 100000) {
      setErrorMessage('A fénykép mérete kevesebb kell, hogy legyen, mint 100kb')
      return
    }
    */
    setTutorial(selected)
  
   
  }

  return (
    <div className="tuts">
      <h2 className="page-title">Segédletek, információk feltöltése</h2>
      <form onSubmit={handleSubmit}>

        <label>
          <span>Dokumentum neve:</span>
          <input 
            type="file" 
            onChange={handleFileChange}
            required
          />
        </label>
        <button className="btn">Rögzítés</button>
        {errorMessage && <div className="error">{errorMessage}</div>}
      </form>
    </div>
  )
}
