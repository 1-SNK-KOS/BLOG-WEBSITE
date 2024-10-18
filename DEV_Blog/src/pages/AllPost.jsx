import { useSelector } from "react-redux";
import { PostCard, Container } from "../components";

function AllPost() {

    const posts = useSelector(state => state.post.allPostData)

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts && posts.map((post) => (
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
