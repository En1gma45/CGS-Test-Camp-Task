import React, { MouseEvent } from "react";
import { Field } from "formik";
export interface CInputProps {
  idForInput: string,
  nameLabel: string,
  typeInput: string,
  value?: string,
  checked?: boolean,
  nameInput: string,
  handleChangeInput?(event: React.ChangeEvent<HTMLInputElement>): void,
  handleChangeCheckBox?(event: React.ChangeEvent<HTMLInputElement>): void,
  handleClick?(event:React.MouseEvent<HTMLInputElement>):void 
}
 
const CInput: React.SFC<CInputProps> = ({idForInput,nameLabel,typeInput,value,checked,nameInput,handleClick,handleChangeInput,handleChangeCheckBox}) => {
  return (
    <>
    <label htmlFor={idForInput}>{nameLabel}</label>
      <Field onClick={handleClick} onChange={handleChangeInput || handleChangeCheckBox} id={idForInput} type={typeInput} name={nameInput} value={value} checked={checked}/>
      </>
   );
}
 
export default CInput;