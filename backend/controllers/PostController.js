const Post = require("../models/Post")
const mongoose = require("mongoose")
const User = require("../models/User")
const cloudinary = require("../config/cloudinary")
//Create Post
const publishPost = async (req,res)=>{
    //get post data that comes from frontend
    // check if there is an req.file
    let postImages = {url:"https://res.cloudinary.com/dwdvetxir/image/upload/v1671345629/DiarioDeBordo/c6c8wewaf7r8vyk5js7r.png", filename:"defautlPhoto"}
    const {title,text, usersAllowed, reportDate} = req.body
    if(req.file){
        postImages ={ url: req.file.path, filename: req.file.filename}
    }
    const reqUser = req.user
    const user = await User.findById(reqUser._id) 

    let usersAllowedToSee = [] 
   
    /*if(postImages){
        const uploadedResponse = await cloudinary.uploader.upload(postImages, {
            upload_preset: "diarioDeBordo",
          });
          postImages = uploadedResponse
    }*/

    if (usersAllowed){
        usersAllowedToSee.push(usersAllowed)
    }
    

     const post = await Post.create({postImages, title, text, userId: user._id, userName: user.username,reportDate, usersAllowed: usersAllowedToSee, userProfileImage: user.profileImage})
    
    if(!post){
        res.stauts(422).json({errors:["Algo deu errado, tente novamente mais tarde"]})
    }
    console.log(`aqui está o teste do controler ${post}`)

    res.status(201).json(post)
}

//Edit Post
const editPost = async(req,res)=>{
    
    //const user = await User.findById(reqUser._id)
    const {id} = req.params
    const {title,text, usersAllowed} = req.body
    const reqUser = req.user
    const user = await User.findById(reqUser._id)
    const post = await Post.findById(id)

    if(!post){
        res.status(404).json({errors:["Post não encontrado!"]})
        return
    }

    if(!post.userId.equals(reqUser._id)){
        if(!(post.usersAllowed.includes(user.email))){
            res.status(422).json({errors: ["Você não tem permissão para fazer esta ação"]})
            return
        }
    }

    if(req.file){
        post.postImages = req.file.filename
    }
    if(title){
        post.title = title;
    }
    if(text){
        post.text = text
    }
    if(usersAllowed){
        post.usersAllowed.push(usersAllowed)
    }
  

    await post.save();

    res.status(200).json({post, message: "Post atualizado com sucesso!"})

}
//Delete Post

const deletePost = async (req,res)=>{
    const {id}= req.params;
    
    const post = await Post.findById(mongoose.Types.ObjectId(id));
    const reqUser = req.user;

    if(!post){
        res.status(404).json({errors:["A publicação que você procurava não foi encontrada"]})
        return
    }
    if(!post.userId.equals(reqUser._id) && !post.usersAllowed.includes(reqUser.email)){
        res.status(422).json({errors:["Você não tem autorização para fazer esta ação"]})
        return
    }

    await Post.findByIdAndDelete(post._id)
   
    res.status(200).json({id: post._id, message: "Foto excluída com sucesso"})
    
}

// Get Post by ID
const getPostById = async (req,res)=>{
    const {id} = req.params
    const reqUser = req.user
    const user = await User.findById(reqUser._id)
    const post = await Post.findById(id)
    if(!post){
        res.status(404).json({errors:["A publicação que você procurava não foi encontrada"]})
        return
    }
    if(!(post.usersAllowed.includes(user.email)) && post.userName != user.username){
        return res.status(422).json({errors:["Você não tem acesso a esta publicação!"]})
    }
    if(!post.userId.equals(reqUser._id)){
        if(post.usersAllowed != user.email){
            res.status(422).json({errors: ["Você não tem permissão para fazer esta ação"]})
            return
        }
    }
    
    res.status(200).json(post)

}

// Get user Posts - talvez este recurso não seja implementado

const getUserPosts = async(req,res)=>{
    const reqUser = req.user
    const user = await User.findById(reqUser._id)
    
    try{
    const posts = await Post.find({userId: user._id}).sort([["createdAt", -1]]).exec()
    if(!posts){
        res.status(404).json({errors:["A publicação que você procurava não foi encontrada"]})
        return
    }

    let allowedPostsArray
    const allowedPosts = posts.filter((post)=>{
        return post.usersAllowed.includes(user.email) || post.userName === user.username
    })
    

    res.status(200).json(allowedPosts) //ALLOWED POSTS É UM ARRAY!!!!


    }catch(err){
        res.status(404).json({errors:["Algo deu errado, tente novamente mais tarde"]})
    }
}


const getAllowedPosts = async(req,res)=>{
    const reqUser = req.user
    let user = await User.findById(reqUser._id)
    
    try{
    const posts = await Post.find({usersAllowed: user.email})
    
    if(!posts){
        res.status(404).json({errors:["Algo deu errado, tente novamente mais tarde"]})
        return
    }
    res.status(200).json(posts)
    
}catch(err){
        res.status(404).json({errors:["Algo deu errado, tente novamente mais tarde"]})
    }
    
}


const likePost = async(req, res)=>{
    const {id} = req.params
    const user = req.user;
    const post = await Post.findById(id)

    if(!post){
        res.status(404).json({errors:["A publicação que você procurava não foi encontrada"]})
    }
    
    if(post.likes.includes(user._id)){
        res.status(422).json({errors:["Voce já curtiu essa foto"]})
        return
    }else{
        post.likes.push(user._id)
    }
    
    await post.save()
    
    res.status(200).json({userId: user._id, message:"Post curtido!"})


}


module.exports={publishPost, editPost, deletePost, getPostById, getUserPosts, likePost, getAllowedPosts}