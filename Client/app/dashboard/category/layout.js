'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";


const CategoryDash = ({children}) => {

    const pathname = usePathname()  


  return (
    <section className='category-dash'>
        <div className="dash-header flexitem">
            <h1>Category</h1>
            <div className='add'>
                {
                    pathname === '/dashboard/category' &&
                    <Link href={'/dashboard/category/add'} className='flexcenter'>
                        <span>Add Category</span>
                        <span className={`ri-arrow-right-line`}></span>
                    </Link>
                }
                {
                    pathname !== '/dashboard/category' && 
                    <Link href={'/dashboard/category'} className='flexcenter'>
                        <span className={`ri-arrow-left-line`}></span>
                        <span>Go to category menu</span>
                    </Link>
                }
            </div>
        </div>
        
        {children}

    </section>
  )
}

export default CategoryDash