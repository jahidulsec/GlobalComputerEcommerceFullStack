'use client';

import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(undefined)

const getAuthLocalData = () => {
    let localAuthData = localStorage.getItem('glc_t')
    if (localAuthData != undefined) {
        return ``
    } else {
        return JSON.parse(localAuthData)
    }
}


export const AuthProvider = ({children}) => {

    

    const [auth, setAuth] = useState('')    
    const [user, setUser] = useState('') 
    const [groups, setGroups] = useState('') 
    const {pathname} = usePathname()  

    


    const fetchUserData = async() => {
        if (auth) {
            await fetch(process.env.NEXT_PUBLIC_API_URL+`/auth/${process.env.NEXT_PUBLIC_API_VERSION}/users/me/`, {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Token " + auth, 
                }
            })  
                .then(response => {
                    if(response.status == 401) {
                        throw new Error()
                    }
                    else {
                        response.json().then(data => {
                            setUser(data)
                        })
                    }
                })
                .catch(error => {
                    localStorage.setItem('glc_t','')
                })
        }
    }

    const getUserGroup = async() => {
        if (user) {
            await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/${process.env.NEXT_PUBLIC_API_VERSION}/user-profile/${user.username}`, {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Token " + auth, 
                }
            }).then(res => res.json())
                .then(data => {
                    setGroups(data?.groups)
                })
        }
    }



    useEffect(() => {
        fetchUserData()
    }, [auth, pathname])

    useEffect(() => {
        getUserGroup()
    },[user, pathname])

    return (
        <AuthContext.Provider
            value={{
                auth,
                user,
                groups,
                onAuth: (token) => {setAuth(token)}
            }}
        >
            {children}
        </AuthContext.Provider>
    )
   
}

export const useAuthContext = () => useContext(AuthContext)