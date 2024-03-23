'use client';


import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation';
import { useGeneralGET } from '@/hook/useGeneralGET';
import NoItem from '@/utilities/NoItem';
import { useSearchQuery } from '@/hook/useSearchQuery';
import Link from 'next/link';
import Image from 'next/image';
import { useShowDptContext } from '@/context/ShowDptContext';
import { currencyFormat } from '@/utilities/currencyFormat';
import { useAuthContext } from '@/context/AuthContext';

const HeaderMain = () => {
    const [ query, setQuery ] = useState(``)
    const [ showList, setShowList ] = useState(false)

    const [sideCat, handleSideCatGET] = useGeneralGET()
    const [product, handleProductGET] = useGeneralGET()
    const [searchProduct, handleSearchProductGET] = useSearchQuery()

    const searchListRef = useRef(undefined)
    const dptCatRef = useRef(undefined)

    const pathname = usePathname()
    const router = useRouter()

    const {user, auth} = useAuthContext()
    const {showDpt, setShowDpt} = useShowDptContext()


    useEffect(() => {
        setShowList(false)
    }, [pathname])

    useEffect(() => {
        const handleShow = (e) => {
            const searchList = searchListRef.current
            if (searchList != undefined && !searchList.contains(e.target)) {
                setShowList(false)
            }
        }

        document.addEventListener('click', handleShow)

        return () => {
            document.removeEventListener('click', handleShow)
        }
    }, [showList])

    useEffect(() => {
        const dptCatOpt = document.querySelectorAll('.dpt-menu li a')

        const handleShowDpt = (e) => {
            const dptCat = dptCatRef.current

            if (dptCat != undefined && !dptCat.contains(e.target)) {
                setShowDpt(false)
            } 
        }

        document.addEventListener('click', handleShowDpt)
        dptCatOpt.forEach(opt => {
            opt.addEventListener('click', () => {
                setShowDpt(false)
            })
        });

        return () => {
            document.removeEventListener('click', handleShowDpt)
        }
        
    },[showDpt])

    useEffect(() => {
        handleSideCatGET({name:`side-menu`})
        handleProductGET({name: 'product', size: 1})
    },[])


    const handleLogout = async() => {
        await fetch(process.env.NEXT_PUBLIC_API_URL + `/auth/${process.env.NEXT_PUBLIC_API_VERSION}/token/logout/` , {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Token ' + auth
            }
        })
            
        localStorage.setItem('glc_t', '')
        location.reload()
        
    }



    const handleSearch = (e) => {
        setQuery(e.target.value)
        setShowList(true)
    }

    useEffect(() => {
        handleSearchProductGET(`product`, `/search/${query}`, 3, 1)
    }, [query])


    const handleSubmit = (e) => {
        e.preventDefault()
        let url_Str = query.replace(` `, `+`)
    query && query.length != 0 && router.push(`/search?format=search&q=${url_Str}`)
    }



  return (
    pathname !== '/signup' && pathname !== '/login' && pathname.split(`/`)[1] !== 'password' && pathname !== '/reset-password' && pathname !== '/reset-status' && pathname.slice(0,10) !== '/dashboard' && 
    <header className='header-sticky'>
        <div className="header-main mobile-hide">
            <div className="container">
                <div className="wrapper flexitem">
                    <div className="left">
                        <div className={`dpt-cat ${showDpt ? 'showdpt' : ''}`} ref={dptCatRef}>
                            <div className="dpt-head">
                                <div className="main-text">All departments</div>
                                <div className="mini-text mobile-hide">Total {product && product.count} products</div>
                                {
                                    pathname !== '/' &&
                                    <span 
                                        className="dpt-trigger mobile-hide"
                                        onClick={() => {setShowDpt(!showDpt)}}
                                    >
                                        <i className="ri-menu-3-line ri-xl"></i>
                                        <i className="ri-close-line ri-xl"></i>
                                    </span>
                                }
                            </div>
                            <div className="dpt-menu">
                                <ul className="second-link">
                                    {
                                    sideCat &&
                                    sideCat != undefined &&
                                    sideCat.map((cat) => (
                                        <li 
                                            className={cat.sub_side_menu != 0 ? `has-child` : ``}
                                            key={cat.id}
                                        >
                                            
                                            <ul>
                                                {   
                                                    cat?.sub_side_menu &&
                                                    cat.sub_side_menu.map(list => (
                                                        <li key={list.id}>
                                                            <Link href={`/menu/${cat.slug}/${cat.query == 'brand' ? 'b' : 'c'}/${list.slug}`}>{list.name}</Link>
                                                        </li> 
                                                    )) 
                                                }
                                                
                                            </ul>
                                            <Link href={`/menu/${cat.slug}`}>
                                                <div className="icon-large"><i className={`ri-${cat.logo}`}></i></div>
                                                    {cat.title} 
                                                {
                                                    cat.sub_side_menu.length >= 1 &&
                                                        <div className="icon-small">
                                                            <i className="ri-arrow-right-s-line"></i>
                                                        </div>
                                                }
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="right flexitem">
                        <div className="search-box">
                            <form className='search' onSubmit={handleSubmit}>
                                <span className='icon-large'><i className="ri-search-line"></i></span>
                                <input 
                                    type="search" 
                                    placeholder='Search for products'
                                    onChange={handleSearch}
                                />
                                <button type='submit'>Search</button>
                            </form>
                            {
                                showList && 
                                    <ul className='search-list flexcol' ref={searchListRef}>
                                        {   
                                            searchProduct &&
                                            searchProduct!= undefined &&
                                            searchProduct.results != undefined &&
                                            searchProduct.results.length > 0 &&
                                            searchProduct.results
                                            .map(item => (
                                                <li key={item.id} className='flexitem'>
                                                    <Image
                                                        className='thumbnail'
                                                        src={item.images[0].image} 
                                                        alt={item.title} 
                                                        width={72}
                                                        height={72}
                                                    />
                                                    <div>
                                                        <span className='main-link'>
                                                            <Link href={`/product/${item.slug}`}>
                                                                {item.title}
                                                            </Link>
                                                        </span>
                                                        <span className='price'>{currencyFormat(item.price)}</span>
                                                    </div>
                                                </li>
                                            ))
                                        }
                                        {
                                            searchProduct &&
                                            searchProduct.count > 3 &&
                                            <li className='view-all flexitem'>
                                                <Link href={{pathname: '/search', query: {format: 'search', q: query.replace(` `,`+`)}}}>
                                                    <span>See more</span>
                                                    <span className="ri-arrow-right-line"></span>
                                                </Link>
                                            </li>
                                        }
                                        {
                                            searchProduct && 
                                            (searchProduct.results == undefined ||
                                            searchProduct.results.length == 0) &&
                                                <NoItem />
                                        }
                                    </ul>

                            }
                        </div>
                        <ul className='flexitem gap-1 main-link'>
                            {/* <li>|</li> */}
                            {   
                                !user ?
                                <>
                                    <li><Link href={`/login`}>Login</Link></li>
                                    <li>
                                        <Link href={`/signup`} className='secondary-btn'>
                                            Sign Up
                                        </Link>
                                    </li>
                                </> :
                                <li className='user second-link box-shadow'>
                                    {
                                        user && user.image ?
                                        <Image src={user?.image} alt={user.username} width={32} height={32} />
                                        :
                                        <div className='icon-small'>
                                            <span className='ri-user-3-line'></span>
                                        </div>
                                    }
                                    <ul role='list'>
                                        <li className='user__info'>
                                            {
                                                user && user.image ?
                                                <Image src={user?.image} alt={user.username} width={72} height={72} />
                                                :
                                                <div className='icon-small'>
                                                    <span className='ri-user-3-line'></span>
                                                </div>
                                            }
                                            <span>
                                                {user && (user?.first_name + ` ` + user?.last_name || user.username)}
                                            </span>
                                        </li>
                                        <li>
                                            <Link href={`/profile/${user?.username}/info`}>
                                                Profile
                                            </Link>
                                        </li>
                                        {
                                            user &&
                                            user.is_staff == false &&
                                                <li>
                                                    <Link href={`/profile/${user?.username}/order`}>
                                                        Order
                                                    </Link>
                                                </li>
                                        }
                                        {
                                            user &&
                                            user.is_staff &&
                                            <li><Link href={'/dashboard'}>Dashboard</Link></li>
                                        }
                                        <li onClick={handleLogout}>Logout</li>
                                    </ul>
                                </li>  
                            }

                        </ul>
                        
                    </div>
                </div>
            </div>
        </div>
    </header>

  )
}

export default HeaderMain