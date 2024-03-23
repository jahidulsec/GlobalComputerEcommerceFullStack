"use client";

import { useEffect, useState } from 'react'
import {Swiper, SwiperSlide} from 'swiper/react';
import { Navigation, FreeMode, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { currencyFormat } from '@/utilities/currencyFormat';
import { usePathname } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import { useCartContext } from '@/context/CartContext';
import Stars from '@/utilities/Stars';
import StockStatus from '@/utilities/StockStatus';
import StockBar from '@/utilities/StockBar';
import Timer from '@/utilities/Timer';
import IncDrecButtonProduct from '@/utilities/IncDrecButtonProduct';
import Button from '@/utilities/Button';
import SuccessStatus from '@/utilities/SuccessStatus';
import ErrorStatus from '@/utilities/ErrorStatus';
import { useGeneralPOST } from '@/hook/useGeneralPOST';
import { toReviewDate } from '@/utilities/toReviewDate';
import { currentDate } from '@/utilities/currentDate';
import Image from 'next/image';




const ProductSection = ({
    product
}) => {

    const [thumb, setThumb] = useState()
    const [count, setCount] = useState(1)
    const [star, setStar] = useState(1)
    const [cartClick, setCartClick] = useState(false)
    const [active, setActive] = useState(false)
    const [showReview, setShowReview] = useState(2)
    const [showFeatureTable, setShowFeatureTable] = useState(true)
    const [showDescTable, setShowDescTable] = useState(true)
    const [showSpecTable, setShowSpecTable] = useState(true)
    const [showReviewTable, setShowReviewTable] = useState(true)
    const pathname = usePathname()
    const [copy, setCopy] = useState(false)

    const {auth} = useAuthContext()


    const [loading, error, success, handleReviewPOST] = useGeneralPOST()

    const {
        wishlist,
        handleWishlist, 
        handleAddCart,
    } = useCartContext()

    
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
        if(typeof(window) !== 'undefined' && wishlist.filter(item => item.productId === product.id).length == 1) {
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


    


    const formik = useFormik({
        initialValues: {
            product_id: product && product.id, 
            comment: '',
            stars: 1,
            date: '', 
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            const date = currentDate();
            let data = new Object()
            let new_data = Object.assign(data, values)

            new_data['stars'] = star
            new_data['date'] = date

            handleReviewPOST(`review`, new_data, auth)

        },
        validationSchema: Yup.object({
            productId: Yup.string(),
            comment: Yup.string().required('Enter your opinion!'),
            stars: Yup.number().integer().min(1).required('Give some stars!'),
            date: Yup.date(),
        }) 
    })


  return (
    <div className="column" itemtype="https://schema.org/Product" itemscope>
        <meta itemprop="name" content={product.title} />
        <div className="products one">
            <div className="flexwrap">

                {/* left side */}
                <div className="row">
                    <div className="item is_sticky">
                        <div className="price">
                            {
                                product &&
                                product.is_stock &&
                                product.discount !== 0 &&
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
                                product && 
                                product.images && 
                                product.images.length > 0 && 
                                product.images.map(item => (
                                    <SwiperSlide className="big-image-wrapper" key={item.id}>
                                        <div 
                                            className="image-show"
                                            // onClick={() => {setToggler(!toggler)}}
                                        >
                                            <Image 
                                                src={item.image} 
                                                alt={product.title}
                                                width={400}
                                                height={400}
                                                sizes='(max-width: 400px) 100vw, (max-width: 653px) 50vw'
                                                priority
                                                // placeholder='blur'
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))
                            }
                            
                        </Swiper>

                        {
                                product && 
                                product.images && 
                                product.images.length > 0 && 
                                product.images.map(item => (
                                    <link key={item.id} itemprop="image" href={item.image} />
                                )
                            )
                        }

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
                                    product && 
                                    product.images && 
                                    product.images.length > 0 && 
                                    product.images.map(item => (
                                        <SwiperSlide key={item.id} className='thumbnail-show'>
                                            <Image 
                                                src={item.image} 
                                                alt={product.title}
                                                width={120}
                                                height={120}
                                                loading='lazy'
                                            />
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
                        <h1>{product.title}</h1>
                        <div className="content">
                            <div className="rating" itemprop="aggregateRating" itemtype="https://schema.org/AggregateRating" itemscope>
                                {
                                    product &&
                                        <Stars NumStar={product.average_stars} />
                                }
                                <a href="#review-form" className="mini-text" itemProp='reviewCount' content={product.count_review || 0}>
                                    {
                                        product ?
                                        product.count_review :
                                        `0 `
                                    } reviews
                                </a>
                                <a 
                                    href="#review-form" 
                                    className="add-review mini-text" 
                                    onClick={() => {setShowFeatureTable(`reviews`)}}
                                >
                                    Add Your Review
                                </a>
                            </div>
                            <div className="stock-model flexwrap gap-1">
                                <StockStatus stock={product.is_stock} />
                                <span className="model mini-text">Model: {product.model_name}</span>
                                <span className='brand mini-text' itemprop="brand" itemtype="https://schema.org/Brand" itemscope>
                                    <span itemprop="name" content={product.brand}>Brand: {product.brand}</span>
                                </span>

                                {
                                    product.is_stock &&
                                    <span className={`emi mini-text`}>EMI Price: {currencyFormat(product.emi_price)}</span>
                                }
                            </div>
                            
                                <div className="price" itemprop="offers" itemtype="https://schema.org/Offer" itemscope>
                                    <span className={`current ${product?.is_stock == false && 'normal'}`}>
                                        {currencyFormat(product.price) }
                                    </span>
                                    {
                                        product &&
                                        product.is_stock &&
                                        product.prev_price &&
                                        product.prev_price != 0 &&
                                            <div className="normal flexcol">
                                                <span className='normal'>
                                                    {currencyFormat(product.prev_price) }
                                                </span>
                                            </div>
                                    }
                                    <meta itemprop="availability" content="https://schema.org/InStock" />
                                    <meta itemprop="priceCurrency" content="BDT" />
                                    <meta itemprop="itemCondition" content="https://schema.org/NewCondition" />
                                    <meta itemprop="price" content={product.price} />
                                    {
                                        product.offered &&
                                        <meta itemprop="priceValidUntil" content={product.offered_time} />
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
                                                <span>Stock: <strong className='qty-available'>{product.total_stock}</strong></span>
                                            </div>
                                            <StockBar 
                                                productSold={product.sold_stock}
                                                totalStock={product.total_stock}
                                            />
                                        </div>
                                    
                                    </>

                            }

                            {
                                product.offered_time &&
                                (new Date(product.offered_time). getFullYear()) == (new Date().getFullYear()) &&
                                (new Date(product.offered_time). getMonth()) == (new Date().getMonth()) &&
                                (new Date(product.offered_time). getDate() + 1) > (new Date().getDate()) &&
                                <Timer offerTime={product.offered_time} />
                            }
                            


                            {/* cart section */}
                            <div className="actions">
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
                                            <CopyToClipboard text={typeof(window) !== 'undefined' && window.location.href}>
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

                            {/* description */}
                            <div className="description collapse">
                                <ul>
                                    <li 
                                        className={`has-child ${showFeatureTable && `expand`}`}
                                    >
                                        <h2 className="icon-small" onClick={() => setShowFeatureTable(!showFeatureTable)}>Key Features</h2>
                                      
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
                                    <li 
                                        className={`has-child ${showDescTable && `expand`}`}
                                        itemProp='description'
                                    >
                                        <h2 className="icon-small" onClick={() => setShowDescTable(!showDescTable)}>Description</h2>
                                        <div className='content description'>
                                            <p>{product?.description}</p>
                                        </div>
                                    </li>
                                    <li 
                                        className={`has-child ${showSpecTable && `expand`}`}
                                    >
                                        <h2 className='icon-small' onClick={() => setShowSpecTable(!showSpecTable)}>Specifications</h2>
                                        <div className="content">
                                            {
                                                product &&
                                                product.specification && 
                                                product.specification.map(spec => (

                                                <table key={spec.id}>
                                                    <thead>
                                                        <tr>
                                                            <th>{spec.table_name}</th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    {
                                                        spec.spec_table &&
                                                        spec.spec_table.map(field => (

                                                            <tbody key={field.field_name}>
                                                                <tr>
                                                                    <td>{field.field_name}</td>
                                                                    <td>{field.field_description}</td>
                                                                </tr>
                                                            </tbody>
                                                        ))
                                                    }
                                                </table>
                                                ))

                                            }

                                        </div>
                                    </li>

                                    <li 
                                       className={`has-child ${showReviewTable && `expand`}`}
                                    >
                                        <h2 className="icon-small" onClick={() => setShowReviewTable(!showReviewTable)}>Reviews <span className="mini-text">{product?.count_review}</span></h2>
                                        <div className="content">
                                            <div className="reviews">
                                                <h3>Customers Reivew</h3>
                                                <div className="review-block">
                                                    <div className="review-block-head">
                                                        <div className="flexitem">
                                                                {
                                                                    product.reviews &&
                                                                    product.reviews.slice(0,1).map(review => (
                                                                        <span key={review.id} className="rate-sum">
                                                                            {review?.average_stars.toFixed(1)}
                                                                        </span>
                                                                    ))
                                                                }
                                                            <span>
                                                                {`${product?.count_review} review${product.count_review && product.count_review > 1 ? `s`: ``}`}
                                                            </span>
                                                        </div>
                                                         
                                                        
                                                        <a href="#review-form" className="secondary-btn">
                                                            Write Review
                                                        </a>
                                                    </div>

                                                    {/* reviews */}
                                                    <div className="review-block-body">
                                                        <ul>
                                                            {
                                                                product.reviews &&
                                                                product.reviews.slice(0,showReview).map(review => (

                                                                
                                                                    <li key={review.id} className="item">
                                                                        <div className="review-form">
                                                                            <p className='person'>{review?.user}</p>
                                                                            <p className="mini-text">On {toReviewDate(review?.date)}</p>
                                                                        </div>
                                                                        <div className="review-rating rating">
                                                                           <Stars NumStar={review.stars} />
                                                                        </div>
                                                                        <div className="review-text">
                                                                            <span className="ri-double-quotes-l quotation"></span>
                                                                            <p>{review?.comment}</p>
                                                                        </div>
                                                                        
                                                                    </li>
                                                                ))
                                                            }
                                                        </ul>
                                                    </div>


                                                   {
                                                        product.reviews &&
                                                        product.reviews.length > showReview &&
                                                            <div className="review-footer main-link view-all">
                                                                <a
                                                                    className='flexitem'
                                                                    onClick={() => {
                                                                        setShowReview(prev => {
                                                                            return prev += 3
                                                                        })
                                                                    }}
                                                                >   
                                                                    <span>View more</span> <span className="ri-arrow-right-line"></span>
                                                                </a>
                                                            </div>
                                                   }

                                                    {
                                                        product.reviews &&
                                                        (showReview > 2 ) && 
                                                            <div className="review-footer main-link view-all">
                                                                <a
                                                                    className='flexitem'
                                                                    onClick={() => {
                                                                        setShowReview(prev => {
                                                                            return 2
                                                                        })
                                                                    }}
                                                                >   
                                                                    <span className="ri-arrow-left-line"></span> <span>See less</span> 
                                                                </a>
                                                            </div>
                                                   }

                                                    <div id="review-form" className="review-form">
                                                        <h4>Write a review</h4>
                                                        <form onSubmit={formik.handleSubmit}>
                                                            <div className="rating">
                                                                <p>Are you satisfied enough?</p>
                                                                <div className="rate-this">
                                                                    <input type="radio" name='rating' id='star5' />
                                                                    <label htmlFor="star5" onClick={() => {setStar(5)}}><i className="ri-star-fill"></i></label>

                                                                    <input type="radio" name='rating' id='star4' />
                                                                    <label htmlFor="star4" onClick={() => {setStar(4)}}><i className="ri-star-fill"></i></label>
                                                                    
                                                                    <input type="radio" name='rating' id='star3' />
                                                                    <label htmlFor="star3" onClick={() => {setStar(3)}}><i className="ri-star-fill"></i></label>

                                                                    <input type="radio" name='rating' id='star2' />
                                                                    <label htmlFor="star2" onClick={() => {setStar(2)}}><i className="ri-star-fill"></i></label>

                                                                    <input type="radio" name='rating' id='star1' />
                                                                    <label htmlFor="star1" onClick={() => {setStar(1)}}><i className="ri-star-fill"></i></label>
                                                                </div>
                                                            </div>
                                                            <p>
                                                                <label htmlFor="comment">Review</label>
                                                                <textarea 
                                                                    name="comment" 
                                                                    id="comment" 
                                                                    value={formik.values.comment}
                                                                    onChange={formik.handleChange} 
                                                                    cols="30" rows="3"></textarea>
                                                                {
                                                                    formik.errors.comment && formik.touched.comment &&
                                                                    <span className="required">{formik.errors.comment}</span>
                                                                }
                                                            </p>
                                                            <p>
                                                                <Button
                                                                    type={"submit"}
                                                                    className={'primary-btn'}
                                                                    loading={loading}
                                                                >
                                                                    Submit Review
                                                                </Button>
                                                            </p>
                                                            <SuccessStatus success={success} />

                                                            <ErrorStatus error={error} />
                                                            
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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

export default ProductSection