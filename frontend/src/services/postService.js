import {api, requestConfig} from "../utils/config"

const publishPost = async(data, token)=>{
    console.log(`Entrando no publish post e aqui esta o dado: ${data}`)
    const reqConfig = requestConfig("POST",data, token, true)

    try{
        const response = await fetch(api + "/posts/", reqConfig)
                    .then((resp)=> resp.json())
                    .catch((err)=> err)
        return response
        

    }catch(err){
        console.log(err)
    }
}

const editPost = async(data,id, token)=>{
    const reqConfig = requestConfig("PUT",data, token)
 
    try{
        const response = await fetch(api + "/posts/" + id, reqConfig)
                        .then((resp)=> resp.json())
                        .catch((err)=> err)
        
        return response
    }catch(err){
        console.log(err)
    }

}

const deletePost= async(id, token)=>{

    const reqConfig = requestConfig("DELETE", "", token)

    try{
        const response = await fetch(api + "/posts/" + id, reqConfig)
                        .then((resp)=> resp.json())
                        .catch((err)=> err)
        
        return response

    }catch(err){
        console.log(err)
    }
}

const likePost = async(data, id, token)=>{
    const reqConfig = requestConfig("POST", data,token)

try{
    const response = await fetch( api + "/posts/" + id, reqConfig )
                            .then((resp)=> resp.json())
                            .catch((err)=> err)
    return response

}catch(err){
    console.log(err)
}

}

const getPost = async(id, token)=>{
   const reqConfig = requestConfig("GET", "",token)

   try{
        const response = await fetch(api + "/posts/" + id, reqConfig)
                    .then((resp)=> resp.json())
                    .catch((err)=> err)

        return response
        

    }catch(err){
        console.log(err)
    }

}
const getAllowedPosts  = async(token)=>{
   
    const reqConfig = requestConfig("GET", null ,token)

    try{
        const response = await fetch(api + "/posts/allowedposts", reqConfig)
                            .then((resp)=> resp.json())
                            .catch((err)=> err)
        console.log(response)
        return response
        
        
        

    }catch(err){
        console.log(err)
    }
}

const getUserPosts  = async(id,token)=>{
   
    const reqConfig = requestConfig("GET", null ,token)

    try{
        const response = await fetch(api + "/posts/user/" + id, reqConfig)
                            .then((resp)=> resp.json())
                            .catch((err)=> err)
        
        return response
        
        
    }catch(err){
        console.log(err)
    }
}


const postService = {publishPost,editPost, deletePost, likePost, getPost, getAllowedPosts, getUserPosts}

export default postService