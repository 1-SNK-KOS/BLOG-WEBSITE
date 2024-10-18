import postService from '../../appwrite/conf'
import PropTypes from 'prop-types'
import { useState } from 'react'
import {Link} from 'react-router-dom'

function PostCard({ $id, featuredImage, title }) {
    const [img,setImg] = useState('');

    postService.filePreview(featuredImage)
                .then((url) => setImg(url.href))
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    <img src={img} alt={title}
                        className="rounded-xl"
                    />
                </div>

                <h2
                    className='text-xl font-bold'
                >
                    {title}</h2>
            </div>
        </Link>
    )
}

PostCard.propTypes = {
    $id : PropTypes.any.isRequired,
    featuredImage : PropTypes.string.isRequired,
    title : PropTypes.string.isRequired

}

export default PostCard