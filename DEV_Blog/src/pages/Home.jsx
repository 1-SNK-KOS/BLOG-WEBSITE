import { useSelector } from "react-redux"
import { Container } from "../components";
import { useDispatch } from "react-redux";
import { userPosts, allPosts } from '../store/postSlice'
import postService from "../appwrite/conf";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {

    const userStatus = useSelector(state => {console.log("State in Home :: ",state.authReducer.status); return (state.authReducer.status)});
    const userData = useSelector(state => state.authReducer.userData);
    const dispatch = useDispatch();
    const navigate = useNavigate();
        console.log('USERDATA :: HOME :: userData',userData)
    // DOUBT : why async is not applicable beside useEffect callback function and is it okay not to put await here

    useEffect(() => {
        console.log('USEEFFECT :: HOME PAGE')
        if (userStatus) {
            postService.getAllPost()
                .then((allPostData) => dispatch(allPosts(allPostData)))

            postService.getUserPosts(userData.$id)
                .then((userPostData) => dispatch(userPosts(userPostData)))
        }
    }, [])


    if (!userStatus) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }



    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    <h1 className="text-xl">Welcome to Dev Blog !!~!!!</h1>
                    <h2>A community driven Blog Website </h2>
                    <h3>Share your experiences and knowledge and learn from our community lovely Developer</h3>
                </div>
            </Container>
        </div>
    )


}

export default Home