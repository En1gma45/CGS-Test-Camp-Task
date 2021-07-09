import { createAction } from "@reduxjs/toolkit";

const todoGetRequest = createAction("/todoGetRequest")
const todoGetSuccess = createAction("/todoGetSuccess",(payload?:object) => {
  return {
    payload
  }
})
const todoGetError = createAction("/todoGetError",(payload:object) => {
  return {
    payload
  }
})

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
const todoPostTodoSuccess = createAction("/todoPostTodoSuccess",(payload:object) => {
  return {
    payload
  }
})
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

