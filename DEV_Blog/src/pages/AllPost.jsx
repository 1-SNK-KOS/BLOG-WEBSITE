import { useSelector } from "react-redux";
import { PostCard, Container } from "../components";
import { useDispatch } from "react-redux";
import postService from "../appwrite/conf";
import { useEffect } from "react";
import { allPosts } from "../store/postSlice";

function AllPost() {

    // const userStatus = useSelector(state => state.authReducer.status)
    // // const userData = useSelector(state => state.authReducer.userData)
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     console.log('USEEFFECT :: HOME PAGE')
    //     if (userStatus) {

    //         postService.getAllPost()
    //             .then((post) => dispatch(allPosts(post)))
    //     }
    // }, [])

    const posts = useSelector(state => state.postReducer.allPostData)
    // console.log(posts);

    console.log("All post :: post :: ",posts)
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

export default AllPost
