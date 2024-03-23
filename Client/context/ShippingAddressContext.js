'use client';

import { createContext, useContext, useState } from "react";

const shippingAddressContext = createContext()

const ShippingAddressContextProvider = ({children}) => {

    const [address, setAddress] = useState({
        division:'',
        district: '',
        streetAddress: '',
    })


  return (
    <shippingAddressContext.Provider
        value={{
            address,
            onAddress: setAddress
        }}
    >
        {children}
    </shippingAddressContext.Provider>
  )
}

export default ShippingAddressContextProvider

export const useShippingAddressContext = () => useContext(shippingAddressContext)