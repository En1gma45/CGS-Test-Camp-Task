import { createReducer,PayloadAction } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import todoActions from './action'
import {Todo} from '../../interfaces'
interface IState {
  todos:Todo[]
}
const todos = createReducer([], {
  // [todoActions.todoGetSuccess.type]: (_, { payload }) => payload,
  [todoActions.todoPostTodoSuccess]: (state: [], action: PayloadAction<any>) => [ ...state, action.payload ],
  // [todoActions.todoUpdateTodoSuccess.type]: (state, { payload }) => {
  //   const updated = state.filter(elem => elem._id === payload._id)
  //   const idx = state.indexOf(updated)
  //   const newState = [...state]
  //   newState.splice(idx,1,payload)
  //   return newState
  }
})

// const error = createReducer(null, {
//   [todoActions.todoGetError.type]: (_, __) => true,
//   [todoActions.todoPostTodoError.type]: (_, __) => true,
//   [todoActions.todoUpdateTodoError.type]: (_, __) => true,
// })

const rootReducer = combineReducers({
  // todos,
  // error
})
export default rootReducer