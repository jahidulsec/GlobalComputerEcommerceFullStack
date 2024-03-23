"use client";

import DoubleRangeInput from "@/utilities/DoubleRangeInput";
import FilterCheckbox from "@/utilities/FilterCheckbox";
import { toTitleCase } from "@/utilities/toTitleCase";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";



const CatPage = ({children, params}) => {

    const [filterShow, setFilterShow] = useState(false)
    const [size, setSize] = useState(12)
    const [order, setOrder] = useState(``)
    const [status, setStatus] = useState([])

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

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
        let isSelected = e.target.checked
        let value = e.target.value

        if (isSelected) {
            setStatus([...status, value])
        } else {
            setStatus(prev => {
                return prev.filter((name) => {
                    return name != value
                })
            })
        }
    }


    useEffect(() => {
        router.push(pathname + '?' + createQueryString('size', size, 12))
    }, [size])

    useEffect(() => {
        router.push(pathname + '?' + createQueryString('sorting', order, '')) 
    }, [order])

    useEffect(() => {
        router.push(pathname + '?' + createQueryString('status', status, '')) 
    }, [status])
  
  return (
    <section className='cat-page'>

        <div className={`single-category ${filterShow && `show-filter`}`}>
            <div className="container">
                <div className="wrapper">

                    <div className="column">
                        <div className="holder">
                            <div className="row sidebar">
                                <div 
                                    className={`filter ${filterShow ? 'show':''}`}
                                >

                                    <div className="filter-block pricing">
                                        <h4>Price Range</h4>
                                        <div className="price-slider">
                                            <DoubleRangeInput />
                                        </div>
                                    </div>

                                    <div className="filter-block">
                                        <h4>Availability</h4>
                                        <ul>
                                            
                                            <li>
                                                <input 
                                                    type="checkbox" 
                                                    name='in_stock' 
                                                    id="in_stock" 
                                                    value={1}
                                                    defaultValue={1}
                                                    onChange={checkboxHandler}
                                                />
                                                <label htmlFor='in_stock'>
                                                    <span className="checked"></span> <span>In Stock</span>
                                                </label>
                                            </li>
                                            <li>
                                                <input 
                                                    type="checkbox" 
                                                    name='not_stock' 
                                                    id="not_stock" 
                                                    value={0}
                                                    defaultValue={0}
                                                    onChange={checkboxHandler} 
                                                />
                                                <label htmlFor='not_stock'>
                                                    <span className="checked"></span> <span>Out of Stock</span>
                                                </label>
                                            </li>
                                                
                                        </ul>
                                    </div>
                                    {
                                        // params.cat &&
                                        //     <div className="filter-block">
                                        //         <FilterCheckbox filterName={params.cat} />
                                        //     </div>
                                    }

                                </div>
                            </div>
                            <section className='section'>
                                <div className="row">
                                    <div className="cat-head">
                                        <div className="breadcrump">
                                            <ul className="flexitem">
                                                <li><Link href="/">Home</Link></li>
                                                <li>{toTitleCase(params.cat || params.name)}</li>            
                                                
                                            </ul>
                                        </div>
                                        <div className="page-title">
                                            <h1>{toTitleCase(params.brand || params.cat || params.name)} {searchParams.has('q') ? <span>{searchParams.get('q').replace('+', ' ')}</span> : null}</h1>
                                        </div>
                                        <div className="cat-navigation flexitem">
                                            <div className="item-filter desktop-hide">
                                                <button
                                                    className="filter-trigger label"
                                                    onClick={() => {setFilterShow(!filterShow)}}
                                                >
                                                    <i className="ri-menu-2-line ri-2x"></i>
                                                    <span>Filter</span>
                                                </button>
                                            </div>

                                            <div className="item-sorting">
                                                <select 
                                                    defaultValue={``}
                                                    name="price-sorting" 
                                                    id="price-sorting"
                                                    title='Price Sorting'
                                                    onChange={(e) => {setOrder(prev => {
                                                        if (e.target.value == 1) {
                                                            return `price`
                                                        } 
                                                        if (e.target.value == 2) {
                                                            return `-price`
                                                        } else {
                                                            return ``
                                                        }
                                                    })}}
                                                >
                                                    <option value="">Sorting</option>
                                                    <option value="1">Price (Low {`>`} High)</option>
                                                    <option value="2">Price (High {`>`} Low)</option>
                                                </select>
                                            </div>

                                            <div className="item-perpage mobile-hide">
                                                <div className="label">Items {size} per page</div>
                                                <div className="desktop-hide">10</div>
                                            </div>

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
                                                    <option value="12">Size</option>
                                                    <option value="24">24</option>
                                                    <option value="36">36</option>
                                                </select>
                                            </div>


                                        </div>
                                    </div>
                                </div>


                                {/* featured products */}
                                {children}

                            </section>
                        </div>
                    </div>
                </div>
            </div>
            <div className="overlay desktop-hide" onClick={() => {setFilterShow(false)}}></div>
        </div>
    </section>
  )
}

export default CatPage