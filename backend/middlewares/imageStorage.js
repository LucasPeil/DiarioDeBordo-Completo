const multer = require("multer")
const path = require("path")

const imageStorage = multer.diskStorage({
    destination: (req,file,cb)=>{
        let folder ="";
        if(req.baseUrl.includes("posts")){
            folder = "postsImages"
        }else{
            folder = "profileImage"
        }
        cb(null, `uploads/${folder}/`)
    },
    filename: (req, file, cb)=>{
        const uniquePreffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniquePreffix + path.extname(file.originalname))
    }
})

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(png|jpg)$/)){
            return cb(new Error("Envie apenas arquivos no formato .png ou jpeg."))
        }
        cb(undefined, true)
    }
})
module.exports= {imageUpload}