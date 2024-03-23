"use client";


import { useAuthContext } from '@/context/AuthContext';
import { useGeneralPOST } from '@/hook/useGeneralPOST';
import Button from '@/utilities/Button';
import ErrorStatus from '@/utilities/ErrorStatus';
import SuccessStatus from '@/utilities/SuccessStatus';
import { useFormik } from 'formik'
import { useEffect } from 'react'
import * as Yup from 'yup'




const CategoryAddForm = () => {

    const {auth} = useAuthContext()

    const [loading, error, success, handleCategory] = useGeneralPOST()


    useEffect(() => {
        if (success || error) {
            window.scrollTo(0, 0)
        }

        if (success) {   
            formik.resetForm()
        }
    }, [success, error])
   
    
    // add form formik
    const formik = useFormik({
        initialValues: {
            title: '',
        },
        onSubmit: async(values) => {
            handleCategory(`category`,values, auth)
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
        <h2>Add Category</h2>
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
            Add Category
        </Button>
        
        <SuccessStatus success={success} />
        
        <ErrorStatus error={error} />
        
    </form>
  )
}

export default CategoryAddForm