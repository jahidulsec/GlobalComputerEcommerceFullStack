"use client";



import { useState } from "react";


export const useFormPOST = () => {
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


    const handleFormPOST = async(name, body, token) => {
        try {
            setLoading(true)
            const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/${process.env.NEXT_PUBLIC_API_VERSION}/${name}/`, {
                method: 'POST',
                headers: {
                    "Authorization": "Token "+ token,
                },
                body: body,
            })

            if (!res.ok) {
                res.json().then(data => {
                    setError(item => {
                        return data
                    })
                })
                handleFailed()
            } else {
                handleSuccess()
                setSuccess(true)
            }

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return [loading, error, success, handleFormPOST]
}