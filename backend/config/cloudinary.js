import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config';

// Parse CLOUDINARY_URL or use individual env vars
// CLOUDINARY_URL format: cloudinary://api_key:api_secret@cloud_name
const cloudinaryUrl = process.env.CLOUDINARY_URL;

if (cloudinaryUrl) {
    // Parse the URL manually to handle special characters
    // Format: cloudinary://<api_key>:<api_secret>@<cloud_name>
    const match = cloudinaryUrl.match(/cloudinary:\/\/<?(\d+)>?:<?([^@>]+)>?@(\w+)/);
    if (match) {
        cloudinary.config({
            cloud_name: match[3],
            api_key: match[1],
            api_secret: match[2],
            secure: true
        });
        console.log('✅ Cloudinary configured with cloud:', match[3]);
    } else {
        console.error('❌ Could not parse CLOUDINARY_URL');
    }
} else {
    // Fallback to individual env vars
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true
    });
}

/**
 * Upload image buffer to Cloudinary
 * @param {Buffer} buffer - Image file buffer
 * @param {string} folder - Folder name in Cloudinary
 * @returns {Promise<{url: string, public_id: string}>}
 */
export const uploadToCloudinary = (buffer, folder = 'courses') => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: 'image',
                transformation: [
                    { width: 800, height: 600, crop: 'limit' },
                    { quality: 'auto' },
                    { fetch_format: 'auto' }
                ]
            },
            (error, result) => {
                if (error) {
                    console.error('Cloudinary upload error:', error);
                    reject(error);
                } else {
                    resolve({
                        url: result.secure_url,
                        public_id: result.public_id
                    });
                }
            }
        );
        uploadStream.end(buffer);
    });
};

/**
 * Delete image from Cloudinary by public_id
 * @param {string} publicId - Cloudinary public_id
 * @returns {Promise<void>}
 */
export const deleteFromCloudinary = async (publicId) => {
    try {
        if (!publicId) return;
        await cloudinary.uploader.destroy(publicId);
        console.log('🗑️  Deleted from Cloudinary:', publicId);
    } catch (error) {
        console.error('Cloudinary delete error:', error);
        // Don't throw - deletion failure shouldn't break the app
    }
};

/**
 * Extract public_id from Cloudinary URL
 * @param {string} url - Cloudinary URL
 * @returns {string|null} - public_id or null
 */
export const getPublicIdFromUrl = (url) => {
    if (!url || !url.includes('cloudinary.com')) return null;
    try {
        // URL format: https://res.cloudinary.com/cloud_name/image/upload/v123/folder/filename.ext
        const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.\w+$/);
        return match ? match[1] : null;
    } catch {
        return null;
    }
};

export default cloudinary;
