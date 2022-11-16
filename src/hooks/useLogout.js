import { useEffect, useState } from 'react'
import { projectAuth, projectFirestore } from '../firebase/config'
import { useAuthContext } from './useAuthContext'
import { useLog } from './useLog'

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()
  const {logging}= useLog()
 
  
  const logout = async () => {
    setError(null)
    setIsPending(true)
    const { uid } = projectAuth.currentUser
    try {
      // update online status
     
      await projectFirestore.collection('users').doc(uid).update({ online: false })
      logging(projectAuth.currentUser.email, new Date(), "kijelentkezés")
      // sign the user out
      await projectAuth.signOut()
      
      // dispatch logout action
      dispatch({ type: 'LOGOUT' })

      // update state
      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      } 

    } 
    catch(err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
       logging(projectAuth.currentUser.email , new Date(), "sikertelen kijelentkezés")
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { logout, error, isPending }
}