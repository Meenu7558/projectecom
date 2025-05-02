import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config()
console.log("Cloudinary Config:");
console.log("Cloud Name:", process.env.CLOUD_NAME);
console.log("API Key:", process.env.CLOUD_API_KEY ? "Loaded" : "Missing");
console.log("API Secret:", process.env.CLOUD_API_SECRET ? "Loaded" : "Missing");



    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.CLOUD_API_KEY, 
        api_secret: process.env.CLOUD_API_SECRET,
    });
    export const cloudinaryInstance = cloudinary