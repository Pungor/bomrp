import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'


// styles
import './Login.css'

export default function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, isPending } = useLogin()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)

  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Bejelentkezés</h2>
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
        <span>jelszó:</span>
        <input 
          required
          type="password" 
          onChange={(e) => setPassword(e.target.value)} 
          value={password} 
        />
      </label>
      {!isPending && <button className="btn">Bejelentkezés</button>}
      {isPending && <button className="btn" disabled>Folyamatban</button>}
      {error && <div className="error">{error}</div>}
    </form>
  )
}
