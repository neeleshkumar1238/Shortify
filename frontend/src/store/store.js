import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
//import shortUrlReducer from './slices/shortUrlSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    //shortUrl: shortUrlReducer,
  },
})

export default store