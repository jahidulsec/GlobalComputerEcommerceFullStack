"use client";


import { useAuthContext } from '@/context/AuthContext';
import { useGeneralGET } from '@/hook/useGeneralGET';
import { useGeneralPUT } from '@/hook/useGeneralPUT';
import Button from '@/utilities/Button';
import ErrorStatus from '@/utilities/ErrorStatus';
import SuccessStatus from '@/utilities/SuccessStatus';
import { useFormik } from 'formik'
import { useParams } from 'next/navigation';
import { useEffect } from 'react'
import * as Yup from 'yup'




const CategoryEditDash = () => {

    const {auth} = useAuthContext()

    const { id } = useParams()

    const [response, handleSingleCategory] = useGeneralGET()
    const [loading, error, success, handleCategory] = useGeneralPUT()


    useEffect(() => {
        handleSingleCategory({name: `category`,id: id})
    }, [id])


    useEffect(() => {
        if (error || success) {
            window.scrollTo(0, 0)
        }

    }, [success, error])
   

    // add form formik
    const formik = useFormik({
        initialValues: {
            title: response?.title,
        },
        enableReinitialize: true,
        onSubmit: async(values) => {
            handleCategory(`category`, id, values, auth)
            if (success) {   
                formik.resetForm()
            }
        },
        validationSchema: Yup.object({
            title: Yup.string().required("enter title!"),
        })
    })


    return (
    <form className="add-form styled" onSubmit={formik.handleSubmit}>
        <h2>Update Category</h2>
        <p>
            <label htmlFor="title">Name <span></span></label>
            <input 
                type="text" 
                name="title" 
                id="title" 
                placeholder='e.g. Processor'
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}  
            />
            {
                formik.errors.title && formik.touched.title &&
                <span className="required">{formik.errors.title}</span>
            }
            {
                error?.title &&
                <span className="required">{error.title}</span>
            }
        </p>
        <Button 
            type={'submit'}
            className={'secondary-btn'}
            loading={loading}
        >
            Update Category
        </Button>
        
        <SuccessStatus success={success} />
        
        <ErrorStatus error={error} />
    </form>
  )
}

export default CategoryEditDash