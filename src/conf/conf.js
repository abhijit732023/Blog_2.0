const conf = {
    appwriteUrl: String(import.meta.env.VITE_API_URL),
    appwriteProjectId: String(import.meta.env.VITE_API_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_API_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_API_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_API_BUCKET_ID),
    appwriteProfilecCollectionID: String(import.meta.env.VITE_API_PROFILE_COLLECTION_ID),
    appwriteProfilecBuketID: String(import.meta.env.VITE_API_PROFILE_BUCKET_ID),
    appwriteCommentCollectionID:String(import.meta.env.VITE_API_COMMENT_COLLECTION_ID)
}
// there was a name issue with the import.meta.env.VITE_APPWRITE_URL, it was later fixed in debugging video

export default conf