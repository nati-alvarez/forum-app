const cloudinary = require("cloudinary").v2;

/**
 * Uploads the given file to cloudinary and returns promise
 * @param {String} path the path of the image to upload
 */
function uploadFile(path){
    return new Promise((resovle, reject)=>{
        cloudinary.uploader.upload(path, (err, image)=>{
            if (err) return reject(err);
            return resovle(image.secure_url);
        });
    })
}

module.exports = {
    uploadFile
};