"use client";


import Link from 'next/link';
import { usePathname } from 'next/navigation'


const ProductDash = ({children}) => {

  const pathname = usePathname()  


  return (
    <section className='product-dash'>
        <div className="dash-header flexitem">
            <h1>Product</h1>
            <div className='add'>
                
                {
                    pathname.length <=  18 &&
                    <Link href={'/dashboard/product/add'} className='flexcenter'>
                        <span>Add Product</span>
                        <span className={`ri-arrow-right-line`}></span>
                    </Link>
                }
                {
                    pathname.length != 18 && 
                    <Link href={'/dashboard/product?page=1'} className='flexcenter'>
                        <span className={`ri-arrow-left-line`}></span>
                        <span>Go to brand menu</span>
                    </Link>
                }
            </div>
        </div>
        
        {children}

    </section>
  )
}

export default ProductDash