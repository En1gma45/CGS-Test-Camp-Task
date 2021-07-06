import React,{ useState } from 'react'

export interface useFormProps {
  
}
interface InitialState{
  title: string,
  description: string,
  year: number,
  public: boolean,
  completed:boolean
}
const useForm: React.SFC<useFormProps> = (initialState:InitialState,onSubmit = () =>{}) => {
  const [data, setdata] = useState(initialState)
  const handleChange = ({target}) => {
    const { name, value } = target
    setdata({
      ...data,
      [name]:value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(data)
    setdata(initialState)
  }
  return [data,setdata,handleChange,handleSubmit]
}
 
export default useForm;