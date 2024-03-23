"use client";

import { createContext, useState, useContext } from "react"; 

const BuildContext = createContext()

export const BuildContextProvider = ({children}) => {
    
    const [parts, setParts] = useState({
        "processor": {
            title: "",
            price: "",
            image: "",
        },
        "cpu-cooler": {
            title: "",
            price: "",
            image: "",
        },
        "motherboard": {
            title: "",
            price: "",
            image: "",
        },
        "ram-desktop": {
            title: "",
            price: "",
            image: "",
        },
        "ssd": {
            title: "",
            price: "",
            image: "",
        },
        "graphics-card": {
            title: "",
            price: "",
            image: "",
        },
        "power-supply": {
            title: "",
            price: "",
            image: "",
        },
        "casing": {
            title: "",
            price: "",
            image: "",
        },
        "monitor": {
            title: "",
            price: "",
            image: "",
        },
        "casing-cooler": {
            title: "",
            price: "",
            image: "",
        },
        "keyboard": {
            title: "",
            price: "",
            image: "",
        },
        "mouse": {
            title: "",
            price: "",
            image: "",
        },
        "headphone": {
            title: "",
            price: "",
            image: "",
        },
        "ups": {
            title: "",
            price: "",
            image: "",
        },
    })


    let total = 0;
    for(let key in parts) {
        if (parts[key].price) {
            total += parseInt(parts[key].price)
        } 
    }



    return (
        <BuildContext.Provider
            value={{
                parts,
                onParts: setParts,
                total
            }}
        >
            {children}
        </BuildContext.Provider>
    )
}


export const useBuildContext = () => useContext(BuildContext)