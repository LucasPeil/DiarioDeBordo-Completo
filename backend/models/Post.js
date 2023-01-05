const mongoose = require("mongoose")
const {Schema} = mongoose

const ImageSchema = new Schema({
    url: String,
    filename: String
})
const postSchema = new Schema({
    //postImages: String,
    postImages: ImageSchema,
    title: String,
    text: String,
    userId: mongoose.ObjectId,
    likes: Array,
    userName: String,
    reportDate: String,
    usersAllowed: Array,
   // userProfileImage:String
     userProfileImage:ImageSchema

},{
    timestamps:true
})

const Post = mongoose.model("Post", postSchema)

module.exports = Post