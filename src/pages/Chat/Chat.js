import { useEffect, useState } from "react"
import { timestamp, projectFirestore} from "../../firebase/config"
import { useAuthContext } from "../../hooks/useAuthContext"
import Avatar from "../../components/Avatar"
import './Chat.css'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export default function Chat({ project }) {
  const { user } = useAuthContext()

  const [newComment, setNewComment] = useState('')
  const [info , setInfo] = useState([]);
  



  const handleSubmit = async (e) => {
    e.preventDefault();
   
    await projectFirestore.collection('messages').doc().set({ 
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random()
    })
    setNewComment('')
  
  }

  useEffect(()=>{
    projectFirestore.collection('messages')
      .get().then((querySnapshot)=>{
        querySnapshot.forEach(element=>{
          var data = element.data();
          setInfo(arr => [...arr , data])
          })
      })
     
  }, [])


  return (
    <div className="project-comments">
        <div className="project-form">
          <form className="add-comment" onSubmit={handleSubmit}>
            <label>
              <span>Üzenet</span>
              <textarea 
                onChange={(e) => setNewComment(e.target.value)}
                value={newComment}
              ></textarea>
            </label>
           <button className="btn">Elküld</button>
          </form>
          <br/>
        </div>
        <div>
            <h4>Üzenetek</h4>
            <ul>
              {info.map(info => (
                <li key={info.id}>
                  <div className="comment-author">
                    <Avatar src={info.photoURL} />
                    <p>{info.displayName}</p>
                  </div>
                  <div className="comment-date">
                   <p>{formatDistanceToNow(info.createdAt.toDate(), {addSuffix: true})}</p>
                  </div>
                  <div className="comment-content">
                    <p>{info.content}</p>
                  </div>

                </li>
              ))}
            </ul>
        </div>

    </div>
  )
  }