"use client";


import { useAuthContext } from '@/context/AuthContext';
import { useGeneralDEL } from '@/hook/useGeneralDEL';
import { useGeneralGET } from '@/hook/useGeneralGET';
import ButtonClose from '@/utilities/ButtonClose';
import DelStatus from '@/utilities/DelStatus';
import Loading from '@/utilities/Loading';
import NoItem from '@/utilities/NoItem';
import Link from 'next/link';
import { useEffect } from 'react'


const SideMenuTable = () => {

    const [response, handleSideMenu, loading] = useGeneralGET()
    const [delStatus, handleDelSideMenu] = useGeneralDEL()

    const { auth } = useAuthContext()


    useEffect(() => {

        handleSideMenu({name:`side-menu`})
        
    },[delStatus])


  return (

    <>

    <DelStatus delStatus={delStatus} />
    <div className="dash-table__container">
        <h2>Side Menu List</h2>
        <Loading loading={loading} />
        {
            loading == false &&
                <table className="dash-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Query</th>
                            <th>Sub Side Menu</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            response && response.length !== 0 &&
                            response.map(item => (

                                <tr key={item.id} id={item.id}>
                                    <td>
                                        <Link className='flexitem gap-1' href={`/dashboard/side-menu/edit/${item.slug}`}>
                                            <span className={`ri-${item?.logo}`}></span>
                                            <span>{item.title}</span>
                                        </Link>
                                    </td>
                                    <td>{item.query}</td>
                                    <td>
                                        <ul>
                                        {
                                            item.sub_side_menu.length != 0 &&
                                            item.sub_side_menu.map(menu => (
                                                <li key={menu.id}>{menu.name}</li>
                                            ))
                                        
                                        }
                                        </ul>
                                    </td>
                                    <td data-label='Delete'>
                                        <ButtonClose onClick={() => {handleDelSideMenu(`side-menu`, item.slug, auth)}} />
                                    </td>
                                </tr>
                            ))
                        }
                        
                    </tbody>
                </table> 
        }

        {loading == false && response && response.length == 0 && <NoItem />}
    </div>

    </>

  )
}

export default SideMenuTable