import { combineReducers } from "redux";
import {TodosActionType,TodoGetError,TodoPostTodoError,TodoUpdateTodoError,TodoGetSuccess,TodoPostTodoSuccess,TodoUpdateTodoSuccess,TodosError} from './interfacesActions'
import {Todo} from '../../interfaces'

const initialState:Todo[] = []
const todo = (state = initialState, action:TodosActionType) => {
  switch (action.type) {
    case TodoGetSuccess:
      return action.payload
    case TodoPostTodoSuccess:
      return [...state, action.payload]
    case TodoUpdateTodoSuccess:
    const updated = state.filter(elem => elem._id === action.payload._id)
    const idx = state.indexOf(updated[0])
    const newState = [...state]
      newState.splice(idx, 1, action.payload)
      return newState
    default:
      return state
   }
}
const errorState:boolean = false
const error = (state = errorState, action:TodosError) => {
  switch (action.type) {
    case TodoGetError:
      return true
    case TodoPostTodoError:
      return true
    case TodoUpdateTodoError:
      return true
    default:
      return state
  }
}
const rootReducer = combineReducers({
  todo,
  error
})
export default rootReducer