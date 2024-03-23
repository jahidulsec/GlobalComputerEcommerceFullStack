"use client";


import { useAuthContext } from "@/context/AuthContext"
import { useGeneralDEL } from "@/hook/useGeneralDEL"
import { useGeneralGET } from "@/hook/useGeneralGET"
import ButtonClose from "@/utilities/ButtonClose";
import NoItem from "@/utilities/NoItem"
import OrderStatus from "@/utilities/OrderStatus";
import { ToDateFormat } from "@/utilities/ToDateFormat"
import { currencyFormat } from "@/utilities/currencyFormat"
import { useEffect } from "react"


const ProfileOrder = () => {
  
    const [orderRes, handleOrderGET] = useGeneralGET()
    const [delStatus, handleOrderItemDEL] = useGeneralDEL() 

    const {auth} = useAuthContext()

    useEffect(() => {
    
        handleOrderGET({name: `order`, token: auth})

    }, [delStatus, auth])


  return (
    <section className='profile-order box-shadow'>
        <h3>Personal Order</h3>   
        <table>
            <thead>
                <tr>
                    <th>Invoice Id</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Total</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    orderRes && orderRes.length !== 0 &&
                    orderRes.map(item => (

                        <tr key={item.id} id={item.id}>
                            <td data-label='Invoice ID'>
                                {/* <Link to={`/dashboard/order/${item.id}`}> */}
                                    <span>
                                        {item.slug}
                                    </span>
                                {/* </Link> */}
                            </td>
                            <td data-label='Date'>{ToDateFormat(item.date)}</td>
                            <td data-label='Status'>
                                <OrderStatus status={item.status} />    
                            </td>
                            <td data-label='Total'>{currencyFormat(item.total)}</td>
                            <td data-label='Delete'>
                                <ButtonClose onClick={() => {handleOrderItemDEL(`order`, item.id, auth)}} />
                            </td>
                        </tr>
                    )) 
                    
                }
                
            </tbody>
        </table> 

        {
            orderRes && orderRes.length == 0 &&
            <NoItem />
        }
    </section>
  )
}

export default ProfileOrder