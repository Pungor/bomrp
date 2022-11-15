import { useState, useEffect } from 'react'
import { projectAuth, projectFirestore } from '../firebase/config'
import { useAuthContext } from './useAuthContext'
import { useLog } from './useLog'

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()
  const {logging}= useLog()

  const login = async (email, password) => {
    setError(null)
    setIsPending(true)
    let userId=''
    try {
      // login
      const res = await projectAuth.signInWithEmailAndPassword(email, password)

      // update online status
      const documentRef = projectFirestore.collection('users').doc(res.user.uid)
      await documentRef.update({ online: true })
      userId=res.user.uid
      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
      logging(userId, new Date(), "bejelentkezés")
    } 
    catch(err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
        logging(userId, new Date(), "sikertelen bejelentkezés")
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { login, isPending, error }
}