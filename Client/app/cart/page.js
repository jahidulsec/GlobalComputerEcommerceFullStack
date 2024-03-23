"use client";


import { useCartContext } from '@/context/CartContext';
import { useShippingAddressContext } from '@/context/ShippingAddressContext';
import IncDrecButton from '@/utilities/IncDrecButton';
import NoItem from '@/utilities/NoItem';
import { currencyFormat } from '@/utilities/currencyFormat';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react'


const CartPage = () => {

    const {address, onAddress} = useShippingAddressContext()

    const [showShipping, setShowShipping] = useState(true)

    const {
        cartTotal, 
        cartOverallTotal, 
        discount, 
        shippingCharge, 
        cart, 
        handleCartItemQuantity, 
        handleCartItemDelete
    } = useCartContext()



    // const handleAddress = () => {
    //     onAddress(shippingAddress)
    // }



    

  return (
    <>
    <section className='cart-page single-cart'>
        <div className="container">
            <div className="wrapper">
                <div className="breadcrump">
                    <ul className="flexitem">
                        <li><Link href="/">Home</Link></li>
                        <li>Cart</li>
                    </ul>
                </div>
                <div className="page-title">
                    <h1>Shopping Cart</h1>
                </div>
                <div className="products one cart">
                    <div className="flexwrap">
                        <form className="form-cart">
                            <div className="item">
                                <table id="cart-table">
                                    <thead>
                                        <tr>
                                            <th>Item</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Subtotal</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            cart &&
                                            cart.map(item => (

                                            <tr key={item.id}>
                                                <td className='flexitem'>
                                                    <div className="thumbnail object-cover">
                                                        <Link href={`/product/${item.productSlug}`}>
                                                            <Image src={item.imgUrl} alt={item.name} width={80} height={80} />
                                                        </Link>
                                                    </div>
                                                    <div className="content">
                                                        <strong>
                                                            <Link href={`/product/${item.productSlug}`}>
                                                                <span>{item.name}</span>
                                                            </Link>
                                                        </strong>

                                                    </div>
                                                </td>
                                                <td data-label='Price'>{currencyFormat(item.unitPrice)}</td>
                                                <td data-label='Quantity'>
                                                    <div className="qty-control flexitem">
                                                        <IncDrecButton 
                                                            countValue={item.count} 
                                                            onQty={handleCartItemQuantity}
                                                            productId={item.productId}
                                                            unitPrice={item.unitPrice}
                                                        />
                                                    </div>
                                                </td>
                                                <td data-label='Subtotal'>{currencyFormat(item.price)}</td>
                                                <td data-label="Delete">
                                                    <button type='button' onClick={() => {handleCartItemDelete(item.id)}}><i className="ri-close-line"></i></button>
                                                </td>
                                            </tr>
                                            ))
                                        }

                                    </tbody>
                                </table>
                                {
                                    cart.length == 0 &&  <NoItem />
                                }
                            </div>
                        </form>

                        {/* cart summary */}
                        <div className="cart-summary styled">
                            <div className="item">
                                <div className="coupon">
                                    <input 
                                        type="text" 
                                        name="coupon" 
                                        id="coupon"
                                        placeholder='Enter Coupon' 
                                    />
                                    <button type='button'>Apply</button>
                                </div>
                                <div className="shipping-rate collapse">
                                    <div className={`has-child ${showShipping && `expand`}`}>
                                        <a 
                                            className="icon-small"
                                            onClick={() => {setShowShipping(!showShipping)}}
                                        >
                                            Shipping Address
                                        </a>
                                        <div className="content">
                                            <form className='product-form' >
                                                <p className="division">
                                                    <label htmlFor="division">Division <span></span></label>
                                                    <input
                                                        type='text' 
                                                        name="division" 
                                                        id="division" 
                                                        required
                                                        value={address.division}
                                                        onChange={e => {
                                                            onAddress(data => ({
                                                                ...data,
                                                                division: e.target.value
                                                            }))
                                                        }}
                                                    />
                                                </p>
                                                <p className="district">
                                                    <label htmlFor="district">District <span></span></label>
                                                    <input 
                                                        type='text'
                                                        name="district" 
                                                        id="district" 
                                                        required
                                                        onChange={e => {
                                                            onAddress(data => ({
                                                                ...data,
                                                                district: e.target.value
                                                            }))
                                                        }}
                                                        value={address.district}
                                                    />
                                                </p>
                                                <p className="postal-code">
                                                    <label htmlFor="address">Street Address <span></span></label>
                                                    <input 
                                                        type="text" 
                                                        name="address" 
                                                        id="address"
                                                        value={address.streetAddress} 
                                                        onChange={e => {
                                                            onAddress(data => ({
                                                                ...data,
                                                                streetAddress: e.target.value
                                                            }))
                                                        }}
                                                    />
                                                </p>                  
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="cart-total">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th>Subtotal</th>
                                                <td>{currencyFormat(cartTotal)}</td>
                                            </tr>
                                            <tr className='grand-total'>
                                                <th>Total</th>
                                                <td><strong>{currencyFormat(cartOverallTotal)}</strong></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <Link 
                                        role='button' 
                                        href="/checkout" 
                                        className="secondary-btn"
                                        // onClick={handleAddress()}
                                    >
                                        Checkout
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>

  )
}

export default CartPage