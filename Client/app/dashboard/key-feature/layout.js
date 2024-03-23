"use client";



import Link from 'next/link';
import { usePathname } from 'next/navigation'



const KeyFeatureDash = ({children}) => {

  const pathname = usePathname()  


  return (
    <section className='key-feature-dash'>
        <div className="dash-header flexitem">
            <h1>Key Feature</h1>
            <div className='add'>
                
                {
                    pathname !== '/dashboard/key-feature' && 
                    <Link href={'/dashboard/key-feature'} className='flexcenter'>
                        <span className={`ri-arrow-left-line`}></span>
                        <span>Go to key feature</span>
                    </Link>
                }
            </div>
        </div>
        
        {children}

    </section>
  )
}

export default KeyFeatureDash