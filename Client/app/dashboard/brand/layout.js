'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";



const BrandDash = ({children}) => {

  const pathname = usePathname()  


  return (
    <section className='brand-dash'>
        <div className="dash-header flexitem">
            <h1>Brand</h1>
            <div className='add'>
                {
                    pathname === '/dashboard/brand' &&
                    <Link href={'/dashboard/brand/add'} className='flexcenter'>
                        <span>Add Brand</span>
                        <span className={`ri-arrow-right-line`}></span>
                    </Link>
                }
                {
                    pathname !== '/dashboard/brand' && 
                    <Link href={'/dashboard/brand'} className='flexcenter'>
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

export default BrandDash