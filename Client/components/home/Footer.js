"use client";


import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useCartContext } from '@/context/CartContext'
import { useAuthContext } from '@/context/AuthContext'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link';
import Button from '@/utilities/Button';
import SuccessStatus from '@/utilities/SuccessStatus';
import { useGeneralPOST } from '@/hook/useGeneralPOST';
import Image from 'next/image';
import { useSideMenuContext } from '@/context/SideMenuContext';
import { useSearchContext } from '@/context/SearchContext';
import { useShowCartContext } from '@/context/ShowCartContext';


const Footer = ({children}) => {

    const {auth, user} = useAuthContext()
    const {cart} = useCartContext()
    const {showMenu, setShowMenu} = useSideMenuContext()
    const {showSearch, setShowSearch} = useSearchContext()
    const {setShowCart} = useShowCartContext()
    
    const [loading, error, success, handleNewsletterPOST] = useGeneralPOST()

    const pathname = usePathname()
    const router = useRouter()
    const [footerMenuShow, setFooterMenuShow] = useState(``)

    const [ query, setQuery ] = useState(``)

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        onSubmit: async(values) => {
            handleNewsletterPOST(`newsletter`,values)
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Please enter a valid email!').required("enter your email!"),
        })
    })


    const handleSubmit = (e) => {
        e.preventDefault()
        query && router.push(`/search?format=search&q=${query.replace(` `,`+`)}`)
        setShowSearch(false)
    }


  
return (

    pathname.slice(0,10) !== '/dashboard' &&
    <footer className={`footer ${showMenu? `showmenu`: ''}`}>

        {/* newsletter section */}
        {
           pathname === '/' && 
            <section className="newsletter">
                <div className="container">
                    <div className="wrapper">
                        <div className="box">
                            <div className="content">
                                <h3>Join Our Newsletter</h3>
                                <p>Get email updates about our latest products and <strong>special offer</strong></p>
                            </div>
                            <form className='search' onSubmit={formik.handleSubmit} >
                                <span className="icon-large"><i className="ri-mail-line"></i></span>
                                <input 
                                    type="email" 
                                    name="email" 
                                    id="email" 
                                    placeholder='Your email address'
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {
                                    formik.errors.email && formik.touched.email &&
                                    <span className="required">{formik.errors.email}</span>
                                }
                                {
                                    error?.email &&
                                    <span className="required">{error.email}</span>
                                }
                                <Button
                                    type={'submit'}
                                    className={'secondary-btn'}
                                    loading={loading}
                                >
                                    Sign Up
                                </Button>

                                <SuccessStatus success={success} />

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        }

    


        {/* widgets section */}
        {pathname !== '/signup' && pathname !== '/login' &&
            <section className="widgets">
                <div className="container">
                    <div className="wrapper">
                        <div className="flexwrap gap-5">

                                <article className="item mini-link flexcol gap-1 mobile-hide">
                                    <h4>Stay Connected</h4>
                                    <p>
                                        <strong>Global Computer BD</strong> <br />
                                        Reliable Computer Laptop, Desktop & Component Retail Shop in Bangladesh. 
                                        <br />
                                        Get quality IT products and services delivered right to your location.
                                    <br />
                                        <strong>Head Office</strong> <br />
                                        47, M.E.F Center(2nd Floor), Shahid Shahidullah Kaisar Road, Feni-3900
                                    </p>

                                    {
                                        (auth == undefined || !auth) &&
                                        <Link href={`/signup`}>
                                            <button 
                                                type="button"
                                            >
                                                    Sign up
                                            </button>
                                        </Link>
                                    }
                                </article>


                                <div className="item mini-link footer__hide">
                                    <h4 onClick={() => {setFooterMenuShow(`category`)}}>
                                        <span>Categories</span> <span className={`ri-arrow-${footerMenuShow == 'category' ? 'up': 'down'}-s-line`}></span>
                                    </h4>
                                    <ul className={`flexcol ${footerMenuShow == `category` ? `show` : ``}`}>
                                        {
                                           children
                                        }
                                    </ul>
                                </div>


                                <div className="item mini-link footer__hide">
                                    <h4 onClick={() => {setFooterMenuShow(`about`)}}>
                                        <span>About us</span> <span className={`ri-arrow-${footerMenuShow == 'about' ? 'up': 'down'}-s-line`}></span>
                                    </h4>
                                    <ul className={`flexcol ${footerMenuShow == `about` ? `show` : ``}`}>
                                        <li><Link href={`/about`}>Company Info</Link></li>
                                        <li><Link href={`/career`}>Careers</Link></li>
                                        <li><Link href={`/policies`}>Policies</Link></li>
                                        <li><Link href={`/contact`}>Contact us</Link></li>
                                        <li><Link href={''}>Terms and Conditions</Link></li>
                                    </ul>
                                </div>

                        </div>
                    </div>
                </div>
            </section>
        }

        {/* info section */}
        {
            
        pathname !== '/signup' && pathname !== '/login' && pathname.slice(0,10) !== '/dashboard' &&

        <section className="footer-info">
            <div className="contaier">
                <div className="wrapper">
                    <div className="flexcol">
                        <div className="logo">
                            <Link href="/">
                                <Image src={`/${process.env.NEXT_PUBLIC_LOGO_BIG}`} alt="Global Computer Logo" width={132} height={34}/>
                            </Link>
                        </div>
                        <div className="socials">
                            <ul className="flexitem">
                                <li>
                                    <a href="https://www.facebook.com/globalcomputerbd1/" className='facebook' aria-label='Visit us on facebook'>
                                        <i className="ri-facebook-line"></i>
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        href="https://www.linkedin.com/company/global-computer-bd-ltd/about/" 
                                        className='linkedin' aria-label='Visit us on Linkedin'
                                    >
                                            <i className="ri-linkedin-line"></i>
                                    </a>
                                </li>
                    
                            </ul>
                        </div>
                        <p className="mini-text">Copyright 2024 © Global Computer (BD). All right reserved. </p>
                    </div>
                </div>
            </div>
        </section>
        }

        

        {/* mobile view bottom nav */}
        <section className="menu-bottom desktop-hide">
            <div className="container">
                <div className="wrapper">
                    <nav>
                        <ul className="flexitem">
                            <li 
                                onClick={() => {
                                    setShowCart(false)
                                    setShowSearch(false)
                            }}>
                                <Link 
                                    href="/"
                                >
                                    <i className={`ri-home-3-${pathname === '/' ? `fill`: `line`}`}></i>
                                    <span>Home</span>
                                </Link>
                            </li>
                            <li
                                onClick={() => {
                                    setShowCart(false)
                                    setShowSearch(false)
                            }}
                            >
                                <Link
                                    href={(auth && auth != undefined) ? `/profile/${user != `undefined` && user.username}/info` : `/login`} 
                                >
                                    <i className={`ri-user-4-${pathname === `/profile/${user != `undefined` && user.username}/info` || pathname === '/login' ? `fill`: `line`}`}></i>
                                    <span>Account</span>
                                </Link>
                            </li>
                            <li
                                onClick={() => {
                                    setShowCart(false)
                                    setShowSearch(false)
                                }}
                            >
                                {
                                    user &&
                                    user.is_staff ?
                                    <Link 
                                        href={`/dashboard`}
                                    >
                                        <i className={`ri-dashboard-line`}></i>
                                        <span>Dashboard</span>
                                    </Link> :
                                    <Link 
                                        href={`/wishlist`}
                                    >
                                        <i className={`ri-heart-${pathname === '/wishlist' ? `fill`: `line`}`}></i>
                                        <span>Wishlist</span>
                                    </Link>
                                }
                            </li>
                            <li
                                onClick={() => {
                                    setShowSearch(false)
                                    setShowCart(false)
                                }}
                            >
                                <Link 
                                    className='t-search'
                                    href={"/tool/pc-build"} 
                                >
                                    <i className={`ri-computer-${(pathname === '/tool/pc-build') ? `fill`: `line`}`}></i>
                                    <span>Build PC</span>
                                </Link>
                            </li>
                            <li
                                onClick={() => {
                                    setShowCart(true)
                                    setShowSearch(false)
                                }}
                            >
                                <span
                                    className='cart-trigger' 
                                >
                                    <i className="ri-shopping-cart-line"></i>
                                    <span>Cart</span>
                                    <div className="fly-item">
                                        <div className="item-number">{cart && cart.length}</div>
                                    </div>
                                </span>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </section>




        {/* bottom menu search */}
        <section className={`search-bottom desktop-hide ${showSearch ? 'showsearch' : ''}`}>
            <div className="container">
                <div className="wrapper">
                    <form className='search' onSubmit={handleSubmit}>
                        <span
                            className="t-close search flexcenter"
                            onClick={() => {setShowSearch(false)}}
                        >
                            <i className="ri-close-line ri-xl"></i>
                        </span>
                        <span className="icon-large"><i className="ri-search-line"></i></span>
                        <input 
                            type="search" 
                            name="search" 
                            id="search" 
                            placeholder='Search' 
                            onChange={(e) => {setQuery(item => {return e.target.value})}}
                            required
                        />
                        <button type='submit'>Search</button>
                    </form>
                </div>
            </div>
        </section>


        {/* overlay */}
        <div className="overlay desktop-hide" onClick={() => {setShowMenu(false)}}></div>
    </footer>
  )
}

export default Footer