import { configureStore } from "@reduxjs/toolkit";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import todos from './todo/reducer'

const middleware = [...getDefaultMiddleware()]
const store = configureStore({
  reducer: {
    todos
  },
  middleware
})

export default store