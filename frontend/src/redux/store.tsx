import { configureStore } from "@reduxjs/toolkit";
import { getDefaultMiddleware } from "@reduxjs/toolkit";


const middleware = [...getDefaultMiddleware()]
const store = configureStore({
  reducer: {
    
  },
  middleware
})

export default store