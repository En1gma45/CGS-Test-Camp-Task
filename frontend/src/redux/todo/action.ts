import { createAction } from "@reduxjs/toolkit";
import { ITodoGetRequest } from './interfacesActions'
import {Todo} from '../../interfaces'
interface IError {
  status: string,
  code: number,
  message:string
}
interface ITodoPostTodoSuccess{
  type: "todoPostTodoSuccess",
  payload:Todo
}
// const todoGetRequest = createAction("/todoGetRequest")
const todoGetRequest = ():ITodoGetRequest => ({
  type: "todoGetRequest"
})
const todoGetSuccess = (todos: Todo[]) => ({
  type: "todoGetSuccess",
  payload:todos
})
// const todoGetSuccess = createAction("/todoGetSuccess",(payload?:object) => {
//   return {
//     payload
//   }
// })
const todoGetError = (error:IError) => ({
  type: "/todoGetError",
  payload:error
})
// const todoGetError = createAction("/todoGetError",(payload:object) => {
//   return {
//     payload
//   }
// })

const todoUpdateTodoRequest = createAction("/todoUpdateTodoRequest")
const todoUpdateTodoSuccess = createAction("/todoUpdateTodoSuccess",(payload:object) => {
  return {
    payload
  }
})
const todoUpdateTodoError = createAction("/todoUpdateTodoError",(payload:object) => {
  return {
    payload
  }
})

const todoPostTodoRequest = createAction("/todoPostTodoRequest")
const todoPostTodoSuccess = (post:Todo):ITodoPostTodoSuccess => ({
  type: "todoPostTodoSuccess",
  payload:post
})
// const todoPostTodoSuccess = createAction("/todoPostTodoSuccess",(payload:object) => {
//   return {
//     payload
//   }
// })
const todoPostTodoError = createAction("/todoPostTodoError",(payload:object) => {
  return {
    payload
  }
})

const todoDeleteRequest = createAction("/todoDeleteRequest")
const todoDeleteSuccess = createAction("/todoDeleteSuccess",(payload:object) => {
  return {
    payload
  }
})
const todoDeleteError = createAction("/todoDeleteError",(payload:object) => {
  return {
    payload
  }
})

export default {
  todoGetRequest,
  todoGetSuccess,
  todoGetError,
  todoUpdateTodoRequest,
  todoUpdateTodoSuccess,
  todoUpdateTodoError,
  todoPostTodoRequest,
  todoPostTodoSuccess,
  todoPostTodoError,
  todoDeleteRequest,
  todoDeleteSuccess,
  todoDeleteError
}

