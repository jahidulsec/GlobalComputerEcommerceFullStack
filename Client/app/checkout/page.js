"use client";


import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useAuthContext } from '@/context/AuthContext';
import { useGeneralPOST } from '@/hook/useGeneralPOST';
import { useCartContext } from '@/context/CartContext';
import { currentDate } from '@/utilities/currentDate';
import Button from '@/utilities/Button';
import ErrorStatus from '@/utilities/ErrorStatus';
import SuccessStatus from '@/utilities/SuccessStatus';
import Link from 'next/link';
import { toTitleCase } from '@/utilities/toTitleCase';
import { currencyFormat } from '@/utilities/currencyFormat';
import Image from 'next/image';
import { useShippingAddressContext } from '@/context/ShippingAddressContext';






const CheckoutPage = () => {

    const {auth, user} = useAuthContext()
    const [today, setToday] = useState()
    const {address} = useShippingAddressContext()
    //  payment start
    
    const [loading, error, success, handleOrderPOST, orderRes] = useGeneralPOST()


    const {
        cartTotal, 
        cartOverallTotal, 
        discount, 
        shippingCharge, 
        cart, 
    } = useCartContext()


    let cartItem = cart.map(item => {
        return { product_id : item.productId, quantity: item.count, unit_price: `${item.unitPrice}`, price: `${item.price}` }
    })

    useEffect(() => {
        const orderModal = document.querySelector('.modal__order-confirm')

        const handleConfirmOrderModal = () => {
            if (success) {
                orderModal.showModal()
            }
        }

        if (success) {
            handleConfirmOrderModal()
        } 

    }, [success])

    useEffect(() => {
        setToday(currentDate())
    }, [])


    // const address = typeof(window) != 'undefined' ? JSON.parse(sessionStorage.getItem('address')) : ''
    
    const handleCheckAddressData = () => {
        if (address === null) {
            return true
        }
        if (!address.district || !address.division || !address.streetAddress) {
            return true
        }
        if (cartItem.length < 1) {
            return true
        }
        return false
    }


    const formik = useFormik({
        initialValues: {
            total: cartTotal,
            date: today,
            street_address: address != null && address.streetAddress && address.streetAddress,
            district: address != null && address.district && address.district,
            division: address != null && address.division && address.division,
            phone: user?.phone_number,
            payment_method: 'Cash on Delivery',
            order_note: '',
            orders: cartItem,
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            if (values.phone.length == 11) {
                values.phone = '+88'+values.phone
            } 
            handleOrderPOST(`order`,values, auth)
            localStorage.removeItem('cart')
            
        },
        validationSchema: Yup.object({
            total: Yup.string(),
            phone: Yup.string('enter only numbers!').min(10).required('enter a contact no.'),
            order_note: Yup.string(),
            district: Yup.string(),
            division: Yup.string(),
            street_address: Yup.string(),
            payment_method: Yup.string(),
            orders: Yup.array(),
            date: Yup.date(),
        })
    })

    

  return (
    <>
    <section className='checkout-page single-checkout'>
        <div className="container">
            <div className="wrapper">
                <div className="checkout flexwrap">

                    {
                        (user.email && user.email != undefined) ?

                        <>
                        <div className="item left styled">
                            <h1>Contact Info</h1>
                            <form onSubmit={formik.handleSubmit }>
                                <p>
                                    <label htmlFor="email">Email Address</label>
                                    <input 
                                        type="email"
                                        name='email'
                                        id='email'
                                        value={user?.email ? user?.email : 'Login First!'}
                                        disabled
                                    />
                                </p>
                                
                                <p>
                                    <label htmlFor="fullName">Full Name</label>
                                    <input 
                                        type="text"
                                        name='fullName'
                                        id='fullName'
                                        value={(user?.first_name && user?.last_name) ? `${user?.first_name} ${user?.last_name}` :  `Login First!` }
                                        disabled
                                    />
                                    
                                </p>
                                <p>
                                    <label htmlFor="phone">Phone Number <span></span></label>
                                    <input 
                                        type="phone" 
                                        name='phone'
                                        id='phone'
                                        value={formik.values.phone}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        {...formik.getFieldHelpers('phone')}
                                    />
                                    {
                                        formik.errors.phone && formik.touched.phone &&
                                        <span className="required">{formik.errors.phone}</span>
                                    }
                                </p>
                                <p>
                                    <label htmlFor="order_note">Order Note (optional)</label>
                                    <textarea 
                                        name="order_note" 
                                        id="order_note" 
                                        cols="30" 
                                        rows="4"
                                        value={formik.values.order_note}
                                        onChange={formik.handleChange}
                                        {...formik.getFieldHelpers('order_note')}
                                    ></textarea>
                                </p>
                                
                                <div className="shipping-methods">
                                    <h2>Shipping Methods</h2>
                                    <p className="checkset">
                                        <input type="radio" name="payment_method" id="payment_method" checked/>
                                        <label className='not-text' htmlFor="payment_method">Cash on Delivery</label>
                                    </p>
                                    <div className="primary-checkout flexcenter">
                                        <Button 
                                            className={`primary-btn`}
                                            type={`submit`}
                                            disable={handleCheckAddressData()}
                                            loading={loading}
                                        >
                                            
                                            <span>Place Order </span>
                                            <span className="ri-shopping-cart-line"></span>
                                        </Button>

                                        <ErrorStatus error={error} />
                                        <SuccessStatus success={success} />
                                    </div>
                                </div>
                            </form>
                            <dialog className='modal__order-confirm'>
                            <div className="container">
                                <div className="wrapper">
                                    <div className="confirm-content flexcol">
                                        <h2>Success!</h2>
                                        <p>
                                        Your invoice no. is <strong><em>{orderRes && orderRes?.slug}</em></strong>
                                        </p>
                                        <p>
                                        Thanks for your submission, we will get back to you shortly within 24 hours! 
                                        </p>
                                        <div className="buttons flexitem">
                                        <button className="primary-btn">
                                            <Link href={`/profile/${user && user.username}/order`}>
                                                Go to Personal Order 
                                            </Link>
                                        </button>
                                        <button className="secondary-btn">
                                            <Link href={`/`}>
                                                Return Home
                                            </Link>
                                        </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </dialog>
                        </div>



                        <div className="item right">
                            
                            <div className="summary-order is_sticky">
                                {/* shipping address */}
                                <h2>Shipping Address</h2>
                                <div className="summary-address">
                                    <ul>
                                        <li>
                                            <span>Division</span>
                                            {
                                                address != null && address.division ?
                                                <span>{toTitleCase(address.division)}</span> :
                                                <span className='required'>
                                                    <Link href={`/cart`}>
                                                        <i class="ri-error-warning-line"></i> <span>Enter your division</span>
                                                    </Link>
                                                </span>
                                            }
                                        </li>
                                        <li>
                                            <span>District</span>
                                            {
                                                address != null && address.district ?
                                                <span>{toTitleCase(address.district)}</span> :
                                                <span className='required'>
                                                    <Link href={`/cart`}>
                                                        <i class="ri-error-warning-line"></i> <span>Enter your district</span>
                                                    </Link>
                                                </span>
                                            }
                                        </li>
                                        <li>
                                            <span>Street Address</span>
                                            {
                                                address != null && address.streetAddress ?
                                                <span>{toTitleCase(address.streetAddress)}</span> :
                                                <span className='required'>
                                                    <Link href={`/cart`}>
                                                        <i class="ri-error-warning-line"></i> <span>Enter your address</span>
                                                    </Link>
                                                </span>
                                            }
                                        </li>
                                        <li>
                                            <span></span>
                                            <span className='medium-text'>
                                                <Link href={`/cart`}>
                                                    Edit address <i className="ri-arrow-right-line"></i>
                                                </Link>
                                            </span>
                                        </li>
                                    </ul>
                                </div>

                                {/* order summary */}
                                <h2>Order Summary</h2>
                                <div className="summary-totals">
                                    <ul>
                                        <li>
                                            <span>Subtotal</span>
                                            <span>{currencyFormat(cartTotal)}</span>
                                        </li>
                                        {/* <li>
                                            <span>Discount</span>
                                            <span>{currencyFormat(0)}</span>
                                        </li>
                                        <li>
                                            <span>Shipping</span>
                                            <span>{currencyFormat(shippingCharge)}</span>
                                        </li> */}
                                        <li>
                                            <span>Total</span>
                                            <strong>{currencyFormat(cartOverallTotal)}</strong>
                                        </li>
                                    </ul>
                                </div>
                                <ul className="products">
                                    {
                                        cart &&
                                        cart.map(item => (
                                            <li key={item.id} className="item">
                                                <div className="thumbnail object-cover">
                                                    <Image 
                                                        src={item.imgUrl} 
                                                        alt={item.name}
                                                        width={400}
                                                        height={400} 
                                                    />
                                                </div>
                                                <div className="item-content">
                                                    <p>{item.name}</p>
                                                    <span className="price">
                                                        <span>{currencyFormat(item.price)}</span>
                                                        <span>x {item.count}</span>
                                                    </span>
                                                </div>
                                            </li>
                                        ))
                                    }

                                </ul>
                            </div>
                        </div>
                    </> :
                    <div className="card">
                        <p>
                            To place your order, please login first or create a account.
                        </p>
                        <div className="flexitem gap-1">
                            <button type="button" className='primary-btn'>
                                <Link href={`/login`}>Login</Link>
                            </button>
                            <button type="button" className='secondary-btn'>
                                <Link href={`/signup`}>
                                    Sign Up
                                </Link>
                            </button>

                        </div>
                    </div>

                    }
                </div>
                
            </div>
        </div>
    </section>
    </>

  )
}

export default CheckoutPage