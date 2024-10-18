const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwriteProfilecCollectionID: String(import.meta.env.VITE_APPWRITE_PROFILE_COLLECTION_ID),
    appwriteProfilecBuketID: String(import.meta.env.VITE_APPWRITE_PROFILE_BUCKET_ID),
    appwriteCommentCollectionID:String(import.meta.env.VITE_APPWRITE_COMMENT_COLLECTION_ID)
}
// there was a name issue with the import.meta.env.VITE_APPWRITE_URL, it was later fixed in debugging video

export default conf