import React from 'react'

const InputText = ({name, type="text", id=name, value, onChange, onBlur, label, children}) => {
  return (
    <p className='input-text'>
        <input 
            type={type}
            name={name}
            id={id}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
        />
        <label htmlFor={name}>{label}</label>
        {
            children
        }
    </p>
  )
}

export default InputText