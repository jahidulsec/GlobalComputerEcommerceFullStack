"use client";


import { useLogin } from '@/hook/useLogin';
import Button from '@/utilities/Button';
import PasswordField from '@/utilities/PasswordField';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'



const LoginForm = () => {

    const router = useRouter()
    const [user, setUser] = useState()

    const {response, loading, error, login} = useLogin()


    const fetchUserData = async() => {
        if (response) {
            await fetch(process.env.NEXT_PUBLIC_API_URL+"/auth/v1/users/me/", {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Token " + response.auth_token, 
                }
            })
                .then(response => response.json())
                .then(data => {
                    setUser(data)
                })
        }
    }

    useEffect(() => {
        if (!response?.non_field_errors) {
            localStorage.setItem('glc_t', JSON.stringify(response?.auth_token || ''))
            fetchUserData()
            if (user) {
                router.push('/')
                return
            }
        }
    },[response, error, user])

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async(values) => {
            login(values)
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Enter valid email address!').required('Enter valid email address!'),
            password: Yup.string().required('Enter your password!').min(8, 'at least 8 characters long!')
        })
    })


  return (
    <>
    <form onSubmit={formik.handleSubmit}>
        <p>
            <label htmlFor="email">Email <span></span></label>
            <input 
                type="email"
                name="email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                {...formik.getFieldHelpers('email')}
            />
            {
                formik.errors.email && formik.touched.email &&
                <span className="required">{formik.errors.email}</span>
            }
        </p>
        
        <p>
            <label htmlFor="password">Password <span></span></label>
            <PasswordField 
                name={`password`}
                id={`password`}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {
                formik.errors.password && formik.touched.password &&
                <span className="required">{formik.errors.password}</span>
            }
        </p>
        
        <Button
            type="submit"
            className='primary-btn'
            loading={loading}
        >
            Login
        </Button>
    </form>

    <div className={`required-msg ${error?.non_field_errors && `failed`}`}>
    {error?.non_field_errors}
    </div>
    </>
  )
}

export default LoginForm