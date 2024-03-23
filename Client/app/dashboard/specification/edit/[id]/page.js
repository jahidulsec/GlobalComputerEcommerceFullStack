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
import NoItem from '@/utilities/NoItem';
import SuccessStatus from '@/utilities/SuccessStatus';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react'
import { insert, useFormik } from 'formik'
import * as Yup from 'yup'



const SpecificationEditDash = () => {

    const { auth } = useAuthContext()

    const [response, handleProductSpecs] = useGeneralGET()
    const [singleSpecRes, handleSingleSpecResGET] = useGeneralGET()
    const [loadingSpec, errorSpec, successSpec, handleSpecPATCH] = useGeneralPATCH()
    const [loadingTable, errorTable, successTable, handleTablePATCH] = useGeneralPATCH()
    
    const { id } = useParams()
    
    const [val, setVal] = useState([])
    const [modal, setModal] = useState({
        id: '',
        show: false,
    })

    const [insertField, setInsertModal] = useState({
        id: '',
        show: false,
    })

    const [tableName, setTableName] = useState()
    const [tableData, setTableData] = useState({
        product_id: '',
        tables: [
            {
                table: '',
                fields: []
            }
        ]
    })


    //  custom hooks
    const [loading, error, success, handleSpecification] = useGeneralPOST()
    const [loadingAdd, errorAdd, successAdd, handleAddSpecPOST] = useGeneralPOST()
    const [delStatus, handelDelTable] = useGeneralDEL()
    const [delStatusSingleSpec, handelDelSingleSpec] = useGeneralDEL()


    const formik = useFormik({
        initialValues: {
            field_name: singleSpecRes && singleSpecRes.field_name,
            field_description: singleSpecRes && singleSpecRes.field_description,
        },
        enableReinitialize: true,
        onSubmit: async(values) => {
            handleSpecPATCH(`spec`, modal.id, values, auth)
        },
        validationSchema: Yup.object({
            field_name: Yup.string(),
            field_description: Yup.string(),
        })
    })

    const formikAdd = useFormik({
        initialValues: {
            specification_id: insertField.id && insertField.id,
            field_name: '',
            field_description: '',
        },
        enableReinitialize: true,
        onSubmit: async(values) => {
            handleAddSpecPOST(`single-spec-add`, values, auth)
        },
        validationSchema: Yup.object({
            specification_id: Yup.string(),
            field_name: Yup.string().required(),
            field_description: Yup.string().required(),
        })
    })

    const formikTableName = useFormik({
        initialValues: {
            table_name: ''
        },
        onSubmit: async(values) => {
            handleTablePATCH(`spec-table`, insertField.id, values, auth)
        },
        validationSchema: Yup.object({
            table_name: Yup.string().required('Enter a table name!'),
        })
    })

    const handleAdd = () => {
        const add = [...val, []]
        setVal(add)
    }

    const handleChange = (e, idx) => {
        const inputData = [...val]
        inputData[idx] = {
            ...inputData[idx], 
            [e.target.name]: e.target.value
        }
        setVal(inputData)
    }

    const handleDelField = (idx) => {
        const delVal = [...val]
        delVal.splice(idx,1)
        setVal(item => {
            return delVal
        })
    }


    useEffect(() => {
        
        handleProductSpecs({name: `specification`, id: id})
        window.scrollTo(0,0)

    }, [delStatus, delStatusSingleSpec, success, successSpec, successAdd, successTable])


    useEffect(() => {
        if(modal.id) {
            handleSingleSpecResGET({name:`spec`, id: modal.id, token: auth})
        }
    }, [modal])



    useEffect(() => {
        setTableData({
            product_id: id,
            tables: [
                {
                    table_name: tableName,
                    fields: val,
                }
            ]
        })
    },[val])

    const handleSubmit = (e) => {
        e.preventDefault()
        handleSpecification(`specification`, tableData, auth)
        setVal([])
    }

    useEffect(() => {
        const modalTable = document.querySelector('.modal__spec-table')
        if(modal.show) {
            modalTable.showModal()
        }
    }, [modal])

    useEffect(() => {
        const insertTable = document.querySelector('.modal__add-spec-table')
        if(insertField.show) {
            insertTable.showModal()
        }
    }, [insertField])

    const handleCloseAddModal = () => {
        const insertTable = document.querySelector('.modal__add-spec-table')
        insertTable.close()
    }

    const handleCloseEditModal = () => {
        const editTable = document.querySelector('.modal__spec-table')
        editTable.close()
    }




  return (
    <section className='column'>
        <div className="products one">
            <div className="flexwrap">
                <div className="row">
                    
                    <form className="add-form styled" onSubmit={handleSubmit}>
                        <div className='spec-form-header'>
                            <h2>Add Specification</h2>
                            <button
                                type='button'
                                className="secondary-btn"
                                onClick={() =>{handleAdd()}}
                            >
                                Add Field
                            </button>
                        </div>
                        

                        {/* ------TABLE----- */}
                        <div>
                            <p>
                                <label htmlFor="table_name">Table Name <span></span></label>
                                <input 
                                    type="text" 
                                    name='table_name' 
                                    id='table_name'
                                    onChange={e => setTableName(e.target.value)}
                                />
                            </p>

                            {
                                // add fields
                                val.map((data, idx) => (
                                    <div key={idx} className='table-form-field flexitem'>
                                        <p>
                                            <label htmlFor="field_name">Field name <span></span></label>
                                            <input 
                                                type="text" 
                                                name='field_name' 
                                                id='field_name'
                                                onChange={(e) => {handleChange(e,idx)}}
                                            />
                                        </p>
                                        <p>
                                            <label htmlFor="field_name">Field Description <span></span></label>
                                            <input 
                                                type="text" 
                                                name='field_description' 
                                                id='field_description'
                                                onChange={(e) => {handleChange(e,idx)}}
                                            />
                                        </p>
                                        <button className='btn-close' type='button' onClick={() => {handleDelField(parseInt(idx))}}>
                                            <span className="ri-close-line"></span>
                                        </button>
                                    </div>
                                ))
                            }
                            
                        </div>
                        <Button
                            type={'submit'}
                            className={'secondary-btn'}
                            loading={loading}
                        >
                            Add Spec Table
                        </Button>  

                        <ErrorStatus error={error} />
                        <SuccessStatus success={success} />
                            
                    </form>
                </div>
                <div className="row">
                    <div className='add-form styled'>
                        
                        <h2>Specification Table</h2>
                        <DelStatus delStatus={delStatus || delStatusSingleSpec} />

                        {
                            response ?
                            response.map((item, i) => (
                                <table key={i} className='spec-table'>
                                    <thead>
                                        <tr>
                                            <th>{item.table_name}</th>
                                            <th>
                                                <ButtonClose onClick={() => {handelDelTable(`spec-table`, item.id, auth)}} />
                                                <button type='button' title='Insert New Field' className='spec__btn' onClick={() => {setInsertModal({id: item.id, show: true})}}>
                                                    <span className='ri-add-line'></span>
                                                </button>
                                            </th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    {
                                        item.spec_table &&
                                        item.spec_table.map((field, index) => (
                                            <tbody key={index}>
                                                <tr>
                                                    <td>{field.field_name}</td>
                                                    <td>{field.field_description}</td>
                                                    <ButtonClose onClick={() => {handelDelSingleSpec(`spec`, field.id, auth)}} />
                                                    <button type='button' title='Edit' className='spec__btn' onClick={() => {setModal({id: field.id, show: true})}}>
                                                        <span className='ri-edit-box-line'></span>
                                                    </button>
                                                </tr>
                                            </tbody>
                                        ))


                                    }

                                </table>

                            )) :
                                                        
                            <NoItem />
                        }
                    </div>
                </div>
            </div>
        </div>


        {/* modal for single spec */}
        <dialog className='modal__spec-table'>
            {
                modal.id &&
                <div className='flexcol'>
                    <div className='flexspace'>
                        <h2>Edit Field</h2>
                        <button type='button' title='Close' onClick={handleCloseEditModal}>
                            <span className='ri-close-line ri-xl'></span>
                        </button>
                    </div>
                    
                    <div className='spec-table-edit'>
                        <form 
                            className='add-form styled' 
                            onSubmit={formik.handleSubmit}
                        >
                            <h3>Field Form</h3>
                            <p>
                                <label htmlFor={`field_name`}>Name</label>
                                <input 
                                    name={`field_name`} 
                                    id={`field_name`} 
                                    value={formik.values.field_name} 
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </p>
                            <p>
                                <label htmlFor={`field_description`}>Description</label>
                                <input 
                                    name={`field_description`} 
                                    id={`field_description`} 
                                    value={formik.values.field_description}
                                    onChange={formik.handleChange} 
                                    onBlur={formik.handleBlur}
                                />
                            </p>
                            <Button loading={loadingSpec} className='light-btn' type='submit'>Submit</Button>
                            <SuccessStatus success={successSpec} />
                            <ErrorStatus error={errorSpec} />
                        </form>
                    </div>

                </div>
            }
        </dialog>

        {/* modal for insert field */}
        <dialog className='modal__add-spec-table'>
            {
                insertField.id &&
                <div className='flexcol'>

                    <div className='flexspace'>
                        <h2>Insert or edit field</h2>
                        <button type='button' title='Close' onClick={handleCloseAddModal}>
                            <span className='ri-close-line ri-xl'></span>
                        </button>
                    </div>

                    <div className='spec-table-edit'>
                        <form className='add-form styled' onSubmit={formikTableName.handleSubmit}>
                            <h3>Edit Table Name</h3>
                            <p>
                                <label htmlFor={`table_name`}>Table Name</label>
                                <input 
                                    name={`table_name`} 
                                    id={`table_name`} 
                                    value={formikTableName.values.table_name} 
                                    onChange={formikTableName.handleChange}
                                    onBlur={formikTableName.handleBlur}
                                />
                                {
                                    formikTableName.errors.table_name && formikTableName.touched.table_name &&
                                    <span className="required">{formikTableName.errors.table_name}</span>
                                }
                                {
                                    errorTable?.table_name &&
                                    <span className="required">{errorAdd.table_name}</span>
                                }
                            </p>
                            <Button loading={loadingTable} className='light-btn' type='submit'>Update</Button>
                            <SuccessStatus success={successTable} />
                            <ErrorStatus error={errorTable} />
                        </form>
                    </div>
                    
                    <div className='spec-table-edit'>
                        <form 
                            className='add-form styled'
                            onSubmit={formikAdd.handleSubmit}
                        >
                            <h3>Insert Field Form</h3>
                            <p>
                                <label htmlFor={`specification_id`}>Specification_id</label>
                                <input 
                                    name={`specification_id`} 
                                    id={`specification_id`} 
                                    value={formikAdd.values.specification_id} 
                                    disabled
                                />
                            </p>
                            <p>
                                <label htmlFor={`field_name`}>Name</label>
                                <input 
                                    name={`field_name`} 
                                    id={`field_name`} 
                                    value={formikAdd.values.field_name} 
                                    onChange={formikAdd.handleChange}
                                    onBlur={formikAdd.handleBlur}
                                />
                                {
                                    formikAdd.errors.field_name && formikAdd.touched.field_name &&
                                    <span className="required">{formikAdd.errors.field_name}</span>
                                }
                                {
                                    errorAdd?.field_name &&
                                    <span className="required">{errorAdd.field_name}</span>
                                }
                            </p>
                            <p>
                                <label htmlFor={`field_description`}>Description</label>
                                <input 
                                    name={`field_description`} 
                                    id={`field_description`} 
                                    value={formikAdd.values.field_description}
                                    onChange={formikAdd.handleChange} 
                                    onBlur={formikAdd.handleBlur}
                                />
                                {
                                    formikAdd.errors.field_description && formikAdd.touched.field_description &&
                                    <span className="required">{formikAdd.errors.field_description}</span>
                                }
                                {
                                    errorAdd?.field_description &&
                                    <span className="required">{errorAdd.field_description}</span>
                                }
                            </p>
                            <Button loading={loadingAdd} className='light-btn' type='submit'>Submit</Button>
                            <SuccessStatus success={successAdd} />
                            <ErrorStatus error={errorAdd} />
                        </form>
                    </div>

                </div>
            }
        </dialog>


    </section>
  )
}

export default SpecificationEditDash