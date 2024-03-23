'use client';

import { createContext, useContext, useState } from 'react'

const showCartContext = createContext(undefined)


const ShowCartProvider = ({children}) => {

    const [showCart, setShowCart] = useState('')

  return (
    <showCartContext.Provider
        value={{
            showCart,
            setShowCart
        }}
    >
        {children}
    </showCartContext.Provider>
  )
}

export default ShowCartProvider


export const useShowCartContext = () => useContext(showCartContext)