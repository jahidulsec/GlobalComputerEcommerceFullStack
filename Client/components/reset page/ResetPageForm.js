"use client";

import Button from "@/utilities/Button";
import { useFormik } from 'formik'
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as Yup from 'yup'



const ResetPageForm = () => {

  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
        initialValues: {
            email: '',
        },
        onSubmit: async(values) => {
          console.log(values)
          setLoading(true)
          const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/auth/${process.env.NEXT_PUBLIC_API_VERSION}/users/reset_password/`, 
            {
              headers: {
                "Content-type": "application/json",
              }, 
              method:'POST',
              body: JSON.stringify(values)
            }
          )
          if (res.ok) {
            router.push('/reset-status')
            setLoading(false)
          } else {
            setLoading(false)
          }
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Enter valid email address!').required('Enter valid email address!'),
        })
    })


  return (
    <form className="add-form styled" onSubmit={formik.handleSubmit}>
      <p>
          <label htmlFor="email">Email Address</label>
          <input 
            type="email" 
            name="email" 
            id="email" 
            placeholder="Enter your email!"
            value={formik.values.email} 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {
            formik.errors.email && formik.touched.email &&
            <span className="required">{formik.errors.email}</span>
          }
      </p>
      <Button type={'submit'} loading={loading} className={'secondary-btn'}>Send Reset Email</Button>
    </form>
  )
}

export default ResetPageForm