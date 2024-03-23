"use client";

import { createContext, useContext, useState } from 'react'

const SideMenuContext = createContext(undefined)

const SideMenuProvider = ({children}) => {

    const [showMenu, setShowMenu] = useState('')

  return (
    <SideMenuContext.Provider 
        value={{
            showMenu,
            setShowMenu
        }}
    >
        {children}
    </SideMenuContext.Provider>
  )
}

export default SideMenuProvider

export const useSideMenuContext = () => useContext(SideMenuContext)