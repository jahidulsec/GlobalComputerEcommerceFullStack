"use client";


import { useEffect, useState } from 'react'
import {Swiper, SwiperSlide} from 'swiper/react';
import { Navigation, FreeMode, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useGeneralGET } from '@/hook/useGeneralGET';
import Image from 'next/image';
import Stars from '@/utilities/Stars';
import StockStatus from '@/utilities/StockStatus';
import StockBar from '@/utilities/StockBar';
import Timer from '@/utilities/Timer';
import IncDrecButtonProduct from '@/utilities/IncDrecButtonProduct';
import CopyToClipboard from 'react-copy-to-clipboard';
import { usePathname } from 'next/navigation';
import { useCartContext } from '@/context/CartContext';
import { currencyFormat } from '@/utilities/currencyFormat';





const ModalProduct = ({
    productSlug
}) => {

    const [thumb, setThumb] = useState()
    const [count, setCount] = useState(1)
    const [cartClick, setCartClick] = useState(false)
    const [active, setActive] = useState(false)
    const pathname = usePathname()
    const [copy, setCopy] = useState(false)


    const {
        wishlist,
        handleWishlist, 
        handleAddCart,
    } = useCartContext()

    const [product, handleProductGet] = useGeneralGET()

    
    useEffect(() => {
        handleProductGet({name: `product`, id: productSlug})
    }, [productSlug])


    let stock;
    if (product?.total_stock && product?.sold_stock) {
        stock = parseInt(product?.total_stock)-parseInt(product?.sold_stock)
    }
    

    useEffect(() => {
        setCount(1)
    },[pathname])

    useEffect(() => {
        const handleCopyTextHide = () => {
            setTimeout(() => {
                setCopy(false)
            }, 2000);
        }

        if (copy) {
            handleCopyTextHide()
        }
    }, [copy])


    useEffect(() => {
        if(wishlist.filter(item => item.productId === product?.id).length == 1) {
            setActive(true)
        } else {
            setActive(false)
        }
    },[wishlist])


    const handleCartClick = () => {
        setCartClick(item => {
            return true
        })

        const timeoutCartClick = () => {
            setTimeout(() => {
                setCartClick(false)
            }, 700);
        }

        timeoutCartClick()
    }


    

  return (
    <div className="column">
        <div className="products one">
            <div className="flexwrap">

                {/* left side */}
                <div className="row">
                    <div className="item is_sticky">
                        <div className="price">
                            {
                                product &&
                                product.is_stock &&
                                product.discount == 0 &&
                                    <span className="discount">{product.discount}% <br /> OFF</span>
                            }
                        </div>
                        <Swiper
                            loop={true}
                            navigation={true}
                            thumbs={{swiper: thumb}}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="big-image mySwiper"
                        >   
                            {
                                product?.images.map(product => (
                                    <SwiperSlide key={product.id} className="big-image-wrapper">
                                        <div 
                                            className="image-show"
                                            onClick={() => {setToggler(!toggler)}}>
                                            <Image 
                                                src={product.image} 
                                                alt={product.title} 
                                                width={500}
                                                height={500} 
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))
                            }
                            
                        </Swiper>

                        <div  className="small-image">
                            <Swiper
                                onSwiper={setThumb}
                                spaceBetween={10}
                                slidesPerView={3}
                                freeMode={true}
                                watchSlidesProgress={true}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="small-image-wrapper flexitem"
                            >
                                {
                                    product?.images.map(product => (
                                        <SwiperSlide key={product.id} className='thumbnail-show'>
                                            <Image src={product.image} alt={product.title} width={150} height={150} />
                                        </SwiperSlide>

                                    ))
                                }
                                
                            </Swiper>

                        </div>
                    </div>
                </div>



                {/* right side */}
                <div className="row">
                    <div className="item">
                        <h1>{product?.title}</h1>
                        <div className="content">
                            <div className="rating">
                                {
                                    product &&
                                    product.reviews[0] &&
                                        <Stars NumStar={product.reviews[0].average_stars} />
                                }
                                <a className="mini-text">
                                    {
                                        product?.reviews[0] ?
                                        product?.reviews[0].count_review :
                                        `0 `
                                    } reviews
                                </a>
                            </div>
                            <div className="stock-model flexitem gap-1">
                                <StockStatus stock={product?.is_stock} />
                                <span className="model mini-text">Model: {product?.model_name}</span>
                                {
                                    product?.is_stock &&
                                    <span className={`emi mini-text`}>EMI Price: {currencyFormat(product?.emi_price)}</span>
                                }
                            </div>
                            
                                <div className="price">
                                    <span className={`current ${product?.is_stock == false && 'normal'}`}>
                                        {currencyFormat(product?.price) }
                                    </span>
                                    {
                                        product &&
                                        product.is_stock &&
                                        product.prev_price &&
                                        product.prev_price != 0 &&
                                            <div className="normal flexcol">
                                                <span className='normal'>
                                                    {currencyFormat(product?.prev_price) }
                                                </span>
                                            </div>
                                    }
                                </div>
                            


                            {/* offer section */}
                            
                            {
                                product && product.is_stock &&
                                product.offered_time && 
                                // offer time over remain untill next day
                                (new Date(product.offered_time). getFullYear()) == (new Date().getFullYear()) &&
                                (new Date(product.offered_time). getMonth()) == (new Date().getMonth()) &&
                                (new Date(product.offered_time). getDate() + 1) > (new Date().getDate()) &&
                                    <>
                                        <div className="stock medium-text">
                                            <div className="qty">
                                                <span>Sold: <strong className='qty-sold'>{product.sold_stock}</strong></span>
                                                <span>Stock: <strong className='qty-available'>{product.total_stock && stock}</strong></span>
                                            </div>
                                            <StockBar
                                                productSold={product.sold_stock}
                                                totalStock={product.total_stock}
                                            />
                                        </div>
                                    
                                    </>

                            }

                            {
                                product?.offered_time &&
                                (new Date(product?.offered_time). getFullYear()) == (new Date().getFullYear()) &&
                                (new Date(product?.offered_time). getMonth()) == (new Date().getMonth()) &&
                                (new Date(product?.offered_time). getDate() + 1) > (new Date().getDate()) &&
                                <Timer offerTime={product?.offered_time} />
                            }
                            


                            {/* cart section */}
                            <div className='actions'>
                                <div className="qty-control flexitem">
                                    <IncDrecButtonProduct count={count} setCount={setCount} />
                                </div>
                                <div className="button-cart">
                                    <button 
                                        className='primary-btn flexitem gap-1'
                                        onClick={() => {
                                            handleAddCart(
                                                product.id, 
                                                product.slug,
                                                product.title, 
                                                product.price, 
                                                product.price, 
                                                product.images[0].image, 
                                                count)
                                            handleCartClick()
                                            
                                        }} 
                                    >
                                        <span className='ri-add-line'></span>
                                        <span>Add to cart</span>
                                    </button>
                                    <div className={`add flexitem gap-1 ${cartClick && `active`}`}>
                                        <span className='ri-check-line'></span>
                                        <span>Item added</span>
                                    </div>
                                </div>
                            </div>

                            <div className="actions">
                                <div className="wish-share">
                                    <ul className="flexitem second-link">
                                        <li onClick={() => {handleWishlist(
                                            product.id,
                                            product.slug,
                                            product.title,
                                            product.images[0].image,
                                            product.price,
                                            product?.average_stars,
                                            product.is_stock,
                                        )}}>
                                            <button type='button' className={`${active && `active`}`}>
                                                <span className="icon-large">
                                                    <i className={`ri-heart-${active ? `fill` : `line`}`}></i>
                                                </span>
                                                <span>Wishlist</span>
                                            </button>
                                        </li>
                                        <li style={{position: 'relative'}}>
                                            <CopyToClipboard text={window.location.href}>
                                                <button type='button' onClick={() => {setCopy(true)}}>
                                                    <span className="icon-large">
                                                        <i className="ri-share-line"></i>
                                                    </span>
                                                    <span>Share</span>
                                                </button>
                                            </CopyToClipboard>
                                            <p className={`copy-text ${copy ? 'show' : ''}`}>Copied!</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="description collapse">
                                <ul>
                                    <li 
                                        className={`has-child expand`}
                                        onClick={() => {setShowTable(`feature`)}}
                                    >
                                        <a className="icon-small">Key Features</a>
                                      
                                        <table className='featured-table content'>
                                            <tbody>
                                                {
                                                    product &&
                                                    product.key_features &&
                                                    product.key_features.map(item => (
                                                        <tr key={item.id}>
                                                            <td>{item.field_name}</td>
                                                            <td>{item.field_description}</td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default ModalProduct