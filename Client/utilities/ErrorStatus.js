"use client";


import { useEffect, useState } from 'react'

const ErrorStatus = ({error}) => {
  const [err, setErr] = useState()

  useEffect(() => {
    if (error) {

      for (const [key, value] of Object.entries(error)) {
        setErr(value)
      }
    }
    
  }, [error])

  return (
    <div className={`required-msg ${error && 'failed'}`}>
        <ul>
          {
            err && 
            <li key={err}>{err}</li>
          }
        </ul>
    </div>
  )
}

export default ErrorStatus