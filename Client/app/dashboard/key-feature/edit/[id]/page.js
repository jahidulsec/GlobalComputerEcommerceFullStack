"use client";


import { useAuthContext } from '@/context/AuthContext';
import { useGeneralDEL } from '@/hook/useGeneralDEL';
import { useGeneralGET } from '@/hook/useGeneralGET';
import { useGeneralPOST } from '@/hook/useGeneralPOST';
import Button from '@/utilities/Button';
import ButtonClose from '@/utilities/ButtonClose';
import DelStatus from '@/utilities/DelStatus';
import ErrorStatus from '@/utilities/ErrorStatus';
import SuccessStatus from '@/utilities/SuccessStatus';
import { useFormik } from 'formik'
import { useParams } from 'next/navigation';
import { useEffect } from 'react'
import { MdContentPasteOff } from 'react-icons/md';
import * as Yup from 'yup'



const KeyFeatureEditDash = () => {
    const {auth} = useAuthContext()

    const [response, handleProductFeature] = useGeneralGET()
    const [loading, error, success, handleFeature] = useGeneralPOST()
    const [delStatus, handleSingleFeatureDEL] = useGeneralDEL()

    const { id } = useParams()


    useEffect(() => {
        handleProductFeature({name: `feature`, id: id})
    }, [delStatus, success])


    useEffect(() => {

        if (success) {   
            formik.resetForm()
        }
    }, [success, error])


    const formik = useFormik({
        initialValues: {
            field_name: '',
            field_description: '',
            product_id: id,
        },
        onSubmit: (values) => {
            handleFeature(`feature`, values, auth)
        },
        validationSchema: Yup.object({
            field_name: Yup.string().required('Enter field name!'),
            field_description: Yup.string().required('Enter field description!'),
            product_id: Yup.number().integer().positive()
        })
    })




  return (
    <>

    <form className="add-form styled" onSubmit={formik.handleSubmit}>

        <h2>Add Feature</h2>

        <p>
            <label htmlFor="field_name">Field Name <span></span></label>
            <input 
                type="text" 
                name="field_name" 
                id="field_name" 
                placeholder='e.g. Processor'
                value={formik.values.field_name}
                onChange={formik.handleChange}
            />
            {
                formik.errors.field_name && formik.touched.field_name &&
                <span className="required">{formik.errors.field_name}</span>
            }
            {
                error?.field_name &&
                <span className="required">{error.field_name}</span>
            }
        </p>
        <p>
            <label htmlFor="field_description">Field Description <span></span></label>
            <input 
                type="text" 
                name="field_description" 
                id="field_description" 
                placeholder='e.g. core i5 11th Gen'
                value={formik.values.field_description}
                onChange={formik.handleChange}
            />
            {
                formik.errors.field_description && formik.touched.field_description &&
                <span className="required">{formik.errors.field_description}</span>
            }
            {
                error?.field_description &&
                <span className="required">{error.field_description}</span>
            }
        </p>
        
        
        <Button 
            type={'submit'}
            className={'secondary-btn'}
            loading={loading}
        >
           Add Feature
        </Button>    
    
        <SuccessStatus success={success} />
        
        <ErrorStatus error={error} />

    </form>

    <DelStatus delStatus={delStatus} />


    <table className='dash-table'>
        <thead>
            <th>Field name</th>
            <th>Field Description</th>
            <th>Delete</th>
        </thead>
        <tbody>
            {
                response ?
                response.map(item => (
                    <tr key={item.id}>
                        <td data-label={'Field name'} >{item.field_name}</td>
                        <td data-label={'Field Description'} >{item.field_description}</td>
                        <td data-label='Delete' >
                            <ButtonClose onClick={() => {handleSingleFeatureDEL(`single-feature`, item.id, auth)}} />
                        </td>
                    </tr>
                )) :
                <tr>
                    <td className='no-item flexcenter' >
                        <MdContentPasteOff />
                        <p>No item to show!</p>
                    </td>
                    <td></td>
                    <td></td>
                </tr> 
            }
        </tbody>
    </table>

    </>
  )
}

export default KeyFeatureEditDash