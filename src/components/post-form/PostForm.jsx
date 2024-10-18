import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

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

    const submit = async (data) => {
        const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
        if (post) {
            if (file) appwriteService.deleteFile(post.featuredimage);
            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredimage: file ? file.$id : undefined,
            });
            if (dbPost) navigate(`/post/${dbPost.$id}`);
        } else {
            if (file) {
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id, featuredimage: file.$id });
                if (dbPost) navigate(`/post/${dbPost.$id}`);
            }
        }
    };

    const slugTransform = useCallback((value) =>
        value?.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-") || "",
        []);

    React.useEffect(() => {
        const subscription = watch(({ title }) => {
            if (title) setValue("slug", slugTransform(title), { shouldValidate: true });
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex justify-center  h-full">
            <motion.div initial={{ scale: 0, rotate: 180 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    duration: 2,
                    delay:0.5
                }} style={{ width: '66%' }} className=" h-full flex  justify-around bg-white pb-4 pt-4 rounded-md ">
                <div style={{ width: '38%' }} className="relative h-full  bg-gray-200 p-3 rounded-md">
                    <Input label="Title :" placeholder="Title" className="mb-4 shadow-md" {...register("title", { required: true })} />
                    <Input label="Slug :" placeholder="Slug" className="mb-4 shadow-md" {...register("slug", { required: true })}
                        onChange={(e) => setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })} />
                    <Input label="Featured Image :" type="file" className="mb-4 shadow-md" accept="image/*" {...register("image", { required: !post })} />
                    {post && <img src={appwriteService.getFilePreview(post.featuredimage)} alt={post.title} className="rounded-lg mb-4" />}
                    <Select options={["active", "inactive"]} label="Status" className="mb-4 shadow-md" {...register("status", { required: true })} />
                    <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full mt-16 shadow-md">
                        {post ? "Update" : "Submit"}
                    </Button>
                </div>
                <div style={{ width: '60%' }} className="relative  bg-gray-200 p-2 rounded-md">
                    <RTE label="Content" name="content" control={control} defaultValue={getValues("content")} />
                </div>
            </motion.div>
        </form>
    );
}