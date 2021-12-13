import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
   blogPost: {
       comments:[]
   }
}

export const fetchBlogDetails = createAsyncThunk('posts/fetchPosts', async (id) => {
   const response = axios.get(`${process.env.REACT_APP_SERVICE_BASE_URL}/blog/get/${id}`)
   return response;
 })

export const updateComment = createAsyncThunk('posts/updateComment', async (obj) => {
   const response = axios.post(`${process.env.REACT_APP_SERVICE_BASE_URL}/blog/saveComment`, {
    _id : initialState.blogPost._id,
    comments: initialState.blogPost.comment
   })
   return response;
 })

export const commentSlice = createSlice({
    name: 'blogDetails',
    initialState: initialState,
    reducers: {
        addComment: ( state = initialState , { payload } ) => {
    
            if(payload.level1 === undefined && payload.level2 === undefined && payload.root === undefined){
               state.blogDetails.blogPost.comments.unshift({ name: payload.name, comment: payload.comment, date: "June 25, 2021 05:46:AM", reply: []}) 
               axios.post(`${process.env.REACT_APP_SERVICE_BASE_URL}/blog/saveComment`, {
                _id : state.blogDetails.blogPost._id,
                comments: state.blogDetails.blogPost.comments
               }).then(res => {
               })
               return;
            }

            if((payload.level2 !== null) && payload.level2 >= 0) {
                state.blogDetails.blogPost.comments[payload.root].reply[payload.level1].reply.push({ name: payload.name, comment: payload.comment, date: "June 25, 2021 05:46:AM"})
            } else if ((payload.level1 !== null) && payload.level1 >= 0) {
                state.blogDetails.blogPost.comments[payload.root].reply[payload.level1].reply.push({ name: payload.name, comment: payload.comment, date: "June 25, 2021 05:46:AM"})
            } else {
                state.blogDetails.blogPost.comments[payload.root].reply.push({ name: payload.name, comment: payload.comment, date: "June 25, 2021 05:46:AM", reply: []}) 
            }

            axios.post(`${process.env.REACT_APP_SERVICE_BASE_URL}/blog/saveComment`, {
                _id : state.blogDetails.blogPost._id,
                comments: state.blogDetails.blogPost.comments
              }).then(res => {
              })


        }
    },
    extraReducers(builder){
      builder
      .addCase(fetchBlogDetails.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchBlogDetails.fulfilled, (state, { payload }) => {
        state.status = 'succeeded'
        state.blogDetails = payload.data.data
      })
      .addCase(fetchBlogDetails.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
     }
})

const { reducer } = commentSlice;
export default reducer;