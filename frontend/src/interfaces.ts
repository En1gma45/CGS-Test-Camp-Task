export type Todo = {
  title:string,
  completed: boolean,
  description: string,
  public: boolean,
  year: number,
  _id:string | null 
}
export interface IAction {
  payload?: any;
  type:string
}