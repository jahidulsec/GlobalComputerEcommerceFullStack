"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";




const SliderDash = ({children}) => {

  const pathname = usePathname()  


  return (
    <section className='slider-dash'>
        <div className="dash-header flexitem">
            <h1>Slider</h1>
            <div className='add'>
                {
                    pathname === '/dashboard/slider' &&
                    <Link href={'/dashboard/slider/add'} className='flexcenter'>
                        <span>Add slider</span>
                        <span className={`ri-arrow-right-line`}></span>
                    </Link>
                }
                {
                    pathname !== '/dashboard/slider' && 
                    <Link href={'/dashboard/slider'} className='flexcenter'>
                        <span className={`ri-arrow-left-line`}></span>
                        <span>Go to slider menu</span>
                    </Link>
                }
            </div>
        </div>
        
        {children}

    </section>
  )
}

export default SliderDash