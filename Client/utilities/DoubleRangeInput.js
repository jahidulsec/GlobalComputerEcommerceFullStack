'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react'

const DoubleRangeInput = () => {

    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(1000000)

    const [minRange, setMinRange] = useState(0)
    const [maxRange, setMaxRange] = useState(1000000)

    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

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

    useEffect(() => {
        router.push(pathname + '?' + createQueryString('max', maxPrice, 1000000))
    }, [maxPrice])

    useEffect(() => {
        router.push(pathname + '?' + createQueryString('min', minPrice, 0))
    }, [minPrice])


  return (
    <div className="range">
        <div className="range-slider">
            <span 
                className="range-selected"
                style={
                    {
                        left: `${100 - (maxRange - minPrice) * 100 / (maxRange - minRange) }%`, 
                        right: `${100 - (maxPrice - minRange) * 100 / (maxRange - minRange) }%`
                    }
                }
            ></span>
        </div>
        <div className="range-input">
            <input 
                type="range" 
                className="min" 
                min={minRange} 
                max={maxRange} 
                value={minPrice}  
                defaultValue={0}
                step="10"
                onChange={(e) => {
                    setMinPrice(prev => {
                        if ((parseInt(e.target.value) + 100) < maxPrice) {
                            return e.target.value
                        } else {
                            return parseInt(maxPrice) - 100
                        }
                    })
                }}
            />
            <input 
                type="range" 
                className="max" 
                min={minRange} 
                max={maxRange}
                value={maxPrice} 
                defaultValue={100000}
                step="10"
                onChange={(e) => {
                    setMaxPrice(prev => {
                        if ((parseInt(e.target.value) - 100) > minPrice) {
                            return e.target.value
                        } else {
                            return parseInt(minPrice) + 100
                        }
                    })
                }}
            />
        </div>
        <div className="range-price">      
            <label htmlFor="min">Min</label>
            <input type="number" name="min" value={minPrice} defaultValue={0} />      
            <label htmlFor="max">Max</label>
            <input type="number" name="max" value={maxPrice} defaultValue={1000000} />      
        </div>
    </div> 
  )
}

export default DoubleRangeInput