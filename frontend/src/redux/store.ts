import { configureStore } from "@reduxjs/toolkit";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import todo from './todo/reducer'

const middleware = [...getDefaultMiddleware()]
const store = configureStore({
  reducer: {
    todo
  },
  middleware
})

export default store