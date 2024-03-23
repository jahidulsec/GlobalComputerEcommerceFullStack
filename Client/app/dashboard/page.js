"use client";


import CardBox from '@/components/dashboard/CardBox';
import { useAuthContext } from '@/context/AuthContext';
import { useGeneralGET } from '@/hook/useGeneralGET';
import NoItem from '@/utilities/NoItem';
import OrderStatus from '@/utilities/OrderStatus';
import { ToDateFormat } from '@/utilities/ToDateFormat';
import { currencyFormat } from '@/utilities/currencyFormat';
import Link from 'next/link';
import { useEffect } from 'react'

 


const DashboardDash = () => {
    const {auth} = useAuthContext()

    const [order,handleOrderGET] = useGeneralGET()


    useEffect(() => {
        handleOrderGET({name: `order`, token: auth, status: `0`})
    },[auth])

    


  return (
    <section className="dashboard-section">
        <CardBox />
        <div className="dash-table-box box-shadow">
            <h1>Recent Order</h1>
            <table className="dash-table">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        order && 
                        order.map(item => (

                        <tr key={item.id}>
                            <td>
                                <Link href={`/dashboard/order/${item.id}`}>
                                    <span>
                                        {item.user}
                                    </span>
                                </Link>
                            </td>
                            <td data-label='Date'>{ToDateFormat(item.date)}</td>
                            <td data-label='Status'>
                                <OrderStatus status={item.status} />
                            </td>
                            <td data-label='Subtotal'>{currencyFormat(item.total)}</td>
                        </tr>
                        ))
                    }
                    
                </tbody>
            </table>
            {
                order && order.length == 0 && <NoItem />
            }
        </div>
    </section>
  )
}

export default DashboardDash