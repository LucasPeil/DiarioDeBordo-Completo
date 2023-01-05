import {api, requestConfig} from "../utils/config"


const profile =  async(data, token)=>{

    const reqConfig = requestConfig("GET", data, token)
    try{

        const response = await fetch(api + "/users/profile", reqConfig)
                                .then((resp)=> resp.json())
                                .catch((err)=> err)
        
       
            return response


    }catch(err){
        console.log(err)
    }   
}


const updateProfile = async(data, token)=>{

    const reqConfig = requestConfig("PUT", data, token, true)

    try{

        const response = await fetch(api + "/users/", reqConfig)
                            .then((resp)=> resp.json())
                            .catch((err)=> err)
        
        
        return response
    

    }catch(err){
        console.log(err)
    }
}

const getUserById = async(id,token) =>{
    const reqConfig = requestConfig("GET","", token )
    try{
    const response = fetch(api + "/users/" + id, reqConfig )
                    .then((resp)=> resp.json())
                    .catch((err)=> err)
                    console.log(response)
        return response
        
    }catch(e){
        console.log(e)
    }
}


const userService = {profile, updateProfile, getUserById}
export default userService