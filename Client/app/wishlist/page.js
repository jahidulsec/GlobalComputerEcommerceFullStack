"use client";

import { useCartContext } from "@/context/CartContext";
import NoItem from "@/utilities/NoItem";
import Stars from "@/utilities/Stars";
import StockStatus from "@/utilities/StockStatus";
import { currencyFormat } from "@/utilities/currencyFormat";
import Image from "next/image";
import Link from "next/link";




const WishlistPage = () => {

    const {wishlist, handleDelWishlist, handleAddCart} = useCartContext()

  return (
    <>

    <section className="wishlist-page">
        <div className="container">
            <div className="wrapper">
            <div className="breadcrump">
                    <ul className="flexitem">
                        <li><Link href="/">Home</Link></li>
                        <li>Wishlist</li>
                    </ul>
                </div>
                <div className="page-title">
                    <h1>Wishlist</h1>
                </div>
                <div className="products one cart">
                    <div className="flexwrap">
                        <form className="form-wishlist">
                            <div className="item">
                                <table id="cart-table">
                                    <thead>
                                        <tr>
                                            <th>Product name</th>
                                            <th>Unit Price</th>
                                            <th>Rating</th>
                                            <th>Stock Status</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            wishlist &&
                                            wishlist.map(item => (

                                            <tr key={item.productId}>
                                                <td className='flexitem'>
                                                    <div className="thumbnail object-cover">
                                                        <Link href={`/product/${item.productSlug}`}>
                                                            <Image src={item.imgUrl} alt={item.name} width={80} height={80} />
                                                        </Link>
                                                    </div>
                                                    <div className="content">
                                                        <strong>
                                                            <Link href={`/product/${item.productSlug}`}>
                                                                {item.name}
                                                            </Link>
                                                        </strong>
                                                    </div>
                                                </td>
                                                <td data-label='Unit Price'>{currencyFormat(item.unitPrice)}</td>
                                                <td data-label='Rating'>
                                                    <Stars NumStar={item.stars} />
                                                </td>
                                                <td data-label='Status'>
                                                    <StockStatus stock={item.stock} />
                                                </td>

                                                <td className='table-btn' data-label='Actions'>
                                                    <Link href={`/cart`}>
                                                        <button 
                                                            className='primary-btn'
                                                            type='button'
                                                            onClick={() => {
                                                                handleAddCart(
                                                                    item.productId, item.productSlug, item.name, item.unitPrice, item.unitPrice, item.imgUrl, 1)
                                                            }}
                                                        >
                                                                Add to Cart
                                                        </button>
                                                    </Link>
                                                    <button 
                                                        type='button'
                                                        onClick={() => {handleDelWishlist(item.productId)}}
                                                    >
                                                        <i className="ri-close-line"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                            ))
                                        }

                                    </tbody>
                                </table>

                                {
                                    wishlist.length == 0 &&  <NoItem />
                                }
                            </div>
                        </form>

                        
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default WishlistPage