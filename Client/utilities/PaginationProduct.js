"use client";


import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react'
import { HiOutlineArrowNarrowLeft, HiOutlineArrowNarrowRight } from 'react-icons/hi'

const PaginationProduct = ({response, page, size}) => {

    const [ppage, setPpage] = useState(page)
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const createQueryString = useCallback(
        (name, value) => {
          const params = new URLSearchParams(searchParams)
          params.set(name, value)
     
          return params.toString()
        }, [searchParams]
    )

    useEffect(() => {
        setPpage(page)
    }, [page])

    return (

    <>
    {
        response &&
        response?.results &&
        <div className="pagination flexitem">
            <div className="pagination-icons flexitem gap-1">
                {
                    page > 1 &&
                    <span className="icon" onClick={() => { router.push(pathname + '?' + createQueryString('page', parseInt(page)-1))}}>
                        <HiOutlineArrowNarrowLeft />
                    </span>
                }
                {
                    Math.ceil(response.count / size) > page &&
                    <span className="icon" onClick={() => {router.push(pathname + '?' + createQueryString('page', parseInt(page) + 1))}}>
                        <span className='mobile-hide'>Next Page</span>
                        <HiOutlineArrowNarrowRight />
                    </span>
                }
            </div>
            {
                response.count != 0 &&
                <div className="pagination-number">
                    <span>Page</span>
                    <input 
                        type="number" 
                        value={ppage} 
                        onChange={(e) => {setPpage(prev => {return parseInt(e.target.value)})}} 
                        min={1}
                        disabled={Math.ceil(response.count / size) < 2}
                        onKeyDown={(e) => {
                            if (e.key == 'Enter') {
                                router.push(pathname + '?' + createQueryString('page', e.target.value))
                            }
                        }}
                    />
                    <span>of {Math.ceil(response.count / size)}</span>
                </div>
            }
        </div>
    }
    </>
  )
}

export default PaginationProduct