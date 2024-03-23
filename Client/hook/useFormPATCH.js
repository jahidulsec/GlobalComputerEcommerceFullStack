"use client";


import { useState } from "react";


export const useFormPATCH = () => {
    const [error, setError] = useState()
    const [loading, setLoading] = useState()
    const [success, setSuccess] = useState(false)
    


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


    const handleFormPATCH = async(name, id, body, token) => {
        try {
            setLoading(true)
            await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/${process.env.NEXT_PUBLIC_API_VERSION}/${name}/${id}`, {
                method: 'PATCH',
                headers: {
                    "Authorization": "Token "+ token,
                },
                body: body,
            }).then(response => {
                if (response.status !== 200) {
                    response.json()
                        .then(data => {
                            setError(item => {
                                return data
                            })
                        })
                    handleFailed()

                } else {
                    handleSuccess()
                    setSuccess(true)
                }
            }).then(data => {
                setSuccess(true)
                
            })
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return [loading, error, success, handleFormPATCH]
}