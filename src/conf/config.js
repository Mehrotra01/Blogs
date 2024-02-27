const config={
     appwriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
     appwriteProID : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
     appwriteDBID : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
     appwriteColID : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
     appwriteBucketID : String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
}
export default config;