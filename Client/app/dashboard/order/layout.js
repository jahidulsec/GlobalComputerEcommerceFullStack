'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";


const OrderDash = ({children}) => {

    const pathname = usePathname()  


  return (
    <section className='order-dash'>
        <div className="dash-header flexitem">
            <h1>Order</h1>
            <div className='add'>
                {
                    pathname !== '/dashboard/order' && 
                    <Link href={'/dashboard/order'} className='flexcenter'>
                        <span className={`ri-arrow-left-line`}></span>
                        <span>Go to order menu</span>
                    </Link>
                }
            </div>
        </div>
        
        {children}

    </section>
  )
}

export default OrderDash