import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

function AuthLayout({ children, authentication = true }) {

    console.log('AuthLayout Clicked ');   //REVIEW  

    const userStatus = useSelector(state => state.authReducer.status);
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);


    useEffect(() => {
        console.log('AUTHLAYOUT useEFFECT');    //REVIEW 
        if (authentication && userStatus !== authentication) {
            navigate('/login');
        }
        if (!authentication && userStatus !== authentication) {
            navigate('/')
        }

        setLoader(false)
    }, [userStatus, authentication, navigate])

    return loader ? <h1>Loading...</h1> : <>{children}</>


}


AuthLayout.propTypes = {
    children: PropTypes.any,
    authentication: PropTypes.bool
}

export default AuthLayout