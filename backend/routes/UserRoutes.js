const express = require("express")
const router = express.Router()
const multer = require("multer")
const {storage} = require("../config/cloudinary")
const upload = multer({storage})


//middlewares
const validate = require("../middlewares/handleValidation")
const authValidation = require("../middlewares/authValidation")
const {createUserValidations, loginValidation, userUpdateValidation} = require("../middlewares/userValidations")
//controller
const{register, login, getLoggedUser, update, getUserById} = require("../controllers/UserController")
const { imageUpload } = require("../middlewares/imageStorage")

//routes
router.get("/profile", authValidation, getLoggedUser)
router.get("/:id", authValidation,getUserById )
router.post("/register", createUserValidations(), validate, register);
router.post("/login", loginValidation(), validate, login );
router.put("/",authValidation,upload.single("profileImage"),userUpdateValidation(),validate, update)
module.exports = router;