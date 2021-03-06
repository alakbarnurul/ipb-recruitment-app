import { useState, useEffect } from 'react'
import axios from 'axios'

const useCurrentUser = () => {
  // Notes : Untuk menghindari flicker (rendering dua kali) ketika berganti pages di Next.js jadi menggunakan tiga state
  // State pertama adalah null, state ini digunakan untuk loading
  // State kedua ada dua nilai undefined/data asli
  // Jika undefined tampilkan page public, jika data aktual maka tampilkan page private
  const [currentUser, setCurrentUser] = useState(null)
  const [currentAuthToken, setCurrentAuthToken] = useState(null)
  const [isError, setIsError] = useState(false)
  const [logout, setLogout] = useState(false)
  useEffect(() => {
    const restoredUser = JSON.parse(localStorage.getItem('current-user'))
    const restoredToken = localStorage.getItem('auth-token')
    const tokenVerification = async () => {
      await axios
        .post('/api/auth', { clientToken: restoredToken })
        .then(response => console.log(response))
        .catch(error => {
          console.log(error.response)
          setIsError(true)
        })
    }
    if (!restoredUser || !restoredToken || isError || logout) {
      // Notes : Clear storage to avoid bugs/error
      // Fix/Bugs : Clear cookies also
      localStorage.setItem('current-user', null)
      localStorage.setItem('auth-token', null)
      // Notes : setTimeout digunakan untuk UX, sehingga keitka loading (state = null) maka ada tampilannya
      const setToUndefined = setTimeout(() => {
        setCurrentUser(undefined)
        setCurrentAuthToken(undefined)
      }, 850)
      return () => {
        clearTimeout(setToUndefined)
      }
    }
    // Notes : setTimeout digunakan untuk UX, sehingga ketika loading (state = null) maka menampilkan loading
    const setUserData = setTimeout(() => {
      setCurrentUser(restoredUser)
      setCurrentAuthToken(restoredToken)
    }, 850)
    tokenVerification()
    return () => {
      clearTimeout(setUserData)
    }
  }, [isError, logout])

  return { currentUser, currentAuthToken, isError, setLogout }
}

export default useCurrentUser
