import { useState, useEffect } from 'react'

const useCurrentUser = () => {
  // Notes : Untuk menghindari flicker (rendering dua kali) ketika berganti pages di Next.js jadi menggunakan tiga state
  // State pertama adalah null, state ini digunakan untuk loading
  // State kedua ada dua nilai undefined/data asli
  // Jika undefined tampilkan page public, jika data asli maka tampilkan page private
  const [currentUser, setCurrentUser] = useState(null)
  const [currentToken, setCurrentToken] = useState(null)
  useEffect(() => {
    const restoredUser = JSON.parse(localStorage.getItem('current-user'))
    const restoredToken = localStorage.getItem('auth-token')
    if (!restoredUser || !restoredToken) {
      // Notes : Clear storage to avoid bugs/error
      // Fix/Bugs : Clear cookies also
      localStorage.setItem('current-user', null)
      localStorage.setItem('auth-token', null)
      // Notes :setTimeout digunakan untuk UX, sehingga keitka loading (state = null) maka ada tampilannya
      const setToUndefined = setTimeout(() => {
        setCurrentUser(undefined)
        setCurrentToken(undefined)
      }, 850)
      return () => {
        clearTimeout(setToUndefined)
      }
    }
    // Notes : setTimeout digunakan untuk UX, sehingga keitka loading (state = null) maka ada tampilannya
    const setUserData = setTimeout(() => {
      setCurrentUser(restoredUser)
      setCurrentToken(restoredToken)
    }, 850)
    return () => {
      clearTimeout(setUserData)
    }
  }, [currentUser, currentToken])

  return { currentUser, currentToken }
}

export default useCurrentUser
