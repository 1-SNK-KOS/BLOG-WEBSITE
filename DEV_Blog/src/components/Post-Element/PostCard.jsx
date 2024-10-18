import postService from '../../appwrite/conf'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

function PostCard({ $id, featuredImage, title }) {

    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    <img src={postService.filePreview(featuredImage)} alt={title}
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