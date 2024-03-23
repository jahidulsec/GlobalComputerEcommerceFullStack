"use client";


import { useState } from "react";


export const useGeneralPATCH = () => {
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


    const handleGeneralPATCH = async(name, id, body, token, formdata) => {
        try {

            const headerOpt = new Headers();
            if (!formdata) {
                headerOpt.append('Content-Type', `application/json`)
            }
            headerOpt.append('Authorization', `Token ${token}`)

            let bodyData;
            if (formdata) {
                bodyData = body
            } else {
                bodyData = JSON.stringify(body)
            }
            
            setLoading(true)
            await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/${process.env.NEXT_PUBLIC_API_VERSION}/${name}/${id}`, {
                method: 'PATCH',
                headers: headerOpt,
                body: bodyData,
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
            })
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return [loading, error, success, handleGeneralPATCH]
}