import { useEffect, useState } from "react"

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms)); 



export const useLogin = () => {
    const [response, setResponse] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    

    const handleErrorReset = () => {
        setTimeout(() => {
            setError('')
        }, 5000)
    }


    const login = async(body) => {
        setLoading(true)
        try {
            await wait(1000);
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/auth/v1/token/login/', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body),
            })
               
            const bodyData = await response.json()

            if (bodyData) {
                if (response.status === 200) {
                    setResponse(bodyData)
                } else {
                    setError(bodyData)
                }
                setResponse(bodyData)
            }
            
        } catch (error) {
            console.error(error)

        } finally {
            setLoading(false)
            handleErrorReset()
        }
    }


    return { loading, response, error, login };

}