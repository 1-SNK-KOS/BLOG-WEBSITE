import { useSelector } from "react-redux"
import { Container } from "../components";
import { useDispatch } from "react-redux";
import { userPosts, allPosts } from '../store/postSlice'
import postService from "../appwrite/conf";
import { useEffect } from "react";

function Home() {

    const userStatus = useSelector(state => state.auth.status);
    const userData = useSelector(state => state.auth.userData);
    const dispatch = useDispatch();

    // DOUBT : why async is not applicable beside useEffect callback function and is it okay not to put await here

    useEffect(() => {
        console.log('USEEFFECT :: HOME PAGE')
        if (userStatus) {
            postService.getAllPost()
                .then((post) => dispatch(allPosts(post)))

            postService.getUserPosts()
                .then((post) => dispatch(userPosts(post)))
        }
    }, [userData, userStatus])


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