import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


import postService from "../services/postService"

const initialState = {
    posts: [],
    post: {},
    loading : false,
    success : false,
    error : null,
    message: null,
    allowedPosts:[]
}



export const publishPost = createAsyncThunk("post/publishPost", async(postData, thunkAPI)=>{
    const token = thunkAPI.getState().auth.user.token
    const data = await postService.publishPost(postData, token)

    if (data.errors){
       return thunkAPI.rejectWithValue(data.errors[0])
    }

    return data
})




export const editPost = createAsyncThunk("post/editPost", async(postData, thunkAPI)=>{
    const token = thunkAPI.getState().auth.user.token
    const data = await postService.editPost({ title: postData.title, text: postData.text, usersAllowed:postData.usersAllowed }, postData.id, token)

    if (data.errors){
        return thunkAPI.rejectWithValue(data.errors[0])
    }

    return data
})

export const deletePost = createAsyncThunk("post/deletePost", async(id, thunkAPI)=>{
    const token = thunkAPI.getState().auth.user.token
    const data = await postService.deletePost(id,token)

    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors[0])
    }

    return data;
})

export const likePost = createAsyncThunk("post/likePost", async(id, thunkAPI)=>{
    const token = thunkAPI.getState().auth.user.token
    const data = await postService.likePost(id, token)

    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors[0])
    }

    return data
})

export const getPost = createAsyncThunk("post/getPost", async(id, thunkAPI)=>{
    const token = thunkAPI.getState().auth.user.token
    const data = await postService.getPost(id, token)

    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors[0])
    }

    return data
})
export const getAllowedPosts = createAsyncThunk("post/getAllowedPosts", async(token, thunkAPI)=>{
    const data = await postService.getAllowedPosts(token)
    
    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors[0])
    }

   
    
    return data
})




export const getUserPosts = createAsyncThunk("post/getUserPosts", async(id, thunkAPI)=>{
   
    const token = thunkAPI.getState().auth.user.token
  
   /* if(token){
        console.log(token)
    }else{
        console.log("sem token")
    }*/
    const data = await postService.getUserPosts(id,token)
    
    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors[0])
    }

    return data
})


export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        resetMessage: (state) => {
          state.message = null;
          state.error = null
        },
    },
    extraReducers:(builder)=>{
        builder
            .addCase(publishPost.pending, (state)=>{
                
                state.error = null
                state.loading = true

            })
            .addCase(publishPost.fulfilled, (state,action)=>{
                state.loading = false;
                state.success = true;
                state.error = null;
                state.post = action.payload;
                state.posts.push(state.post);
                state.message = "Publicação enviada com sucesso! Acesse 'Meu Perfil'";
            })
            .addCase(publishPost.rejected, (state,action)=>{
                state.success = false
                state.error = action.payload
                state.loading = false
                state.post = null
            })
            .addCase(editPost.pending, (state)=>{
                
                state.error = null
                state.loading = true

            })
            .addCase(editPost.fulfilled, (state,action)=>{
                state.success = true
                state.error = null
                state.loading = false
                state.posts.map((post)=>{
                    if(post._id === action.payload.post._id){
                        post.title = action.payload.post.title
                        post.text = action.payload.post.text
                        post.usersAllowed = action.payload.post.usersAllowed
                        return
                    }
                    
                    return post
                })
                state.message = "Post atualizado com sucesso!"
            })
            .addCase(editPost.rejected, (state,action)=>{
                state.success = false
                state.error = action.payload
                state.loading = false
                state.post = null
            })
            .addCase(deletePost.pending, (state)=>{
                state.error = null
                state.loading = true

            })
            .addCase(deletePost.fulfilled, (state,action)=>{
                state.success =true
                state.error = null
                state.loading = false
                state.posts = state.posts.filter(post => post._id !== action.payload.id)
                state.message = action.payload.message

            })
            .addCase(deletePost.rejected, (state,action)=>{
                state.success =false
                state.error = action.payload
                state.loading = false
                state.post = {}
            })
            
            .addCase(likePost.fulfilled, (state, action)=>{
                state.loading = false
                state.error = null
                state.success = true
                if(state.post.likes){
                    state.post.likes.push(action.payload.userId)
                }
                state.message = action.payload.message
            })

            .addCase(likePost.rejected, (state, action)=>{
                state.success = false
                state.error = action.payload
                state.loading = false
    
            })
            .addCase(getPost.pending, (state)=>{
                state.loading = true
                state.error = null
            })
            .addCase(getPost.fulfilled, (state,action)=>{
            
                state.loading = false
                state.error = null
                state.success = true 
                state.post = action.payload
            })
            .addCase(getPost.rejected, (state,action)=>{
                state.loading = false
                state.error = action.payload
                state.success = true 
                
            })
            .addCase(getAllowedPosts.pending, (state)=>{
                state.loading = true
                state.error = null
            })
            .addCase(getAllowedPosts.fulfilled, (state,action)=>{
            
                state.loading = false
                state.error = null
                state.success = true 
                state.posts = action.payload
               
            })
            .addCase(getAllowedPosts.rejected, (state,action)=>{
                state.loading = false
                state.error = action.payload
                state.success = true 
                
            })
            .addCase(getUserPosts.pending, (state)=>{
                state.loading = true
                state.error = null

            })
            .addCase(getUserPosts.fulfilled, (state,action)=>{
                state.loading = false
                state.error = null
                state.success = true 
                state.posts = action.payload
            })
            .addCase(getUserPosts.rejected, (state,action)=>{
                state.loading = false
                state.error = action.payload
                state.success = true 
                
            })


    }

    
})

export const { resetMessage } = postSlice.actions;

export default postSlice.reducer