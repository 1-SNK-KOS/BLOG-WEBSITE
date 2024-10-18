import { Outlet } from 'react-router-dom'
import './App.css'
import { Header, Footer } from './components/index'
import { useDispatch } from 'react-redux'
import { login, logout } from './store/authSlice'
import authService from './appwrite/auth'
import { useState, useEffect } from 'react'


function App() {

  const [loader, setLoader] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) dispatch(login(userData))
        else dispatch(logout())
      }).catch((error) => {
        console.log('Error in fetching currentUSerStatus :: App.js :: ', error);
      })
      .finally(() => {
        setLoader(false)
      })
  }, [])


  return !loader ? <div>
    <Header />
    <main>
      <Outlet />  { /*//TODO : make reat routeer */}
    </main>
    <Footer />
  </div> : <div>Please LoGIN!!!</div>

}

export default App



