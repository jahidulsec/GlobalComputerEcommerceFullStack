"use client";


import { useState } from 'react'

const PasswordField = ({value, onChange, onBlur, name, id, placeholder}) => {

    const [showPassword, setShowPassword] = useState(false)

  return (
    <span className='password-field'>
        <input 
            type={!showPassword? "password": "text"} 
            name={name} 
            id={id}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
        />
        <span 
            className={!showPassword ? "ri-eye-line" : "ri-eye-off-line"} 
            onClick={() => {setShowPassword(!showPassword)}}
        ></span>
    </span>
  )
}

export default PasswordField