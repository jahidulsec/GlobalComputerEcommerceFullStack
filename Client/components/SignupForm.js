"use client";


import { useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useGeneralPOST } from '@/hook/useGeneralPOST';
import PasswordField from '@/utilities/PasswordField';
import Button from '@/utilities/Button';
import SuccessStatus from '@/utilities/SuccessStatus';
import ErrorStatus from '@/utilities/ErrorStatus';

const SignupForm = () => {

    const [loading, error, success, handleSignup] = useGeneralPOST()


    useEffect(() => {
        if (success || error) {
            window.scrollTo(0, document.body.scrollHeight)
        }

        if (success) {   
            formik.resetForm()
        }
    }, [success, error])

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            first_name: '',
            last_name: '',
            password: '',
            re_password: '',
        },
        onSubmit: async(values) => {
            values.username = values.username.toLowerCase()
            console.log(values)
            handleSignup(`users`, values, ``, true)
        },
        validationSchema: Yup.object({
            first_name: Yup.string().required('Enter your first name!').lowercase('Enter all lowercase letter!'),
            last_name: Yup.string().required('Enter your last name!'),
            username: Yup.string().required('Enter username!'),
            email: Yup.string().email('Enter valid email address!').required('Enter valid email address!'),
            password: Yup.string().required('Enter your password!').min(8, 'at least 8 characters long!'),
            re_password: Yup.string().required('Enter your password!').min(8, 'at least 8 characters long!')
        })
    })


  return (
    <form onSubmit={formik.handleSubmit}>
        <p>
            <label htmlFor="email">Username <span></span></label>
            <input 
                type="username"
                name="username"
                id="username"
                value={formik.values.username.toLowerCase()}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                {...formik.getFieldHelpers('username')}
            />
            {
                formik.errors.username && formik.touched.username &&
                <span className="required">{formik.errors.username}</span>
            }
            {
                error?.username &&
                <span className="required">{error.username}</span>
            }
        </p>
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
            {
                error?.email &&
                <span className="required">{error.email}</span>
            }
        </p>
        <p>
            <label htmlFor="first_name">First name <span></span></label>
            <input 
                type="first_name"
                name="first_name"
                id="first_name"
                value={formik.values.first_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                {...formik.getFieldHelpers('first_name')}
            />
            {
                formik.errors.first_name && formik.touched.first_name &&
                <span className="required">{formik.errors.first_name}</span>
            }
            {
                error?.first_name &&
                <span className="required">{error.first_name}</span>
            }
        </p>
        <p>
            <label htmlFor="last_name">Last name <span></span></label>
            <input 
                type="last_name"
                name="last_name"
                id="last_name"
                value={formik.values.last_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                {...formik.getFieldHelpers('last_name')}
            />
            {
                formik.errors.last_name && formik.touched.last_name &&
                <span className="required">{formik.errors.last_name}</span>
            }
            {
                error?.last_name &&
                <span className="required">{error.last_name}</span>
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
            {
                error?.password &&
                <span className="required">{error.password}</span>
            }
        </p>
        <p>
            <label htmlFor="re_password">Confirm Password <span></span></label>
            <PasswordField 
                name={`re_password`}
                id={`re_password`}
                value={formik.values.re_password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {
                formik.errors.re_password && formik.touched.re_password &&
                <span className="required">{formik.errors.re_password}</span>
            }
            {
                error?.re_password &&
                <span className="required">{error.re_password}</span>
            }
        </p>
        <Button
            type={"submit"}
            className={'primary-btn'}
            loading={loading}
        >
            Create Account
        </Button>

        <SuccessStatus success={success} />

        <ErrorStatus error={error} />
    </form>
  )
}

export default SignupForm