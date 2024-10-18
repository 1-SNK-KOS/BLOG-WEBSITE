import postService from "../../appwrite/conf";
import { RTE, Input, Button, Select } from '../index'
import { useForm } from "react-hook-form";
import { useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import PropTypes from 'prop-types'


function PostForm({ post }) {

    const { register, handleSubmit, setValue, getValues, watch, control } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active'
        }
    });

    const userData = useSelector(state => state.auth.userData);
    const navigate = useNavigate();


    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value.trim()
                .toLowerCase()
                .replace(/[^A-Za-z\d]+/g, '-')
        }

        return ""
    }, [])


    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                console.log("PostForm :: value :: ", value);
                setValue("slug", slugTransform(value.title), { shouldValidate: true })
            }
            console.log('subscription :: slug :: PostForm :: ', subscription); //REVIEW

            return () => subscription.unsubscribe();
        })
    }, [watch, slugTransform, setValue])

    const submit = async (data) => {
        //case 1
        if (post) {
            const fileCheck = data.image[0] ? await postService.uploadFile(data.image[0]) : null;

            if (fileCheck) {
                await postService.deleteFile(post.featuredImage);
            }

            //TODO : post.$id inside {} is giving error see why ?
            const updateResp = await postService.updatePost(post.$id, { ...data, featuredImage: fileCheck ? fileCheck.$id : post.featuredImage })

            if (updateResp) {
                navigate(`/post/${updateResp.$id}`)
            }
        } else {
            const file = await postService.uploadFile(data.image[0]);

            if (file) {
                const dBpost = await postService.createPost({ ...data, featuredImage: file.$id, user_Id: userData.$id })

                if (dBpost) {
                    navigate(`/post/${dBpost.$id}`)
                }
            }
        }
    }
    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        console.log('onInput :: slug :: PostForm ::') //REVIEW
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={postService.filePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

PostForm.propTypes = {
    post: PropTypes.object
}


export default PostForm