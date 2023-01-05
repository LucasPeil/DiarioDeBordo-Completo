const dotenv = require("dotenv");
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
dotenv.config();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params:{
    folder:"DiarioDeBordo",
    allowedFormats: ['jpeg', 'png', 'jpg']
  }
})

module.exports ={
  cloudinary,
  storage
}