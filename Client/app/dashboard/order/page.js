"use client";

import { useAuthContext } from '@/context/AuthContext';
import { useGeneralDEL } from '@/hook/useGeneralDEL';
import { useGeneralGET } from '@/hook/useGeneralGET';
import ButtonClose from '@/utilities/ButtonClose';
import DelStatus from '@/utilities/DelStatus';
import Loading from '@/utilities/Loading';
import NoItem from '@/utilities/NoItem';
import OrderStatus from '@/utilities/OrderStatus';
import { ToDateFormat } from '@/utilities/ToDateFormat';
import { currencyFormat } from '@/utilities/currencyFormat';
import Link from 'next/link';
import { useEffect } from 'react'


const OrderTable = () => {
    const {auth} = useAuthContext()

    const [response, handleOrder, loading] = useGeneralGET()
    const [delStatus, handleDelOrder] = useGeneralDEL()

    useEffect(() => {

        handleOrder({name:`order`, token: auth})
        window.scrollTo(0,0)
        
    },[delStatus, auth])


  return (

    <>
    
    <DelStatus delStatus={delStatus} />

    <div className="dash-table-box box-shadow">
        <h2>Order List</h2>
        <Loading loading={loading} />
        {
            loading == false &&
                <table className="dash-table">
                    <thead>
                        <tr>
                            <th>Invoice Id</th>
                            <th>User</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Total</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            response && response.length !== 0 &&
                            response.map(item => (

                                <tr key={item.id} id={item.id}>
                                    <td>
                                        <Link href={`/dashboard/order/${item.id}`}>
                                            <span>
                                                {item.slug}
                                            </span>
                                        </Link>
                                    </td>
                                    <td data-label='User'>{item.user}</td>
                                    <td data-label='Date'>{ToDateFormat(item.date)}</td>
                                    <td data-label='Status'>
                                        <OrderStatus status={item.status} />    
                                    </td>
                                    <td data-label='Total'>{currencyFormat(item.total)}</td>
                                    <td data-label='Delete'>
                                        <ButtonClose onClick={() => {handleDelOrder(`order`, item.id, auth)}} />
                                    </td>
                                </tr>
                            ))                 
                        }
                        
                    </tbody>
                </table> 
        }

        {
            loading == false &&
            response && response.length == 0 &&
            <NoItem />
        }
    </div>



    </>

  )
}

export default OrderTable