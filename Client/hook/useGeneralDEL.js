import { useState } from "react"



export const useGeneralDEL = () => {

    const [delStatus, setDelStatus] = useState(false)

    const handleDelStatus = () => {
        setTimeout(() => {
            setDelStatus(false)
        }, 5000);
    }


    const handleDel = async(name, id, token) => {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/${process.env.NEXT_PUBLIC_API_VERSION}/${name}/` + id, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + token, 
            }
        })
        
        if (!res.ok) {
            throw new Error('Something went wrong!')
        }

        setDelStatus(!delStatus)
        handleDelStatus()
    }

    return [delStatus, handleDel]
    

}