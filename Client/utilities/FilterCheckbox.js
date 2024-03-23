"use client";


import { useGeneralGET } from '@/hook/useGeneralGET'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import { toTitleCase } from './toTitleCase'

const FilterCheckbox = ({filterName}) => {

    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()


    const [query, setQuery] = useState([])
    const [fieldName, setFieldName] = useState('')

    const [response, handleResponseGET] = useGeneralGET()

    const createQueryString = useCallback(
        (name, value, defaultValue) => {
            const params = new URLSearchParams(searchParams)
            if (value && (value == defaultValue) ) {
                params.delete(name)
            } else if (value?.length == 0) {
                params.delete(name)
            } else {
                params.set(name, value)
            }
        
            return params.toString()
        
        }, [searchParams]
    )

    const checkboxHandler = (e) => {
        setFieldName(response.query)
        let isSelected = e.target.checked
        let value = e.target.value

        if (isSelected) {
            setQuery([...query, value])
        } else {
            setQuery(prev => {
                return prev.filter((name) => {
                    return name != value
                })
            })
        }
    }

    useEffect(() => {
        handleResponseGET({name:`side-menu`, id: filterName})
    },[filterName])

    useEffect(() => {
        router.push(pathname + '?' + createQueryString(`${fieldName}`, query, ''))
    }, [query])

  return (

    <>
        {
            response &&
            <>
            <h4>{toTitleCase(response.query)}</h4>
            <ul>
                {
                    response.sub_side_menu.map(item => (
                        <li key={item.id}>
                            <input 
                                type="checkbox"
                                name={item.slug}
                                id={item.slug}
                                value={item.slug}
                                onChange={checkboxHandler}

                            />
                            <label htmlFor={item.slug}>
                                <span className="checked"></span> <span>{item.name}</span>
                            </label>
                        </li>
                    ))
                }
            </ul>
            </>
        }
        
    </>
    
  )
}

export default FilterCheckbox