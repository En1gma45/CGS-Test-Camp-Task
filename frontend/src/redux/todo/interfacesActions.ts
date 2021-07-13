import { Todo } from "../../interfaces"
export const TodoGetRequest = 'todoGetRequest'
export const TodoGetSuccess = "todoGetSuccess"
export const TodoPostTodoSuccess = "todoPostTodoSuccess"
export const TodoUpdateTodoSuccess = "todoUpdateTodoSuccess"

export interface ITodoGetRequest {
  type: typeof TodoGetRequest,
}
export interface ITodoGetSuccess {
  type: typeof TodoGetSuccess,
  payload:Todo[]
}
export interface ITodoPostTodoSuccess{
  type:typeof TodoPostTodoSuccess,
  payload:Todo
}
export interface ITodoUpdateTodoSuccess {
  type: typeof TodoUpdateTodoSuccess,
  payload: Todo
}
export type TodosActionType = ITodoGetRequest | ITodoGetSuccess | ITodoPostTodoSuccess | ITodoUpdateTodoSuccess

export const TodoGetError = "todoGetError"
export const TodoPostTodoError = 'todoPostTodoSuccess'
export const TodoUpdateTodoError = 'todoUpdateTodoSuccess'

export interface ITodoGetError{
  type: typeof TodoGetError
}
export interface ITodoPostTodoError{
  type: typeof TodoPostTodoError
}
export interface ITodoUpdateTodoError{
  type: typeof TodoUpdateTodoError
}
export type TodosError = ITodoGetError | ITodoPostTodoError | ITodoUpdateTodoError