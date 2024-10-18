import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'
import {logoutPost } from '../../store/postSlice'
import authService from '../../appwrite/auth'


function LogoutBtn() {

    console.log("LOGOUT BTN CLICKED  ")   //REVIEW  
    const dispatch = useDispatch();

    const logoutSession = () => {
        authService.logout()
            .then(() => {
                dispatch(logout())
                dispatch(logoutPost())
            })
            .catch((error) => console.log("Error while logout :: LogoutBTN :: ", error))   //REVIEW       
    }

    return (
        <button
            className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
            onClick={logoutSession}
        >Logout</button>
    )
}

export default LogoutBtn