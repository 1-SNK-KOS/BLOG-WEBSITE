import { useSelector } from "react-redux";
import postService from "../appwrite/conf";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import parse from 'html-react-parser'
import { Container, Button } from "../components";



function Post() {
    const [post, setPost] = useState('');
    const { slug } = useParams();
    const navigate = useNavigate();
    const [img,setimg] = useState('')


    useEffect(() => {
        if (slug) {
            postService.getPost(slug)
                .then((post) => {
                    if (post){ 
                        setPost(post)
                        postService.filePreview(post.featuredImage).then((url) =>setimg(url.href))
                    }
                    else navigate('/')
                })
            
        } else {
            navigate('/')
        }
    }, [slug, navigate])

    const userData = useSelector(state => state.authReducer.userData);

     console.log("Post Details :: ",post);
    const isAuthor = post && userData ? userData.$id === post.user_Id : false;

    const deletePost = () => {
        postService.deletePost(post.$id)
            .then((status) => {
                if (status) {
                    postService.deleteFile(post.featuredImage);
                    navigate('/')
                }
            })
    }



    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img src={img}
                        alt={post.title}
                        className="rounded-xl"
                    />
                    {
                        isAuthor && (
                            <div className="absolute right-6 top-6">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-green-500" className="mr-3">
                                        Edit
                                    </Button>
                                </Link>
                                <Button bgColor="bg-red-500" onClick={deletePost}>
                                    Delete
                                </Button>
                            </div>
                        )
                    }

                    <div className="w-full mb-6">
                        <h1 className="text-2xl font-bold">{post.title}</h1>
                    </div>
                    <div className="browser-css">{console.log('here', post.content)}
                        {parse(JSON.stringify(post.content))}
                    </div>

                </div>
            </Container>
        </div>
    )
        : null;


}

export default Post