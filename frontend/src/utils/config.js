//export const api = "https://diario-de-bordo-api.vercel.app/api"
//export const uploads = "https://diario-de-bordo-api.vercel.app/api/uploads"
export const api = "https://diario-de-bordo-api.vercel.app/api"
//export const uploads = "https://diario-de-bordo-api.vercel.app/api/uploads"
//export const api = "http://localhost:5000/api"
export const requestConfig = (method, data, token = null, image = null)=>{

    let config;

    if (image){
        config = {method: method, body: data, headers: {}}
    }else if( method === "DELETE" || (data === null)){
        config={ method, headers:{}}
     }else{
        config = {method: method, 
                  body: JSON.stringify(data), 
                  headers:{ "Content-Type": "application/json"}
                }
    }

    if(token && !data){
        config={ method, headers:{}}
        config.headers.Authorization = `Bearer ${token}`
    }
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
}