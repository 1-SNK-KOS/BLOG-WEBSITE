import { Link, useNavigate } from 'react-router-dom'
import { Logo, LogoutBtn } from '../index'
// import { useState} from 'react'
import { useSelector } from 'react-redux'


function Header() {

    console.log("HEADER CLICKED ") //REVIEW  

    const navigate = useNavigate();
    const authStatus = useSelector(state => state.auth.status)

    

    const navItems = [
        {
            name: 'Home',
            visibility: true,
            slug: '/'
        },
        {
            name: 'Signup',
            visibility: !authStatus,
            slug: '/signup'
        },
        {
            name: 'Login',
            visibility: !authStatus,
            slug: '/login'
        },
        {
            name: 'All Post',
            visibility: authStatus,
            slug: '/all-post'
        },
        {
            name: 'Your Post',
            visibility: authStatus,
            slug: '/your-post'
        },
        {
            name: 'Add Post',
            visibility: authStatus,
            slug: '/add-post'
        }
    ]

    //NOTE : Removed Container 

    return (
        <header className='py-3 shadow bg-gray-500'>
            {/* <Container> */}
                <nav className='flex'>
                    <div className='mr-4'>
                        <Link to='/'>
                            <Logo width='70px' />
                        </Link>
                    </div>
                    <ul className='flex ml-auto'>
                        {
                            navItems.map((item) => item.visibility ?
                                (
                                    <li key={item.name}>
                                        <button
                                            onClick={() => navigate(item.slug)}
                                            className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                                        >
                                            {item.name}
                                        </button>
                                    </li>
                                )
                                : null
                            )}
                        { // if authstatus is true then only display the following as (inside it the content is consider true)
                            authStatus && (
                                <li>
                                    <LogoutBtn />
                                </li>
                            )}
                    </ul>
                </nav>
                {/* </Container> */}
        </header>
    )
}

export default Header
