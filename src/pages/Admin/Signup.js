import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'
import { useHistory } from 'react-router-dom'

// styles
import './Signup.css'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailError, setThumbnailError] = useState(null)
  const { signup, isPending, error } = useSignup()
  const history = useHistory()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email, password, displayName, thumbnail)
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
      <h2>Kolléga regisztrációja</h2>
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
        <span>Fénykép hozzáadása</span>
        <input 
          required
          type="file"
          onChange={handleFileChange}
        />
        {thumbnailError && <div className="error">{thumbnailError}</div>}
      </label>
      {!isPending && <button className="btn">Regisztráció</button>}
      {isPending && <button className="btn" disabled>Folyamatban</button>}
      {error && <div className="error">{error}</div>}
    </form>
  )
}
