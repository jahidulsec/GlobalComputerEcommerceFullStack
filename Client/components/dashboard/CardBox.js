"use client";


import { useAuthContext } from '@/context/AuthContext';
import { useGeneralGET } from '@/hook/useGeneralGET';
import Link from 'next/link';
import { useEffect } from 'react'
import { AiOutlineDesktop, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai'


const CardBox = () => {
    const {auth} = useAuthContext()

    const [product, handleProductGET] = useGeneralGET()
    const [order, handleOrderGET] = useGeneralGET()


    useEffect(() => {
        handleProductGET({name: `product`,size: 1, page: 1})
        handleOrderGET({name:`order`, page:1, size:1, token:auth, order_status:`0`})
    },[auth])


  return (
    <div className="card-box flexwrap">
        {/* total product */}
        <Link href={`/dashboard/product`} className="card">
            <div>
                <div className="numbers">{product?.count}</div>
                <div className="card-name">Products</div>
            </div>
            <AiOutlineDesktop />
        </Link>

        {/* total user */}
        {/* <div className="card">
            <div>
                <div className="numbers">10</div>
                <div className="card-name">Users</div>
            </div>
            <AiOutlineUser />
        </div> */}

        {/* recent order */}
        <Link href={`/dashboard/order`} className="card">
            <div>
                <div className="numbers">{order?.count ? order?.count : 0}</div>
                <div className="card-name">Pending Order</div>
            </div>
            <AiOutlineShoppingCart />
        </Link>
    </div>
  )
}

export default CardBox