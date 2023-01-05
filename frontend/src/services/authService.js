import {api, requestConfig} from "../utils/config"

const register =  async(data)=>{
    const reqConfig = requestConfig("POST", data)
    
    try{
        const resp= await fetch(api + "/users/register", reqConfig)
                        .then((resp) => resp.json())
                        .catch((err)=> err)

        if(resp){
            localStorage.setItem("user", JSON.stringify(resp))
        }

        return resp

    }catch(err){
        console.log(err)
    }

}

const login = async(data)=>{

    const reqConfig = requestConfig("POST", data)

    try{
        const resp = await fetch(api + "/users/login", reqConfig)
                            .then((resp) => resp.json())
                            .catch((err)=> err)
        

        if(resp){
            localStorage.setItem("user", JSON.stringify(resp))
        }
        console.log(resp)
        return resp
        
    } catch(err){
        console.log(err)
    }
}


const logout = () => {
    localStorage.removeItem("user");
  };
  

const authService = {register,login,logout}

export default authService