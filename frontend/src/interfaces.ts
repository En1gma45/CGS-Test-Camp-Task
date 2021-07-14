export type Todo = {
  title:string,
  completed: boolean,
  description: string,
  public: boolean,
  year: string,
  _id:string | null 
}
export interface IAction {
  payload?: any;
  type:string
}