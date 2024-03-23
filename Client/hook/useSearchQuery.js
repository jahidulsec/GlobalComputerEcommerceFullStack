'use client';

import { useState } from "react"

export const useSearchQuery = () => {

    const [response, setResponse] = useState()
    const [loading, setLoading] = useState(false)

    const handleSearchQuery = async(name, field, size, page, token, ordering, min_price, max_price) => {
        try {
            setLoading(true)
            let url = process.env.NEXT_PUBLIC_API_URL + `/api/${process.env.NEXT_PUBLIC_API_VERSION}/${name}/`
            
            const headerOpt = new Headers();
            headerOpt.append('Content-Type', "application/json")
            if (token) {
                headerOpt.append('Authorization', `Token ${token}`)
            }

            let fields = field.split(`/`)
            if (fields.length != 0 && fields[1] == 'featured') {
                url += `?featured=true`
            }

            if (fields.length != 0 && fields[1] == 'trending') {
                url += `?offered=true`
            }

            if (fields.length != 0 && fields[1] == 'category') {
                url += `?category__slug=${fields[2]}`
            }

            if (fields.length == 4 && fields[1] == 'menu') {
                url += `?side_menu__slug=${fields[2]}`
            }

            if (fields.length == 6 && fields[1] == 'menu') {
                url += `?side_menu__slug=${fields[2]}
                    &brand__slug=${fields[3] == 'b' ?fields[4]: ''}
                    &category__slug=${fields[3] == 'c' ?fields[4]: ''}`
            }

            if ((fields.length != 0 && fields[1] == 'search' && fields[2].length > 0)) {
                url += `?search=${fields[2]}`
            }

            if (fields.length != 0 && fields[2].length > 0) {
                url += `&size=${size}&page=${page}&ordering=${ordering ? ordering : ``}&min_price=${min_price ? min_price : ``}&max_price=${max_price ? max_price : ``}`
            } 

            await fetch( url, 
                {
                    method: 'GET',
                    headers: headerOpt,
                })
                    .then(response => {
                        if (response.status !== 200) {
                            return
                        }
                        if (response.status == 404) {
                            throw new Error('not found!')
                        } else {
                            return response.json()
                        }
                    }).then(data => {
                        setResponse(cat => {
                            return data
                        })
                    })
            
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return [response, handleSearchQuery, loading]
}