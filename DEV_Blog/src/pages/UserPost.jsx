import { useSelector,useDispatch } from "react-redux";
import { PostCard, Container } from "../components";
import postService from "../appwrite/conf";
import { useEffect } from "react";
import { userPosts } from "../store/postSlice";


function UserPost() {
    const userStatus = useSelector(state => state.authReducer.status)
    const userData = useSelector(state => state.authReducer.userData)
    const dispatch = useDispatch();

    // useEffect(() => {
    //     console.log('USEEFFECT :: HOME PAGE')
    //     if (userStatus) {

    //         postService.getUserPosts(userData.$id)
    //             .then((post) => dispatch(userPosts(post)))
    //     }
    // }, [])

    const posts = useSelector(state => state.postReducer.userPostData)
    console.log("user post :: post :: ",posts)
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts && posts.documents.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default UserPost