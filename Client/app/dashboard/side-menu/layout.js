"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const SideMenuDash = ({children}) => {

  const pathname = usePathname()  


  return (
    <section className='product-dash'>
        <div className="dash-header flexitem">
            <h1>Side Menu</h1>
            <div className='add'>
                {
                    pathname === '/dashboard/side-menu' &&
                    <Link href={'/dashboard/side-menu/add'} className='flexcenter'>
                        <span>Add Side menu</span>
                        <span className={`ri-arrow-right-line`}></span>
                    </Link>
                }
                {
                    pathname !== '/dashboard/side-menu' && 
                    <Link href={'/dashboard/side-menu'} className='flexcenter'>
                        <span className={`ri-arrow-left-line`}></span>
                        <span>Go to Side menu</span>
                    </Link>
                }
            </div>
        </div>
        
        {children}

    </section>
  )
}

export default SideMenuDash