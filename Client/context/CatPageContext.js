'use client';


import { createContext, useContext, useState } from 'react'

const catPageContext = createContext()


const CatPageProvider = ({children}) => {

    const [pageNumber, setPageNumber] = useState(1)
    const [order, setOrder] = useState(``)
    const [size, setSize] = useState(12)

  return (
    <catPageContext.Provider
        value={{
            pageNumber,
            order,
            size,
            onSize: setSize,
            onPageNumber: setPageNumber,
            onOrder: setOrder
        }}
    >
        {children}
    </catPageContext.Provider>
  )
}

export default CatPageProvider


export const useCatPageContext = () => useContext(catPageContext)