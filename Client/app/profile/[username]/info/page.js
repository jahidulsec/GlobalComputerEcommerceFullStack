"use client";


import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useAuthContext } from '@/context/AuthContext';
import { useParams } from 'next/navigation';
import Button from '@/utilities/Button';
import SuccessStatus from '@/utilities/SuccessStatus';
import ErrorStatus from '@/utilities/ErrorStatus';
import { useGeneralPATCH } from '@/hook/useGeneralPATCH';


const ProfileInfo = () => {

    const {user, auth} = useAuthContext()
    const [editDisable, setEditDisable] = useState(true)

    const {username} = useParams()

    const [loading, error, success, handleUserProfilePATCH] = useGeneralPATCH()

    const formik = useFormik({
        initialValues: {
            email: user && user.email,
            first_name: user && user.first_name,
            last_name: user && user.last_name,
            street_address: user && user.street_address,
            phone_number: user && user.phone_number,
            district: user && user.district,
            division: user && user.division,
        },
        enableReinitialize: true,
        onSubmit: async(values) => {
            handleUserProfilePATCH(`user-profile`, username, values, auth)
        },
        validationSchema: Yup.object({
            email: Yup.string().email().required("Must enter a valid email address!"),
            first_name: Yup.string(),
            last_name: Yup.string(),
            street_address: Yup.string(),
            district: Yup.string(),
            divison: Yup.string(),
            phone_number: Yup.string().min(11).max(15),
        })
    })

  return (
    <section className='profile-info box-shadow'>
        <div className="profile-info__header flexspace">
            <h3>Account Info</h3>
            {
                editDisable ?
                <button 
                    type='button' 
                    className='light-btn flexitem'
                    onClick={() => {setEditDisable(false)}}
                >
                    <span>Edit Profile</span>
                    <span className="ri-edit-box-line"></span>
                </button> :
                <button 
                    type="button"
                    className='light-btn flexitem'
                    onClick={() => {setEditDisable(true)}}
                >   
                    <span className="ri-arrow-left-line"></span>
                    <span>Back</span>
                </button>
            }
        </div>
        <form className="profile-info-content styled" onSubmit={formik.handleSubmit}>
            <div className="flexwrap">
                <p>
                    <label htmlFor='first_name'>First Name</label>
                    <input 
                        type='text'
                        id='first_name'
                        name='first_name'
                        onBlur={formik.handleBlur}  
                        onChange={formik.handleChange}
                        value={formik.values.first_name} 
                        disabled={editDisable}
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
                    <label htmlFor='last_name'>Last Name</label>
                    <input 
                        type='text'
                        id='last_name'
                        name='last_name' 
                        onBlur={formik.handleBlur} 
                        onChange={formik.handleChange}
                        value={formik.values.last_name} 
                        disabled={editDisable}
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
                    <label htmlFor='email'>Email</label>
                    <input 
                        type='email'
                        id='email' 
                        name='email' 
                        onBlur={formik.handleBlur} 
                        onChange={formik.handleChange}
                        value={formik.values.email} 
                        disabled={editDisable}
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
                    <label htmlFor='phone_number'>Phone</label>
                    <input 
                        type='phone'
                        id='phone_number'
                        name='phone_number' 
                        onBlur={formik.handleBlur} 
                        onChange={formik.handleChange}
                        value={formik.values.phone_number} 
                        disabled={editDisable}
                    />
                    {
                        formik.errors.phone_number && formik.touched.phone_number &&
                        <span className="required">{formik.errors.phone_number}</span>
                    }
                    {
                        error?.phone_number &&
                        <span className="required">{error.phone_number}</span>
                    }
                </p>
                <p>
                    <label htmlFor='street_address'>Street Address</label>
                    <input 
                        type='text'
                        id='street_address'
                        name='street_address' 
                        onBlur={formik.handleBlur} 
                        onChange={formik.handleChange}
                        value={formik.values.street_address} 
                        disabled={editDisable}
                    />
                    {
                        formik.errors.street_address && formik.touched.street_address &&
                        <span className="required">{formik.errors.street_address}</span>
                    }
                    {
                        error?.street_address &&
                        <span className="required">{error.street_address}</span>
                    }
                </p>
                <p>
                    <label htmlFor='district'>District</label>
                    <input 
                        type='text'
                        id='district'
                        name='district' 
                        onBlur={formik.handleBlur} 
                        onChange={formik.handleChange}
                        value={formik.values.district} 
                        disabled={editDisable}
                    />
                    {
                        formik.errors.district && formik.touched.district &&
                        <span className="required">{formik.errors.district}</span>
                    }
                    {
                        error?.district &&
                        <span className="required">{error.district}</span>
                    }
                </p>
                <p>
                    <label htmlFor='division'>Division</label>
                    <input 
                        type='text'
                        id='division'
                        name='division' 
                        onBlur={formik.handleBlur} 
                        onChange={formik.handleChange}
                        value={formik.values.division} 
                        disabled={editDisable}
                    />
                    {
                        formik.errors.division && formik.touched.division &&
                        <span className="required">{formik.errors.division}</span>
                    }
                    {
                        error?.division &&
                        <span className="required">{error.division}</span>
                    }
                </p>
            </div>

            {

                !editDisable &&
                <Button 
                    className={`secondary-btn flexitem gap-1`}
                    loading={loading}
                    type={`submit`}
                >
                    <span className="ri-upload-line"></span>
                    <span>Update Profile</span>
                </Button>
            
            }

            <SuccessStatus success={success} />
            <ErrorStatus error={error} />
        </form>
    </section>
  )
}

export default ProfileInfo