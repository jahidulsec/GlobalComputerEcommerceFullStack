"use client";

import Button from "@/utilities/Button";
import ErrorStatus from "@/utilities/ErrorStatus";
import PasswordField from "@/utilities/PasswordField";
import { useFormik } from 'formik'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as Yup from 'yup'



const ConfirmPasswordForm = ({params}) => {

  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const formik = useFormik({
        initialValues: {
            uid: params.uid,
            token: params.token,
            new_password: '',
            re_new_password: '',
        },
        enableReinitialize: true,
        onSubmit: async(values) => {
          console.log(values)
          setLoading(true)
          const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/auth/${process.env.NEXT_PUBLIC_API_VERSION}/users/reset_password_confirm/`, 
            {
              headers: {
                "Content-type": "application/json",
              }, 
              method:'POST',
              body: JSON.stringify(values)
            }
          )
          if (res.ok) {
            router.push('/login')
            setLoading(false)
          } else {
            setLoading(false)
            setError(
              res.json().then(data => {
                setError(data)
              })
            )
          }
        },
        validationSchema: Yup.object({
            uid: Yup.string(),
            token: Yup.string(),
            new_password: Yup.string().required('Enter a unique password!'),
            re_new_password: Yup.string().required('Password must be matched!'),
        })
    })

    useEffect(() => {
      setError('')
    }, [formik.values])


  return (
    <form className="add-form styled" onSubmit={formik.handleSubmit}>
      <p>
          <label htmlFor="new_password">New password <span></span>  </label>
          <PasswordField 
            value={formik.values.new_password}
            name={`new_password`}
            id={`new_password`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={`Enter a unique password!`}
          />
          {
            formik.errors.new_password && formik.touched.new_password &&
            <span className="required">{formik.errors.new_password}</span>
          }
      </p>
      <p>
          <label htmlFor="new_password">Confirm new password</label>
          <PasswordField 
            value={formik.values.re_new_password}
            name={`re_new_password`}
            id={`re_new_password`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={`Enter a unique password!`}
          />
          {
            formik.errors.re_new_password && formik.touched.re_new_password &&
            <span className="required">{formik.errors.re_new_password}</span>
          }
      </p>
      <Button type={'submit'} loading={loading} className={'secondary-btn'}>Send Reset Email</Button>
      <ErrorStatus error={error} />
    </form>
  )
}

export default ConfirmPasswordForm