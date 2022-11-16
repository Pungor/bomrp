import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'
import { useHistory } from 'react-router-dom'
import { projectAuth} from "../../firebase/config"

// styles
import './Signup.css'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [chooseUser, setChooseUser] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailError, setThumbnailError] = useState(null)
  const { signup, isPending, error } = useSignup()
  const history = useHistory()

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
   
  
  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email, password, chooseUser, displayName, thumbnail)
    
    history.push('/admin')
  }

  const handleFileChange = (e) => {
    setThumbnail(null)
    let selected = e.target.files[0]

    console.log(selected)

    if (!selected) {
      setThumbnailError('Válassz képet magadnak!')
      return
    }
    if (!selected.type.includes('image')) {
      setThumbnailError('Fényképet kell választani!')
      return
    }
    if (selected.size > 100000) {
      setThumbnailError('A fénykép mérete kevesebb kell, hogy legyen, mint 100kb')
      return
    }
    
    setThumbnailError(null)
    setThumbnail(selected)
    console.log('thumbnail updated')
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Kollégák jogosultságainak beállítása</h2>
      <label>
        <span>email:</span>
        <input
          required 
          type="email" 
          onChange={(e) => setEmail(e.target.value)} 
          value={email}
          
        />
      </label>
      <label>
        <span>jelszó</span>
        <input
          required
          type="password" 
          onChange={(e) => setPassword(e.target.value)} 
          value={password}
        />
      </label>
      <label>
        <span>felhasználó név</span>
        <input
          required
          type="text" 
          onChange={(e) => setDisplayName(e.target.value)} 
          value={displayName}
        />
      </label>
      <label>
          <span>szerepkör</span>
          <div >
            <select id='chooseUser' onChange={(e)=>setChooseUser(e.target.value)}>    
              <option defaultValue={"-"}>-</option>  
              <option value="admin">Admin</option> 
              <option value="vezető">Vezető</option> 
              <option value="szerelő">Szerelő</option> 
              <option value="koordinátor">Koordinátor</option> 
              </select>
           </div>
        </label>
      <label>
        <span>Fénykép hozzáadása</span>
        <input 
          required
          type="file"
          onChange={handleFileChange}
        />
        {thumbnailError && <div className="error">{thumbnailError}</div>}
      </label>
      {!isPending && <button className="btn">Indít</button>}
      {isPending && <button className="btn" disabled>Folyamatban</button>}
      {error && <div className="error">{error}</div>}
    </form>
  )
}
