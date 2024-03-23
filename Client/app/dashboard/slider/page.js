"use client";


import { useAuthContext } from '@/context/AuthContext';
import { useGeneralDEL } from '@/hook/useGeneralDEL';
import { useGeneralGET } from '@/hook/useGeneralGET';
import ButtonClose from '@/utilities/ButtonClose';
import Loading from '@/utilities/Loading';
import NoItem from '@/utilities/NoItem';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react'



const SliderTable = () => {
    const {auth} = useAuthContext()

    const [response, handleSlider, loading] = useGeneralGET()
    const [delStatus, handleDelSlider] = useGeneralDEL()

   
    useEffect(() => {
        
        handleSlider({name: `slider`})
        
    },[delStatus])


  return (
    <>
    <div className="dash-table__container">
        <h2>Slider List</h2>
        <Loading loading={loading} />
        {
            loading == false &&
                <table className="dash-table">
                    <thead>
                        <tr>
                            <th>Slider Url</th>
                            <th>Slider Image</th>
                            <th>Mini Text</th>
                            <th>Middle Text</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            response && response.length !== 0 &&
                            response.map(item => (

                                <tr key={item.id} id={item.id}>
                                    <td>
                                        <Link href={`/dashboard/slider/edit/${item.id}`}>
                                            <span>{item.slider_url}</span>
                                        </Link>
                                    </td>
                                    <td data-label='Slider Image'>
                                        <Image className='thumbnail' src={item.image} width={80} height={80} loading='lazy'/>
                                    </td>
                                    <td data-label='Mini Text'>
                                        {item.mini_text}
                                    </td>
                                    <td data-label='Middle Text'>
                                        {item.mid_text}
                                    </td>
                                    <td data-label='Delete'>
                                        <ButtonClose onClick={() => {handleDelSlider(`slider`, item.id, auth)}} />
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

export default SliderTable