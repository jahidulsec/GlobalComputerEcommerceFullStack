"use client";


import { useAuthContext } from '@/context/AuthContext';
import { useGeneralDEL } from '@/hook/useGeneralDEL';
import { useGeneralGET } from '@/hook/useGeneralGET';
import ButtonClose from '@/utilities/ButtonClose';
import DelStatus from '@/utilities/DelStatus';
import Loading from '@/utilities/Loading';
import NoItem from '@/utilities/NoItem';
import PaginationProduct from '@/utilities/PaginationProduct';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react'



const KeyFeatureTable = () => {
    const {auth} = useAuthContext()

    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const [size, setSize] = useState(12)

    const page = searchParams.get('page')

    const [query, setQuery] = useState('')

    const [response, handleKeyFeature, loading] = useGeneralGET()
    const [delStatus, handleKeyFeatureDEL] = useGeneralDEL()


    useEffect(() => {
        router.push(pathname + '?' + createQueryString('size', size, 12))
    }, [size])

    useEffect(() => {
        router.push(pathname + '?' + createQueryString('q', query))
    }, [query])


    useEffect(() => {
        handleKeyFeature({name:`product`,order:`-id`, page:page || 1, size: size, search: query})
    },[searchParams, delStatus, query])


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

    const handleSearch = (e) => {
        setQuery(e.target.value)
    }



  return (
    <>
        <div className="dash-product__header flexitem">
            <div className="item-sorting">
                <select 
                    defaultValue={`12`}
                    name="size-sorting" 
                    id="size-sorting"
                    title='Page Size'
                    onChange={(e) => {
                        setSize(e.target.value)
                    }}
                >
                    <option value="12">Default Size</option>
                    <option value="24">24</option>
                    <option value="36">36</option>
                </select>
            </div>
            <div className="search-box">
                <form className='search'>
                    <span className='icon-large'><i className="ri-search-line"></i></span>
                    <input type="search" placeholder='Search' onChange={handleSearch}/>
                </form>
            </div>
        </div>

    <DelStatus delStatus={delStatus} />

    <div className="dash-table__container">
        <h2>Key Feature List</h2>
        <Loading loading={loading} />
        {
            loading == false &&
                <table className="dash-table">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Thumbnail</th>
                            <th>#Key Features</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            response && response?.results.length !== 0 &&
                            response?.results.map(item => (

                                <tr key={item.id} id={item.id}>
                                    <td >
                                        <Link href={`/dashboard/key-feature/edit/${item.id}`}>
                                            <span>
                                                {item.title}
                                            </span>
                                        </Link>
                                    </td>
                                    <td data-label='Thumbnail'>
                                        <Image className='thumbnail' src={item.images[0] && item.images[0].image} alt={item.title} width={80} height={80} loading='lazy' />
                                    </td>
                                    <td data-label='#Key Features'>
                                        <ul>
                                        {
                                            item.key_features.length != 0 ?
                                            item?.key_features.map(feature => (
                                                <li 
                                                    key={feature.field_name}
                                                    className='medium-text'
                                                >
                                                    {feature.field_name}
                                                </li>
                                            ))
                                            :
                                            <span className='medium-text'>No features been added</span>
                                        }
                                        </ul>

                                    </td>
                                    <td data-label='Delete'>
                                        <ButtonClose onClick={() => {handleKeyFeatureDEL(`feature`, item.id, auth)}} />
                                    </td>
                                </tr>
                            )) 
                        }
                        
                    </tbody>
                </table>
        }

        {loading == false && response && response.results.length == 0 && <NoItem />}
    </div>

    <PaginationProduct
        response={response}
        page={page || 1}
        size={size || 12}
    />


    
    </>
    
  )
}

export default KeyFeatureTable