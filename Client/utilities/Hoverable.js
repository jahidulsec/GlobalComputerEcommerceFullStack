"use client";


import { useEffect, useState } from 'react'
import { useCartContext } from '../context/CartContext'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useQuickViewContext } from '../context/QuickViewContext'

const Hoverable = ({
        product
    }) => {

    const [active, setActive] = useState(false)
    const [copy, setCopy] = useState(false)

    const {wishlist, handleWishlist} = useCartContext()
    const {onProduct} = useQuickViewContext()

    useEffect(() => {
        if(wishlist && wishlist.filter(item => item.productId === product.id).length == 1) {
            setActive(true)
        } else {
            setActive(false)
        }
        
    },[wishlist])

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


    const handleOpenModal = () => {
        const modal = document.querySelector(`.modal__quick_view`)
        onProduct(product.slug)
        modal.showModal()
    }



  return (
    <div className="hoverable">
        <ul>
            <li 
                className={active ? 'active' : ''}
                onClick={() => {handleWishlist(
                    product.id,
                    product.slug,
                    product.title,
                    product.images[0].image,
                    product.price,
                    product?.average_stars,
                    product.is_stock,
                )}}
            >
                <button type='button' title='Add to Wishlist' >
                    <i className="ri-heart-line"></i>
                </button>
            </li>
            <li>
                <button type='button' title='Quick view' onClick={handleOpenModal} >
                    <i className="ri-eye-line"></i>
                </button>
            </li>
            <li>
                <CopyToClipboard text={`https://globalcomputer.com.bd/product/` + product?.slug} >
                    <button type='button' title='Share Link' onClick={() => {setCopy(true)}} >
                        <i className="ri-share-forward-line"></i>
                    </button>
                </CopyToClipboard>
                <p className={`copy-text ${copy ? 'show' : ''}`}>Copied!</p>
            </li>
        </ul>
    </div>
  )
}

export default Hoverable