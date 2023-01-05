const mongoose = require("mongoose")
const {Schema} = mongoose

const ImageSchema = new Schema({
    url: String,
    filename: String
})

const userSchema = new Schema({
    name: String,
    username: String,
    bio: String,
    email: String,
    password: String,
    profileImage:ImageSchema
    
},
{
    timestamps:true
})

const User = mongoose.model("User", userSchema);
module.exports = User