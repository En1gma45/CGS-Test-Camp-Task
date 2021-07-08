import React,{ useState } from 'react'

// export interface useFormProps {
//   initialState: InitialState,
//   onSubmit():void
// }
// interface InitialState{
//   title: string,
//   description: string,
//   year: number,
//   public: boolean,
//   completed: boolean,
// }

// const useForm: React.SFC<useFormProps> =  (initialState,onSubmit) => {
//   const [data, setdata] = useState(initialState)
//   const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target
//     setdata({
//       ...data,
//       [name]:value
//     })
//   }
//   const handleSubmit = (e:React.ChangeEvent) => {
//     e.preventDefault()
//     onSubmit(data)
//     setdata(initialState)
//   }
//   return [data,setdata,handleChange,handleSubmit]
// }
 
// export default useForm;