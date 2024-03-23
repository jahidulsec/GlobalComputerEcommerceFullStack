'use client';


import { useEffect, useState } from 'react'
import { useGeneralGET } from '@/hook/useGeneralGET';
import Link from 'next/link';
import Image from 'next/image';
import { useSideMenuContext } from '@/context/SideMenuContext';
import { usePathname } from 'next/navigation';


const SideNav = () => {

    const [sideCat, handleSideCatGET] = useGeneralGET()
    const {showMenu, setShowMenu} = useSideMenuContext()
    const pathname = usePathname()

    const [active, setActive] = useState(``)

    

        useEffect(() => {
            handleSideCatGET({name: `side-menu`})
        },[])
        
   

    

  return (
    
    // Mobile menu
    pathname.slice(0,10) !== '/dashboard' &&
    <aside className={`side-off desktop-hide ${showMenu ? 'showmenu' : ''}`}>
        <div className="off-canvus">
            <div className="canvus-head flexitem">
            <div className="logo">
                <Link href={`/`}>
                    <Image src={`/${process.env.NEXT_PUBLIC_LOGO_BIG_BNW}`} alt="Global Computer BD Logo" width={160} height={90} />
                </Link>
            </div>
            <button 
                onClick={() => setShowMenu(false)}
                className="t-close flexcenter"
            >
                <span className="ri-close-line"></span>
            </button>
            </div>
            <div className="departments">
                <div className="dpt-head">
                    <div className="main-text">All departments</div>
                </div>
                <div className="dpt-menu">
                    <ul className="second-link">
                        {
                        sideCat &&
                        sideCat != undefined &&
                        sideCat.map((cat) => (
                            <li 
                                className={`${cat?.sub_side_menu.length != 0 ? `has-child` : ``} ${active == cat.id ? 'expand': ''}`}
                                key={cat.id}
                                onClick={(e) => {setActive(cat.id)}}
                            >
                                <span className='sub-menu-link'>
                                    <div className="icon-large"><i className={`ri-${cat.logo}`}></i></div>
                                        {cat.title} 
                                    {
                                        cat.sub_side_menu.length > 1 &&
                                            <div className="icon-small">
                                                <i className="ri-arrow-right-s-line"></i>
                                            </div>
                                    }
                                </span>
                                <ul>
                                {   
                                    cat?.sub_side_menu &&
                                    cat.sub_side_menu.map(list => (
                                        <li key={list.id} onClick={() => {setShowMenu(false)}}>
                                            <Link href={`/menu/${cat.slug}/${cat.query == 'brand' ? 'b' : 'c'}/${list.slug}`}>{list.name}</Link>
                                        </li> 
                                    )) 
                                }
                                    
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </aside>
  )
}

export default SideNav