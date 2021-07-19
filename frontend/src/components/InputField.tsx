import React from "react";


const InputField = ({className, size, id, name, type, placeholder}: {
    className: string, size: number, id: string, name: string, type: string, placeholder: string
}) => {
    return (
        <input className={className}
               size={size}
               id={id}
               name={name}
               type={type}
               placeholder={placeholder}/>
    )
}

export default InputField;