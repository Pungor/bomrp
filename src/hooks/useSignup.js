import { useState, useEffect } from 'react'
import { projectAuth, projectStorage, projectFirestore } from '../firebase/config'
import { useAuthContext } from './useAuthContext'
import { useLog } from './useLog'

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()
  const {logging}= useLog()

  const signup = async (email, password, chooseUser, displayName, thumbnail) => {
    setError(null)
    setIsPending(true)
    let userId=''
  
    try {
      // signup
      const res = await projectAuth.createUserWithEmailAndPassword(email, password)

      if (!res) {
        throw new Error('Could not complete signup')
      }

      // upload user thumbnail
      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`
      const img = await projectStorage.ref(uploadPath).put(thumbnail)
      const imgUrl = await img.ref.getDownloadURL()

      // add display AND PHOTO_URL name to user
      await res.user.updateProfile({ displayName, photoURL: imgUrl })

      // create a user document
      await projectFirestore.collection('users').doc(res.user.uid).set({ 
        online: false,
        displayName,
        photoURL: imgUrl,
        emailName:email,
        chooseUser:chooseUser,
      
      })
      userId=res.user.email
      //userId =res.user.uid
      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
      logging(userId, new Date(), "kolléga regisztrálása")
    } 
    catch(err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
        logging(userId, new Date(), "sikertelen regisztráció")
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { signup, error, isPending }
}