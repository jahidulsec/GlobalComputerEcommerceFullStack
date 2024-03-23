'use client';


import { createContext, useContext, useState } from 'react'



const searchContext = createContext(undefined)

const SearchProvider = ({children}) => {

    const [showSearch, setShowSearch] = useState(false)

  return (
    <searchContext.Provider
        value={{
            showSearch,
            setShowSearch
        }}
    >
        {children}
    </searchContext.Provider>
  )
}

export default SearchProvider


export const useSearchContext = () => useContext(searchContext)