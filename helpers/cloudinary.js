const cloudinary = require("cloudinary").v2;

function uploadFile(path){
    return new Promise((resovle, reject)=>{
        cloudinary.uploader.upload(path, (err, url)=>{
            if (err) return reject(err);
            return resovle(url);
        });
    })
}