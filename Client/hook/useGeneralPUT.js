'use client';

import { useState } from "react";


export const useGeneralPUT = () => {
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


    const handleGeneralPUT = async(name, id, body, token) => {
        try {
            setLoading(true)
            const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/${process.env.NEXT_PUBLIC_API_VERSION}/${name}/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Token "+ token,
                },
                body: JSON.stringify(body)
            })

            if (!res.ok) {
                response.json()
                    .then(data => {
                        setError(item => {
                            return data
                        })
                    })
                handleFailed()
            }

            handleSuccess()
            setSuccess(true)
            
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return [loading, error, success, handleGeneralPUT]
}