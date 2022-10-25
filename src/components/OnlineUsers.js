import { useCollection } from '../hooks/useCollection'


import Avatar from './Avatar'
import './OnlineUsers.css'

export default function OnlineUsers() {
  const { isPending, error, documents } = useCollection('users')

  return (
    <div className="user-list">
      <h2>Kollégák</h2>
      {isPending && <div>Kollégák neveinek betöltése</div>}
      {error && <div>{error}</div>}
      {documents && documents.map(user => (
        <div key={user.id} className="user-list-item">
          {user.online && <span className="online-user"></span>}
          <span>{user.displayName}</span>
          <Avatar src={user.photoURL} />
        </div>
      ))}
    </div>
  )
}
