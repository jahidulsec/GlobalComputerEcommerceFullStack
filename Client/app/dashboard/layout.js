'use client';


import { useEffect, useState } from 'react'
import {AiOutlineHome, AiOutlineBranches, AiOutlineShoppingCart} from 'react-icons/ai'
import {BiCategoryAlt, BiLaptop} from 'react-icons/bi'
import {PiSlideshowBold, PiSidebarSimpleBold} from 'react-icons/pi'
import {MdOutlineDescription} from 'react-icons/md'
import {GoCodespaces} from 'react-icons/go'
import { notFound, usePathname } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import Link from 'next/link';
import Topbar from '@/components/dashboard/Topbar';
import { toTitleCase } from '@/utilities/toTitleCase';




const Dashboard = ({children}) => {

    const [toggle, setToggle] = useState(true)
    const [tab, setTab] = useState()
    const pathname = usePathname()

    const {groups, user, onAuth} = useAuthContext()

    useEffect(() => {
        let localAuth;
        if (typeof(window)!=='undefined') {
            localAuth = localStorage.getItem('glc_t')
        }
        if (typeof(window)!=='undefined' && localAuth && localAuth != 'undefined') {
            onAuth(JSON.parse(localAuth))
        }
    }, [user])


    useEffect(() => {
        setTab(pathname.split("/").slice(1,))
        const NavList = document.querySelectorAll('.dashboard .navigation ul li')
        const NavLinkList = document.querySelectorAll('.dashboard .navigation ul li a')

        const handleNavActive = () => {
            for(let i=0; i<NavList.length; i++) {
                NavList[i].className = NavLinkList[i].className
            }
            return
        }

        handleNavActive()
        console.log(!user.is_staff)

    }, [pathname])

    if( !user?.is_staff ) {
        notFound()
    } else {
        return (
            <section className='dashboard'>
                <div className="container">
                    <aside 
                        className={`navigation ${toggle && 'navbar'}`}
                    >
                        <ul>
                            <li>
                                <Link href={'/'} id='logo'>
                                    <img className='big'src={`/global_big.svg`} alt="global_logo" loading='lazy'/> 
                                </Link>
                            </li>
                            <li>
                                <Link href={'/dashboard'} className={pathname == '/dashboard' ? `active` : ``}>
                                    <AiOutlineHome className='icon' />
                                    <span className="title">Dashboard</span>
                                </Link>
                            </li>
                            <li>
                                <Link href={'/dashboard/category'} className={pathname.split('/')[2] && pathname.split('/')[2] == 'category' ? `active` : ``}>
                                    <BiCategoryAlt className='icon' />
                                    <span className="title">Category</span>
                                </Link>
                            </li>
                            <li>
                                <Link href={'/dashboard/brand'} className={pathname.split('/')[2] && pathname.split('/')[2] == 'brand' ? `active` : ``}>
                                    <AiOutlineBranches className='icon' />
                                    <span className="title">Brand</span>
                                </Link>
                            </li>
                            {
                                groups &&
                                groups.find((item) => {
                                    return item == 'Manager'
                                }) &&
                                    <li>
                                        <Link href={'/dashboard/side-menu'} className={pathname.split('/')[2] && pathname.split('/')[2] == 'side-menu' ? `active` : ``}>
                                            <PiSidebarSimpleBold className='icon' />
                                            <span className="title">Side Menu</span>
                                        </Link>
                                    </li>
                            }
        
                            <li>
                                <Link href={'/dashboard/product'} className={pathname.split('/')[2] && pathname.split('/')[2] == 'product' ? `active` : ``}>
                                    <BiLaptop className='icon' />
                                    <span className="title">Product</span>
                                </Link>
                            </li>
                            <li>
                                <Link href={'/dashboard/key-feature'} className={pathname.split('/')[2] && pathname.split('/')[2] == 'key-feature' ? `active` : ``}>
                                    <GoCodespaces className='icon' />
                                    <span className="title">Key Feature</span>
                                </Link>
                            </li>
                            <li>
                                <Link href={'/dashboard/specification'} className={pathname.split('/')[2] && pathname.split('/')[2] == 'specification' ? `active` : ``}>
                                    <MdOutlineDescription className='icon' />
                                    <span className="title">Specification</span>
                                </Link>
                            </li>
                            {
                                groups &&
                                groups.find((item) => {
                                    return item == 'Manager'
                                }) &&
                                <>
                                    <li>
                                        <Link href={'/dashboard/slider'} className={pathname.split('/')[2] && pathname.split('/')[2] == 'slider' ? `active` : ``}>
                                            <PiSlideshowBold className='icon' />
                                            <span className="title">Slider</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={'/dashboard/order'} className={pathname.split('/')[2] && pathname.split('/')[2] == 'order' ? `active` : ``}>
                                            <AiOutlineShoppingCart className='icon' />
                                            <span className="title">Order</span>
                                        </Link>
                                    </li>
                                </>
                            }
                        </ul>
                    </aside>
        
                    <div className={`dash-main ${toggle ? 'navbar' : ''}`}>
                        <Topbar 
                            toggle={toggle} 
                            setToggle={setToggle}
                        />
                        
                        <div className="breadcrump">
                            <ul className="flexitem">
                                {
                                    tab && 
                                    tab.map(item => (
                                        <li key={item}>
                                            {toTitleCase(item)}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
        
                        {children}
                        
                    </div>
                </div>
            </section>
        
          )
    }

    
  
}

export default Dashboard