import HTTPService from "../../shared/httpService/service";
import todoActions from "./action"
import endpoints from '../../shared/httpService/endpoints'
import { Dispatch } from "react";
import { IAction } from '../../interfaces'

const getTodo = () =>async (dispatch:Dispatch<IAction>) => {
  dispatch(todoActions.todoGetRequest())
  try {
    const { data } = await HTTPService.get()
    dispatch(todoActions.todoGetSuccess(data))
  } catch (error) {
    dispatch(todoActions.todoGetError(error))
  }
}
const postTodo = (todo:object) => async (dispatch:Dispatch<IAction>) => {
  dispatch(todoActions.todoPostTodoRequest())
  try {
    const { data } = await HTTPService.put(endpoints.create,todo)
    dispatch(todoActions.todoPostTodoSuccess(data))
  } catch (error) {
        dispatch(todoActions.todoPostTodoError(error))
  }
}
const updateTodo = (todo:object,id:string) => async (dispatch:Dispatch<IAction>) => {
  dispatch(todoActions.todoUpdateTodoRequest())
    try {
      const { data } = await HTTPService.put(endpoints.update(id),todo)
      dispatch(todoActions.todoUpdateTodoSuccess(data))
  } catch (error) {
    dispatch(todoActions.todoUpdateTodoError(error))
  }
}
const deleteTodo = (id: string) => async (dispatch:Dispatch<IAction>) => {
    dispatch(todoActions.todoDeleteRequest())
    try {
      const { data } = await HTTPService.delete(endpoints.deleteTodo(id))
      dispatch(todoActions.todoDeleteSuccess(data))
  } catch (error) {
        dispatch(todoActions.todoDeleteError(error))
  }
}
export default {
  getTodo,
  postTodo,
  updateTodo,
  deleteTodo
}