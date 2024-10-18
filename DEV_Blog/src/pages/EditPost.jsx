import { useEffect , useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import postService from "../appwrite/conf";
import { Container , PostForm } from "../components"

function EditPost() {

const navigate  = useNavigate();
const {slug} = useParams();
const [post,setPost] = useState('');

useEffect(() => {
    if(slug){
        postService.getPost(slug)
                        .then((post) => setPost(post) )  //TODO:can check if post is there then uppdate post
    }
    else{
            navigate('/');
    }
},[slug,navigate])



return (
    post? 
    <div className='py-8'>
            <Container>
                <PostForm post = {post}/>
            </Container>
    </div>
    :null
)
}

export default EditPost