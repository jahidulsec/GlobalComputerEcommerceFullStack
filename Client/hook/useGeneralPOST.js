"use client";


import { useState } from "react";


export const useGeneralPOST = () => {
    const [error, setError] = useState()
    const [loading, setLoading] = useState()
    const [success, setSuccess] = useState(false)
    const [response, setResponse] = useState()
    
    const handleSuccess = () => {
        setTimeout(() => {
            setSuccess(false)
        }, 2000);
    }

    const handleFailed = () => {
        setTimeout(() => {
            setError(false)
        }, 5000);
    }


    const handleGeneralPOST = async(name, body, token, auth) => {

        const header = new Headers()
        header.append("Content-Type", "application/json")
        if (token) {
            header.append('Authorization', 'Token ' + token)
        }

        try {
            setLoading(true)
            await fetch(process.env.NEXT_PUBLIC_API_URL + `/${auth ?`auth`:`api`}/${process.env.NEXT_PUBLIC_API_VERSION}/${name}/`, {
                method: 'POST',
                headers: header,
                body: JSON.stringify(body),
            }).then(response => {
                if (response.status == 401) {
                    response.json()
                        .then(data => {
                            setError(item => {
                                return {'details': 'Login First!'}
                            })
                        })
                    handleFailed()
                }
                else if (!response.ok) {
                    response.json()
                        .then(data => {
                            setError(item => {
                                return data
                            })
                        })
                    handleFailed()

                } 
                
                else {
                    handleSuccess()
                    setSuccess(true)
                    response.json()
                        .then(data => {
                            setResponse(item => {
                                return data
                            })
                        })
                }
            })
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return [loading, error, success, handleGeneralPOST, response]
}