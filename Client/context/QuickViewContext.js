"use client";

import { createContext, useContext, useState } from "react";


const QuickViewContext = createContext(undefined)

export const QuickViewProvider = ({children}) => {

    const [product, setProduct] = useState('')

    return (
        <QuickViewContext.Provider
            value={{
                product,
                onProduct: (item) => {setProduct(item)}
            }}
        >
            {children}
        </QuickViewContext.Provider>
    )
} 


export const useQuickViewContext = () => useContext(QuickViewContext)