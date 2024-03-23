"use client";


import { createContext, useContext, useState } from 'react'


const showDptContext = createContext(undefined)

function ShowDptProvider({children}) {

    const [showDpt, setShowDpt] = useState(false)

  return (
    <showDptContext.Provider
        value={{
            showDpt,
            setShowDpt
        }}
    >
        {children}
    </showDptContext.Provider>
  )
}

export default ShowDptProvider


export const useShowDptContext = () => useContext(showDptContext)