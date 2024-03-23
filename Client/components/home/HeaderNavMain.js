'use client';

import { useEffect, useRef } from 'react'
import { currencyFormat } from '@/utilities/currencyFormat';
import NoItem from '@/utilities/NoItem';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCartContext } from '@/context/CartContext';
import Image from 'next/image';
import { useSideMenuContext } from '@/context/SideMenuContext';
import { useShowCartContext } from '@/context/ShowCartContext';
import { useAuthContext } from '@/context/AuthContext';
import { useSearchContext } from '@/context/SearchContext';



const HeaderNavMobile = ({children}) => {

   const pathname = usePathname()
   const {
        cart, 
        wishlist, 
        cartTotal, 
        handleCartItemDelete, 
        handleDelWishlist,
    } = useCartContext()

    const {showCart, setShowCart} = useShowCartContext()
    const {showSearch, setShowSearch} = useSearchContext()

    const {setShowMenu} = useSideMenuContext()


    const cartRef = useRef()
    



    const {onAuth} = useAuthContext()


  useEffect(() => {

    // show sub menu on mobile
    const submenu = document.querySelectorAll('.has-child span')

    function toggle (e) {
      e.preventDefault()
      submenu.forEach((item) => item != this ? item.closest('.has-child').classList.remove('expand') : null)
      if (this.closest('.has-child').classList != 'expand') {
          this.closest('.has-child').classList.toggle('expand')
      }
    }
    
    submenu.forEach((menu) => menu.addEventListener('click', toggle))
  },[])
  
  useEffect(() => {
    let localAuth;
    if (typeof(window)!=='undefined') {
        localAuth = localStorage.getItem('glc_t')
    }
    if (typeof(window)!=='undefined' && localAuth && localAuth != 'undefined') {
      onAuth(JSON.parse(localAuth))
    }
  }, [pathname])
    


  return (
    pathname !== '/signup' && pathname !== '/login' && pathname.split(`/`)[1] !== 'password' && pathname !== '/reset-password'  && pathname !== '/reset-status' && pathname.slice(0,10) !== '/dashboard' &&
    <header className='header-sticky mobile navigation-primary'>
        <div className="header-nav">
            <div className="container">
                <div className="wrapper flexspace">
                    <div className="left flexitem">
                        {   
                            pathname !== '/signup' && pathname !== '/login' &&
                            <button 
                                aria-label='Trigger Side Menu Button'
                                className="trigger desktop-hide"
                                onClick={() => setShowMenu(true)}
                            >
                                <span className='ri-menu-2-line'></span>
                            </button>
                        }
                        <div className="logo">
                            <Link href="/">
                                <Image 
                                    src={`/${process.env.NEXT_PUBLIC_LOGO_BIG}`} 
                                    alt="global computer bd logo" 
                                    width={160}
                                    height={90}
                                    priority 
                                />
                            </Link>
                        </div>
                        <nav className="mobile-hide">
                            <ul className="flexitem second-link">
                                <li className='has-child'>
                                    <Link href={`/featured`}>
                                        <span className="icon-small"><i className="ri-device-line"></i></span>
                                        Products 
                                        <span className="icon-small"><i className="ri-arrow-down-s-line"></i></span>
                                    </Link>

                                    {/* mega menu when hover on ALL PRODUCTS */}
                                    {children}
                                </li>
                                <li>
                                    <Link href={`/about`}>
                                        <span className="icon-small"><i className="ri-store-line"></i></span>      
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link href={`/contact`}>
                                        <span className="icon-small"><i className="ri-user-location-line"></i></span>      
                                        
                                        Contact
                                    </Link>
                                </li>
                               
                            </ul>
                        </nav>
                        
                    </div>


                    
                    
                    <div className="right flexitem gap-1">
                        <Link className='mobile-hide' href={`/tool/pc-build`}>
                            <button className='pc-build-btn'>
                                Build Your PC
                            </button>
                        </Link>
                    {
                        pathname !== '/login' && pathname !== '/signup' &&
                        <ul className="flexitem gap-1">
                            <li
                                className='desktop-hide'
                                onClick={() => {
                                    setShowSearch(true)
                                    setShowCart(false)
                                }}
                            >

                                    <div className='icon-large'>
                                        <i className="ri-search-line"></i>
                                    </div>
                            </li>
                            <li className='iswishlist mobile-hide'>
                                <span >
                                    <div className="icon-large"><i className="ri-heart-line"></i></div>
                                    <div className="fly-item"><span className="item-number">{wishlist?.length || 0}</span></div>
                                </span>
                                
                                {/* wishlist overlay */}
                                <div 
                                    className={`mini-wishlist`}
                                >
                                    <div className="content">
                                        <div className="wishlist-head">
                                            <span>{wishlist?.length || 0} in wishlist</span>
                                            <button 
                                                className='icon-small'
                                                onClick={() => {setShowCart(false)}}    
                                            >
                                                <i className="ri-close-line"></i>
                                            </button>
                                        </div>
                                        <div className="wishlist-body">
                                            <ul className="products mini">
                                                {
                                                    typeof(window) !== 'undefined' &&
                                                    wishlist &&
                                                    wishlist.map(item => (

                                                    <li key={item.productId} className="item">
                                                        <div className="thumbnail object-cover">
                                                            <Link href={`/product/${item.productId}`}>
                                                                <Image src={`${item.imgUrl}`} alt={item.name} width={72} height={72} />
                                                            </Link>
                                                        </div>
                                                        <div className="item-content">
                                                            <p><Link href={`/product/${item.productId}`}>{item.name}</Link></p>
                                                            <span className="price">
                                                                <span>{currencyFormat(item.unitPrice)}</span>
                                                            </span>
                                                        </div>
                                                        <button 
                                                            className="item-remove" 
                                                            onClick={() => {handleDelWishlist(item.productId)}}
                                                        >
                                                            <i className="ri-close-line"></i>
                                                        </button>
                                                    </li>
                                                ))
                                                }

                                                {
                                                    typeof(wishlist) !== 'undefined' &&
                                                    wishlist && wishlist.length == 0 &&  <NoItem /> 
                                                }
                                                
                                                
                                            </ul>
                                        </div>

                                        <div className="wishlist-footer">
                                            <div className="actions">
                                                <Link href="/wishlist" className="primary-btn">Wishlist</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                            </li>


                            <li className='iscart'>
                                <span className='cart-icon'>
                                    <div className="icon-large">
                                        <i className="ri-shopping-cart-line"></i>
                                        <div className="fly-item"><span className="item-number">{typeof(window) !== 'undefined' && cart ? cart.length : `0`}</span></div>
                                    </div>
                                    <div className="icon-text">
                                        <div className="mini-text">Total</div>
                                        <div className="cart-total">{(typeof(window) !== 'undefined' && cart) ? currencyFormat(cartTotal) : currencyFormat(0)}</div>
                                    </div>
                                </span>

                                

                                {/* cart overlay */}
                                {<div 
                                    className={`mini-cart ${showCart ? 'show': ''}`}
                                    ref={cartRef}
                                >
                                    <div className="content">
                                        <div className="cart-head">
                                            <span>{typeof(window) !== 'undefined' && cart ? cart.length : `0`} item{typeof(window) !== 'undefined' && cart && (typeof(cart) !== 'undefined' ? cart.length : 0) > 1 ? `s`: ``} in cart</span>
                                            <button 
                                                className='icon-small desktop-hide'
                                                onClick={() => {setShowCart(false)}}  

                                            >
                                                <i className="ri-close-line"></i>
                                            </button>
                                        </div>
                                        <div className="cart-body">
                                            <ul className="products mini">
                                                {
                                                    typeof(window) !== 'undefined' &&
                                                    cart && 
                                                    cart.map(item => (

                                                    <li key={item.id} className="item">
                                                        <div className="thumbnail object-cover">
                                                            <Link href={`/product/${item.productSlug}`}>
                                                                <Image src={`${item.imgUrl}`} alt={item.name} width={72} height={72} />
                                                            </Link>
                                                        </div>
                                                        <div className="item-content">
                                                            <p><Link href={`/product/${item.productSlug}`}>{item.name}</Link></p>
                                                            <span className="price">
                                                                <span>{currencyFormat(item.price)}</span>
                                                                
                                                                    <span className='fly-item'>
                                                                        <span>{item.count}x</span>
                                                                    </span>
                                                                
                                                            </span>
                                                        </div>
                                                        {pathname !== '/checkout' &&
                                                            <button 
                                                                className="item-remove" 
                                                                onClick={() => {handleCartItemDelete(item.id)}}
                                                            >
                                                                <i className="ri-close-line"></i>
                                                            </button>
                                                        }
                                                    </li>
                                                ))
                                                }

                                                {
                                                  typeof(cart) !== 'undefined' && cart && cart.length == 0 &&  <NoItem />
                                                }
                                                
                                            </ul>
                                        </div>

                                        <div className="cart-footer">
                                            <div className="subtotal">
                                                <p>Subtotal</p>
                                                <p><strong>{currencyFormat(cartTotal)}</strong></p>
                                            </div>
                                            <div className="actions">
                                                <Link href="/cart" className="secondary-btn" onClick={() => {setShowCart(false)}}>View Cart</Link>
                                                <Link href="/checkout" className="primary-btn" onClick={() => {setShowCart(false)}}>Checkout</Link>
                                            </div>
                                        </div>

                                    </div>
                                </div> }

                            </li>
                        </ul>
                    }
                    </div>
                </div>
            </div>
        </div>
    </header>
  )
}

export default HeaderNavMobile