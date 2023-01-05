const User = require("../models/User")
const Post = require("../models/Post")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose")
const cloudinary = require("../config/cloudinary")


const  jwtSecret = process.env.JWT_SECRET;

// GENERATE TOKEN
const generateToken = (id)=>{
    return jwt.sign({id}, jwtSecret,{
        expiresIn: "7d"
    })
}

const register = async(req,res)=>{
    const {name,email, password, username} = req.body

    const user = await User.findOne({email})
    if(user){
        res.status(422).json({errors: ["Usuário já cadastrado"]})
    }
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password,salt);

    const newUser = await User.create({name, username,email, password: hashedPassword})

    if(!newUser){
        res.status(422).json({errors:["Algo deu errado, tente novamente mais tarde"]})
        return;
    }

    res.status(201).json({_id: newUser._id, token: generateToken(newUser._id)})
}

const login = async (req,res)=>{
    const {email,password} = req.body
    const user = await User.findOne({email})

    //checking if user exists
    if(!user){
        res.status(404).json({errors:["Usuário não encontrado"]})
        return
    }
    // comparing passwords
    if(!(await bcrypt.compare(password, user.password))){
        res.status(422).json({errors:["Senha inválida"]})
        return
    }

    res.status(200).json({
        _id: user._id,
        profileImage: user.profileImage,
        token: generateToken(user._id),
      });
    
}
const getLoggedUser = (req,res)=>{
    const user = req.user;
    res.status(200).json(user)
    
}

const getUserById = async (req,res)=>{
    const {id} = req.params
    const reqUser = req.user
    const user = await User.findById( mongoose.Types.ObjectId(id)).select("-password")

    if(!user){
        res.status(404).json({errors: ["Usuário não encontrado"]})
        return
    }
    /*if(reqUser._id != id){
        res.status(422).json({errors:["Você não tem permissão para acessar este perfil!"]})
        return
    }*/
    res.status(200).json(user)
}

const update = async(req,res)=>{
    const {name,username, bio, password} = req.body
    
    const reqUser = req.user
    let profileImage = null
    const user = await User.findById(mongoose.Types.ObjectId(reqUser._id)).select("-password");
    const posts = await Post.find({userId: user._id})
    if(req.file){
        profileImage ={ url: req.file.path, filename: req.file.filename}

          user.profileImage = profileImage

          posts.map(async (post)=>{
            post.userProfileImage = profileImage
            await post.save()      
    })

    }
    
    if(!user){
       return res.status(404).json({errors:["Usuário não encontrado"]})
    }

    if(name){
        user.name = name
    }
    if(username){
        user.username = username
    }
    if(bio){
        user.bio = bio
   }
   if(password){
       const salt =  await bcrypt.genSalt();
       const hashedPassword = await bcrypt.hash(password,salt)
       user.password = hashedPassword
   }


   
    await user.save()

    res.status(200).json(user)
} 


module.exports = {register,login,getLoggedUser, update, getUserById}