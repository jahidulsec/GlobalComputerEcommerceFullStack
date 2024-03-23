"use client";


import { useAuthContext } from '@/context/AuthContext';
import { useGeneralDEL } from '@/hook/useGeneralDEL';
import { useGeneralGET } from '@/hook/useGeneralGET';
import ButtonClose from '@/utilities/ButtonClose';
import DelStatus from '@/utilities/DelStatus';
import Loading from '@/utilities/Loading';
import NoItem from '@/utilities/NoItem';
import PaginationProduct from '@/utilities/PaginationProduct';
import StockStatus from '@/utilities/StockStatus';
import { currencyFormat } from '@/utilities/currencyFormat';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react'



const ProductTable = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const [size, setSize] = useState(12)

    const [query, setQuery] = useState('')

    const {auth} = useAuthContext()

    const page = searchParams.get('page')


    const [response, handleGet, loading] = useGeneralGET()
    const [delStatus, handleDelProduct] = useGeneralDEL()

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
        router.push(pathname + '?' + createQueryString('size', size, 12))
    }, [size])

    useEffect(() => {
        router.push(pathname + '?' + createQueryString('q', query))
    }, [query])

    useEffect(() => {
        handleGet({name:`product`,order:`-id`, page: page || 1, size: size || 12, search: query})
    },[ delStatus, query, searchParams])


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
            <h2>Product List</h2>
            <Loading loading={loading} />
            {
                loading == false &&
                    <table className="dash-table product">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Thumbnail</th>
                                <th>Category</th>
                                <th>Current Price</th>
                                <th>Stock Status</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            response && response?.results.length !== 0 &&
                                response.results.map(item => (

                                    <tr key={item.id} id={item.id}>
                                        <td>
                                            <Link href={`/dashboard/product/edit/${item.slug}`}>
                                                <span>{item.title}</span>
                                            </Link>
                                        </td>
                                        <td data-label='Thumbnail'>
                                            <Image className='thumbnail' src={item.images[0] && item.images[0].image} alt={item.title} width={80} height={80} loading='lazy' />
                                        </td>
                                        <td data-label='Category'>{item.category.title}</td>
                                        <td data-label='Current Price'>{currencyFormat(item.price)}</td>
                                        <td data-label='Stock Status'>
                                            <StockStatus stock={item.is_stock}/> 
                                        </td>
                                        <td data-label='Delete'>
                                            <ButtonClose onClick={() => {handleDelProduct(`product`, item.slug, auth)}} />
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

export default ProductTable