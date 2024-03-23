"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";




const SpecificaionDash = ({children}) => {

  const pathname = usePathname()  


  return (
    <section className='specification-dash'>
        <div className="dash-header flexitem">
            <h1>Specification</h1>
            <div className='add'>
                
                {
                    pathname !== '/dashboard/specification' && 
                    <Link href={'/dashboard/specification'} className='flexcenter'>
                        <span className={`ri-arrow-left-line`}></span>
                        <span>Go to specification</span>
                    </Link>
                }
            </div>
        </div>
        
        {children}

    </section>
  )
}

export default SpecificaionDash