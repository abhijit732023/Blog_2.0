import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    console.log(userData);
    

    const submit = async (data) => {
        console.log(data);
        
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
            
            if (file) {
                appwriteService.deleteFile(post.featuredimage);
                console.log(file,file.$id);
                
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredimage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);
            console.log(file);
            

            if (file) {
                const fileId = file.$id;
                data.featuredimage = fileId;
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex justify-center h-full">
            <div className="w-4/5 h-full flex gap-10 justify-center">
                <div className="relative h-full" style={{ width: '30%' }}>
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
                        onChange={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        }}
                    />
                    <Input
                        label="Featured Image :"
                        type="file"
                        className="mb-4 "
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                    />
                    {post && (
                        <div className="w-full mb-4">
                            <img
                                src={appwriteService.getFilePreview(post.featuredimage)}
                                alt={post.title}
                                className="rounded-lg"
                            />
                        </div>
                    )}
                    <Select
                        options={["active", "inactive"]}
                        label="Status"
                        className="mb-4  "
                        {...register("status", { required: true })}
                    />
                   <div>
                   <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full mt-16">
                        {post ? "Update" : "Submit"}
                    </Button>
                   </div>
                </div>
                <div className=" relative w-3/5"> <RTE label="Content" name="content" control={control} defaultValue={getValues("content")} /></div>

            </div>



        </form>
    );
}