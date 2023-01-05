const express = require("express")
const router = express.Router()
const multer = require("multer")
const {storage} = require("../config/cloudinary")
const upload = multer({storage})

const authValidation = require("../middlewares/authValidation")
const validate = require("../middlewares/handleValidation")
const {imageUpload} = require("../middlewares/imageStorage")
const {createPostValidation, updatePostValidation} = require("../middlewares/postValidations")
const {publishPost, editPost, deletePost, likePost, getPostById, getUserPosts, getAllowedPosts} = require("../controllers/PostController")

router.post("/", authValidation, upload.single("postImages"),createPostValidation(), validate, publishPost)
router.put("/:id", authValidation, updatePostValidation(), validate, editPost)
router.delete("/:id", authValidation, validate, deletePost)
router.post("/:id", authValidation, validate, likePost )
router.get("/allowedposts", authValidation,validate, getAllowedPosts)
router.get("/:id", authValidation, getPostById)
router.get("/user/:id", authValidation,validate, getUserPosts)


module.exports= router