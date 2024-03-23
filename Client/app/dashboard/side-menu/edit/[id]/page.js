"use client";


import { useAuthContext } from '@/context/AuthContext';
import { useGeneralDEL } from '@/hook/useGeneralDEL';
import { useGeneralGET } from '@/hook/useGeneralGET';
import { useGeneralPATCH } from '@/hook/useGeneralPATCH';
import { useGeneralPOST } from '@/hook/useGeneralPOST';
import Button from '@/utilities/Button';
import ButtonClose from '@/utilities/ButtonClose';
import DelStatus from '@/utilities/DelStatus';
import ErrorStatus from '@/utilities/ErrorStatus';
import SuccessStatus from '@/utilities/SuccessStatus';
import { useFormik } from 'formik'
import { useParams } from 'next/navigation';
import { useEffect } from 'react'
import * as Yup from 'yup'



const SideMenuEditDash = () => {
    const [response, handleSingleSideMenuGET] = useGeneralGET()
    const [responseSideMenu, handleSideMenuGET] = useGeneralGET()
    const [loading, error, success, handleSideMenuPATCH] = useGeneralPATCH()
    const [loadingSubMenu, errorSubMenu, successSubMenu, handleSideMenuPOST] = useGeneralPOST()
    const [delStatus, handleSubMenuDEL] = useGeneralDEL()

    const {auth} = useAuthContext()

    const { id } = useParams()


    useEffect(() => {
        handleSingleSideMenuGET({name: `side-menu`,id :id})
        handleSideMenuGET({name: `side-menu`})
    }, [successSubMenu, delStatus])

    useEffect(() => {
        if (success || error) {
            window.scrollTo(0, document.body.scrollHeight)
        }
    }, [success, error])


    
    const formik = useFormik({
        initialValues: {
            title: response?.title,
            logo: response?.logo,
        },
        enableReinitialize: true,
        onSubmit: async(values) => {
            handleSideMenuPATCH(`side-menu`, id, values, auth)
            
        },
        validationSchema: Yup.object({
            title: Yup.string().required("enter slug title!"),
            logo: Yup.string().required("enter title!"),
        })
    })

    const formikSubMenu = useFormik({
        initialValues: {
            name: '',
            side_menu_id: '',
        },
        onSubmit: async(values) => {
            handleSideMenuPOST(`sub-side-menu`, values, auth)
        },
        validationSchema: Yup.object({
            name: Yup.string().required("enter name !"),
            side_menu_id: Yup.string().required("Select a side menu!"),
        })
    })


  return (
    response &&
    <>
        <form className="add-form styled" onSubmit={formik.handleSubmit}>

            <h2>Edit Side Menu</h2>
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
            <p>
                <label htmlFor="logo">Logo <span></span></label>
                <input 
                    type="text" 
                    name="logo" 
                    id="logo" 
                    placeholder='e.g. macbook-line, see "remix-icon" website '
                    value={formik.values.logo}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {
                    formik.errors.logo && formik.touched.logo &&
                    <span className="required">{formik.errors.logo}</span>
                }
                {
                    error?.logo &&
                    <span className="required">{error.title}</span>
                }
            </p>
            <Button
                type={'submit'}
                className={'secondary-btn'}
                loading={loading}
            >
                Update Side Menu
            </Button>

            <SuccessStatus success={success} />
            
            <ErrorStatus error={error} />

        </form>

        <section className="column">
            <div className="products one">
                <div className="flexwrap">
                    <div className="row">
                        <form className="add-form styled" onSubmit={formikSubMenu.handleSubmit}>
                            <h2>Add Sub Menu</h2>
                            <p>
                                <label htmlFor="name">Name <span></span></label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    id="name"
                                    value={formikSubMenu.values.name}
                                    onChange={formikSubMenu.handleChange}
                                    onBlur={formikSubMenu.handleBlur}
                                />
                                {
                                    formik.errors.name && formik.touched.name &&
                                    <span className="required">{formik.errors.name}</span>
                                }
                                {
                                    error?.name &&
                                    <span className="required">{error.name}</span>
                                }
                            </p>
                            <p>
                                <label htmlFor="side_menu_id">Side Menu <span></span></label>
                                <select 
                                    name="side_menu_id" 
                                    id="side_menu_id" 
                                    defaultValue={''}
                                    value={formikSubMenu.values.side_menu_id}
                                    onChange={formikSubMenu.handleChange}
                                    onBlur={formikSubMenu.handleBlur}
                                >
                                    <option value="">Select Side Menu</option>
                                    {
                                        responseSideMenu &&
                                        responseSideMenu.map(menu => (
                                            <option key={menu.id} value={menu.id}>{menu.title}</option>
                                        ))
                                    }
                                </select>
                                {
                                    formik.errors.side_menu_id && formik.touched.side_menu_id &&
                                    <span className="required">{formik.errors.side_menu_id}</span>
                                }
                                {
                                    error?.side_menu_id &&
                                    <span className="required">{error.side_menu_id}</span>
                                }
                            </p>
                            <Button 
                                type={'submit'}
                                className={'secondary-btn'}
                                loading={loadingSubMenu}
                            >
                                Add Sub Side Menu
                            </Button>

                            <SuccessStatus success={successSubMenu} />
                            
                            <ErrorStatus error={errorSubMenu} />
                        </form>
                    </div>

                    <div className="row">
                        <div className="sub-side-menu__container">
                            <DelStatus delStatus={delStatus} />
                            <h3>Sub Menu List</h3>
                            <table className='dash-table sub-side-menu-table'>
                                <thead>
                                    <th>Name</th>
                                    <th>Slug</th>
                                    <th>Delete</th>
                                </thead>
                                <tbody>
                                    {
                                        response && response.sub_side_menu.length != 0 &&
                                        response.sub_side_menu.map(item => (
                                            <tr key={item.id}>
                                                <td data-label={'Name'} >{item.name}</td>
                                                <td data-label={'Slug'} >{item.slug}</td>
                                                <td data-label='Delete' >
                                                    <ButtonClose onClick={() => {handleSubMenuDEL(`sub-side-menu`, item.id, auth)}} />
                                                </td>
                                            </tr>
                                        )) 
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        
    </>
  )
}

export default SideMenuEditDash