 import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

 import userService from "../services/userService";

 const initialState = {
    user: {},
    loading: false,
    success: false,
    error: null,
    message: null

 }

 export const profile = createAsyncThunk("user/profile", async(user, thunkAPI)=>{
    const token = thunkAPI.getState().auth.user.token

    const data = await userService.profile(user,token)
    if(data.errors){
        thunkAPI.rejectWithValue(data.errors[0])
    }
    return data

 })

 export const updateProfile = createAsyncThunk("user/update", async(user, thunkAPI)=>{

    const token = thunkAPI.getState().auth.user.token

    const data = await userService.updateProfile(user,token)
    if(data.errors){
        return  thunkAPI.rejectWithValue(data.errors[0])
    }
    //console.log(data)
    return data

 })

 export const getUserById = createAsyncThunk("user/getUserById", async(id, thunkAPI)=>{
    
    const token = thunkAPI.getState().auth.user.token
    const data = await userService.getUserById(id, token)
    
    if(data.errors){
        thunkAPI.rejectWithValue(data.errors[0])
    }
    return data
 })

 export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        resetMessage: (state)=>{
            state.message=null
        }
    },
    extraReducers: (builder) =>{
        builder
            .addCase(profile.pending, (state)=>{
                state.loading = true
                state.error = null
                
            })
            .addCase(profile.fulfilled, (state, action)=>{
                state.loading = false
                state.error = null
                state.success = true
                state.user = action.payload
            })
            .addCase(profile.rejected, (state,action)=>{
                state.loading = false
                state.error = action.payload
                state.success = false
            })
            .addCase(updateProfile.pending, (state)=>{
                state.loading = true
                state.error = null
                
            })
            .addCase(updateProfile.fulfilled, (state, action)=>{
                state.loading = false
                state.error = null
                state.success = true
                state.user = action.payload
                state.message = "Usuário atualizado com sucesso!"
            })
            .addCase(updateProfile.rejected, (state,action)=>{
                state.loading = false
                state.error = action.payload
                state.success = false
                state.user = null
            })
            .addCase(getUserById.pending, (state)=>{
                state.loading = true
                state.error = null
                
            })
            .addCase(getUserById.fulfilled, (state, action)=>{
                state.loading = false
                state.error = null
                state.success = true
                state.user = action.payload
            })
            .addCase(getUserById.rejected, (state,action)=>{
                state.loading = false
                state.error = action.payload
                state.success = false
            })
            
            
    }
 })

export const {resetMessage}  = userSlice.actions

export default userSlice.reducer