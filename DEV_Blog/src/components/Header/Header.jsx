// import { Link, useNavigate } from 'react-router-dom'
// import { Logo, LogoutBtn } from '../index'
// // import { useState} from 'react'
// import { useSelector } from 'react-redux'


// function Header() {

//     console.log("HEADER CLICKED ") //REVIEW  

//     const navigate = useNavigate();
//     const authStatus = useSelector(state => state.authReducer.status)

    

//     const navItems = [
//         {
//             name: 'Home',
//             visibility: true,
//             slug: '/'
//         },
//         {
//             name: 'Signup',
//             visibility: !authStatus,
//             slug: '/signup'
//         },
//         {
//             name: 'Login',
//             visibility: !authStatus,
//             slug: '/login'
//         },
//         {
//             name: 'All Post',
//             visibility: authStatus,
//             slug: '/all-posts'
//         },
//         {
//             name: 'Your Post',
//             visibility: authStatus,
//             slug: '/your-post'
//         },
//         {
//             name: 'Add Post',
//             visibility: authStatus,
//             slug: '/add-post'
//         }
//     ]

//     //NOTE : Removed Container 

//     return (
//         <header className='py-3 shadow bg-gray-500'>
//             {/* <Container> */}
//                 <nav className='flex'>
//                     <div className='mr-4'>
//                         <Link to='/'>
//                             <Logo width='70px' />
//                         </Link>
//                     </div>
//                     <ul className='flex ml-auto'>
//                         {
//                             navItems.map((item) => item.visibility ?
//                                 (
//                                     <li key={item.name}>
//                                         <button
//                                             onClick={() => navigate(item.slug)}
//                                             className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
//                                         >
//                                             {item.name}
//                                         </button>
//                                     </li>
//                                 )
//                                 : null
//                             )}
//                         { // if authstatus is true then only display the following as (inside it the content is consider true)
//                             authStatus && (
//                                 <li>
//                                     <LogoutBtn />
//                                 </li>
//                             )}
//                     </ul>
//                 </nav>
//                 {/* </Container> */}
//         </header>
//     )
// }

// export default Header




import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Logo, LogoutBtn } from '../index';
import { useSelector } from 'react-redux';

function Header() {
    const navigate = useNavigate();
    const location = useLocation(); // Get current location
    const authStatus = useSelector(state => state.authReducer.status);

    const navItems = [
        { name: 'Home', visibility: true, slug: '/' },
        { name: 'Signup', visibility: !authStatus, slug: '/signup' },
        { name: 'Login', visibility: !authStatus, slug: '/login' },
        { name: 'All Post', visibility: authStatus, slug: '/all-posts' },
        { name: 'Your Post', visibility: authStatus, slug: '/your-post' },
        { name: 'Add Post', visibility: authStatus, slug: '/add-post' }
    ];

    return (
        <header className='py-3 shadow bg-gray-800 text-white'>
            <nav className='flex items-center'>
                <div className='mr-4'>
                    <Link to='/'>
                        <Logo className='w-16' /> {/* Adjust logo width */}
                    </Link>
                </div>
                <ul className='flex ml-auto space-x-4'>
                    {navItems.map((item) => 
                        item.visibility && (
                            <li key={item.name}>
                                <button
                                    onClick={() => navigate(item.slug)}
                                    aria-label={`Navigate to ${item.name}`}
                                    className={`px-4 py-2 transition duration-200 rounded-full 
                                        ${location.pathname === item.slug ? 'bg-gray-600' : 'hover:bg-gray-700'}`}
                                >
                                    {item.name}
                                </button>
                            </li>
                        )
                    )}
                    {authStatus && (
                        <li>
                            <button 
                                aria-label="Logout"
                                className='px-4 py-2 bg-red-500 text-white rounded-full transition-transform duration-200 hover:scale-105'
                            >
                                <LogoutBtn />
                            </button>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;