"use client";


import { useEffect, useState } from 'react'

const IncDrecButton = ({onQty, countValue, unitPrice, productId}) => {

    const [count, setCount] = useState(countValue)

    useEffect(() => {
        onQty(productId, unitPrice, count)
        console.log(countValue)
    },[count])

    const adjustCount = (add) => {
        setCount((prevCount) => {
            if (prevCount  > 0) {
                return prevCount + add
            }
            else if (prevCount == 0) {
                return prevCount + 1
            }
        })
    }

  return (
    <>
        <button 
            type='button'
            className="minus" 
            onClick={() => {adjustCount(-1)}}
            disabled={count===1}
        >-</button>
        <input type="text" value={count} min={1}/>
        <button type='button' className='plus' onClick={() => {adjustCount(1)}}>+</button>
    </>
  )
}

export default IncDrecButton