import { configureStore } from '@reduxjs/toolkit'
import  blogSliceReducer  from './application/slices/BlogSlice'

const reducer = {
    blogDetails: blogSliceReducer
  }

  const store = configureStore({
    reducer: reducer,
    devTools: true,
  })
  
  export default store;