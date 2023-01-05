import { useEffect, useState } from "react"
import { useSelector } from "react-redux"


export const useAuthorization = ()=>{
    const {user} = useSelector((state) => state.auth)

    const [auth,setAuth] = useState(false)
    const [loading, setLoading] = useState(true)
    let isError
    if(user){
        isError = "errors" in user
    }
    

    useEffect(()=>{
        if(user && !isError){
            setAuth(true)
        }else{
            setAuth(false)
        }
    
        setLoading(false)

    },[user])
   
    return {auth, loading}
}