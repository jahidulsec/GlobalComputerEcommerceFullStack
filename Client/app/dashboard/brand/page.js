"use client";


import { useAuthContext } from '@/context/AuthContext';
import { useGeneralDEL } from '@/hook/useGeneralDEL';
import { useGeneralGET } from '@/hook/useGeneralGET';
import ButtonClose from '@/utilities/ButtonClose';
import DelStatus from '@/utilities/DelStatus';
import Loading from '@/utilities/Loading';
import NoItem from '@/utilities/NoItem';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react'



const BrandTable = () => {
    const {auth} = useAuthContext()
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()


    const [query, setQuery] = useState('')

    const [response, handleBrand, loading] = useGeneralGET()
    const [delStatus, handleDelBrand] = useGeneralDEL()

    const createQueryString = useCallback(
        (name, value) => {
          const params = new URLSearchParams(searchParams)
          if (value) {
              params.set(name, value)
          } else if (value.length == 0) {
            params.delete(name)
          }
     
          return params.toString()
        }, [searchParams]
    )

    useEffect(() => {
        router.push(pathname + '?' + createQueryString('q', query))
    }, [query])

    useEffect(() => {
        handleBrand({name: 'brand', order: 'title', search: query})
        window.scrollTo(0,0)
    },[delStatus, searchParams])


    const handleSearch = (e) => {
        setQuery(e.target.value)
    }


  return (
    <>
    <div className="dash-product__header flexitem">
        <div className="search-box">
            <form className='search'>
                <span className='icon-large'><i className="ri-search-line"></i></span>
                <input type="search" placeholder='Search' onChange={handleSearch}/>
            </form>
        </div>
    </div>
    <DelStatus delStatus={delStatus} />
    <div className="dash-table__container">

        <h2>Brand List</h2>
        <Loading loading={loading} />

        {
            loading == false &&
            <table className="dash-table">
                <thead>
                    <tr>
                        <th>Slug</th>
                        <th>Title</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        response && response.length !== 0 &&
                        response.map(item => (

                            <tr key={item.id} id={item.id}>
                                <td data-label='Slug'>
                                    <Link href={`/dashboard/brand/edit/${item.slug}`}>
                                        {item.slug}
                                    </Link>
                                </td>
                                <td data-label='Title'>{item.title}</td>
                                <td data-label='Delete'>
                                    <ButtonClose onClick={() => {handleDelBrand(`brand`, item.slug, auth)}} />
                                </td>
                            </tr>
                        )) 
                    }
                    
                </tbody>
            </table> 
        }
        {loading == false && response && response.length == 0 && <NoItem />}
    </div>


    </>

  )
}

export default BrandTable