'use client';

import { useAuthContext } from '@/context/AuthContext';
import { useFormPOST } from '@/hook/useFormPOST';
import { useGeneralGET } from '@/hook/useGeneralGET';
import Button from '@/utilities/Button';
import ErrorStatus from '@/utilities/ErrorStatus';
import SuccessStatus from '@/utilities/SuccessStatus';
import { useFormik } from 'formik'
import { usePathname } from 'next/navigation';
import { useEffect } from 'react'
import * as Yup from 'yup'




const ProductAddForm = () => {

    const {auth} = useAuthContext()

    // custom hook
    const [responseBrd, handleBrand] = useGeneralGET()
    const [responseCat, handleCategory] = useGeneralGET()
    const [responseSM, handleSideMenu] = useGeneralGET()
    const [loading, error, success, handleProductPOST] = useFormPOST()

    const pathname = usePathname()


    useEffect(() => {
        handleCategory({name: `category`, order: `title`})
        handleBrand({name: `brand`, order: `title`})
        handleSideMenu({name: `side-menu`, order: `title`})
    }, [pathname])

    useEffect(() => {
        if (success || error) {
            window.scrollTo(0, document.body.scrollHeight)
        }

        if (success) {   
            formik.resetForm()
        }
    }, [success, error])
        

    useEffect(() => {
        if (success || error) {
            window.scrollTo(0, document.body.scrollHeight)
        }

        if (success) {   
            formik.resetForm()
        }
}, [success, error])



    // image validator
    const validFileExtensions = { uploaded_images: ['jpg', 'png', 'jpeg', 'svg', 'webp', 'avif'] };

    function getAllowedExt() {
        return validFileExtensions["uploaded_images"].map((e) => `.${e}`).toString()
    } 

    const MAX_FILE_SIZE = 10 * 5 * 102400; //500KB


    function isValidFileType(fileName, fileType) {
        return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
    }

    let allowedExts = getAllowedExt();

    // calculate discount
    const calDiscount = (price, prev_price) => {
        if (prev_price == 0 || price == 0 || prev_price <= price) {
            return 0
        }
        let difference = prev_price - price
        let discount = ((difference) / prev_price * 100).toFixed(0)
        return discount
    }




    // add form formik

    const formik = useFormik({
        initialValues: {
            title: '',
            category_id: '',
            brand_id: '',
            side_menu_id: '',
            model_name: '',
            price: 0,
            prev_price: 0,
            emi_price: 0,
            is_stock: true,
            sold_stock: 0,
            total_stock: 0,
            description: '',
            featured: false,
            offered: false,
            offered_time: '',
            uploaded_images: '',
            display_big: false,
        },
        onSubmit: async(values) => {

            var formdata = new FormData();
            let idx = 0
            for (let [key, data] of Object.entries(values)) {
                idx += 1
                if (idx == 16) {
                    break
                }
                formdata.append(key, data)
            }

            for (let item of values.uploaded_images) {
                formdata.append("uploaded_images", item)
            }

            let discount = calDiscount(values?.price, values?.prev_price)

            formdata.append("discount", discount)

            handleProductPOST(`product`, formdata, auth)
        },
        validationSchema: Yup.object({
            title: Yup.string().required("enter title!"),
            category_id: Yup.string().required("enter category!"),
            brand_id: Yup.string().required("enter brand!"),
            side_menu_id: Yup.string().required('enter sidemenu'),
            model_name: Yup.string().required("enter model name!"),
            price: Yup.number(),
            prev_price: Yup.number(),
            emi_price: Yup.number(),
            is_stock: Yup.boolean(),
            sold_stock: Yup.number(),
            total_stock: Yup.number(),
            description: Yup.string(),
            featured: Yup.boolean(),
            display_big: Yup.boolean(),
            offered: Yup.boolean(),
            offered_time: Yup.date().nullable(),
            uploaded_images: Yup.array().of(
                Yup.mixed()
                .test("is-valid-type", "Not a valid image type",
                    value => isValidFileType(value && value.name.toLowerCase(), "uploaded_images"))
                .test("is-valid-size", "Max allowed size is 500KB",
                    value => value && value.size <= MAX_FILE_SIZE)
            )
        })
    })



  return (
    <form className="add-form styled " onSubmit={formik.handleSubmit}>
        <h2>Add Product</h2>
        <div className="product-form flexwrap">
            <div>
                <p>
                    <label htmlFor="title">Product name <span></span></label>
                    <input 
                        type="text" 
                        name="title" 
                        id="title" 
                        placeholder='e.g. Asus laptop core i5 12th gen...'
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
                    <label htmlFor="category_id">Category <span></span></label>
                    <select 
                        name="category_id" 
                        id="category_id" 
                        value={formik.values.category_id}
                        onChange={formik.handleChange}
                    >
                        <option value="" disabled hidden selected>Select Category</option>
                        {
                            responseCat &&
                            responseCat.map(item => (
                                <option key={item.id} value={item.id}>{item.title}</option>
                            ))
                        }
                    </select>
                    {
                        formik.errors.category_id && formik.touched.category_id &&
                        <span className="required">{formik.errors.category_id}</span>
                    }
                    {
                        error?.category_id &&
                        <span className="required">{error.category_id}</span>
                    }
                </p>
                <p>
                    <label htmlFor="brand_id">Brand <span></span></label>
                    <select 
                        name="brand_id" 
                        id="brand_id" 
                        value={formik.values.brand_id}
                        onChange={formik.handleChange}
                    >
                        <option value="" disabled hidden>Select Brand</option>
                        {
                            responseBrd &&
                            responseBrd.map(item => (
                                <option key={item.id} value={item.id}>{item.title}</option>
                            ))
                        }
                    </select>
                    {
                        formik.errors.brand_id && formik.touched.brand_id &&
                        <span className="required">{formik.errors.brand_id}</span>
                    }
                    {
                        error?.brand_id &&
                        <span className="required">{error.brand_id}</span>
                    }
                </p>
                <p>
                    <label htmlFor="side_menu_id">Side menu <span></span></label>
                    <select 
                        name="side_menu_id" 
                        id="side_menu_id" 
                        value={formik.values.side_menu_id}
                        onChange={formik.handleChange}
                    >
                        <option value="" disabled hidden>Select Side menu</option>
                        {
                            responseSM &&
                            responseSM.map(item => (
                                <option key={item.id} value={item.id}>{item.title}</option>
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
                <p>
                    <label htmlFor="model_name">Model name <span></span></label>
                    <input 
                        type="text" 
                        name="model_name" 
                        id="model_name" 
                        placeholder='e.g. Asus-X515EA...'
                        value={formik.values.model_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}  
                    />
                    {
                        formik.errors.model_name && formik.touched.model_name &&
                        <span className="required">{formik.errors.model_name}</span>
                    }
                    {
                        error?.model_name &&
                        <span className="required">{error.model_name}</span>
                    }
                </p>
                <p>
                    <label htmlFor="uploaded_images">
                        Images <span></span>
                    </label>
                    <input 
                        type="file" 
                        name="uploaded_images" 
                        id="uploaded_images" 
                        accept={allowedExts}
                        onChange={(event) => {
                            formik.setFieldValue('uploaded_images', [...event.currentTarget.files]);
                        }}
                        multiple
                    />
                    {
                        formik.errors["uploaded_images"] && formik.touched['uploaded_images'] &&
                        <span className="required">{formik.errors.uploaded_images}</span>
                    }
                    {
                        error?.uploaded_images &&
                        <span className="required">{error.slug}</span>
                    }
                </p>
                <p>
                    <label htmlFor="price">Price</label>
                    <input 
                        type="text" 
                        name="price" 
                        id="price" 
                        placeholder='e.g. 16000'
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}  
                    />
                    {
                        formik.errors.price && formik.touched.price &&
                        <span className="required">{formik.errors.price}</span>
                    }
                    {
                        error?.price &&
                        <span className="required">{error.price}</span>
                    }
                </p>
                <p>
                    <label htmlFor="prev_price">Previous price</label>
                    <input 
                        type="text" 
                        name="prev_price" 
                        id="prev_price" 
                        placeholder='e.g. 16000'
                        value={formik.values.prev_price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}  
                    />
                    {
                        formik.errors.prev_price && formik.touched.prev_price &&
                        <span className="required">{formik.errors.prev_price}</span>
                    }
                    {
                        error?.prev_price &&
                        <span className="required">{error.prev_price}</span>
                    }
                </p>
                <p>
                    <label htmlFor="emi_price">EMI price</label>
                    <input 
                        type="text" 
                        name="emi_price" 
                        id="emi_price" 
                        placeholder='e.g. 16000'
                        value={formik.values.emi_price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}  
                    />
                    {
                        formik.errors.emi_price && formik.touched.emi_price &&
                        <span className="required">{formik.errors.emi_price}</span>
                    }
                    {
                        error?.emi_price &&
                        <span className="required">{error.emi_price}</span>
                    }
                </p>
            </div>

            <div>
                
                <p className='dash-checkbox'>
                    <input 
                        type="checkbox" 
                        name="is_stock" 
                        id="is_stock" 
                        value={formik.values.is_stock}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}

                    />
                    <label className='not-text' htmlFor="is_stock">Stock Available</label>
                    {
                        formik.errors.is_stock && formik.touched.is_stock &&
                        <span className="required">{formik.errors.is_stock}</span>
                    }
                    {
                        error?.is_stock &&
                        <span className="required">{error.is_stock}</span>
                    }
                </p>
                <p>
                    <label htmlFor="total_stock">Total stock</label>
                    <input 
                        type="text" 
                        name="total_stock" 
                        id="total_stock" 
                        placeholder='e.g. 100'
                        value={formik.values.total_stock}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}  
                    />
                    {
                        formik.errors.total_stock && formik.touched.total_stock &&
                        <span className="required">{formik.errors.total_stock}</span>
                    }
                    {
                        error?.total_stock &&
                        <span className="required">{error.total_stock}</span>
                    }
                </p>

                <p>
                    <label htmlFor="description">Description</label>
                    <textarea 
                        name="description" 
                        id="description" 
                        placeholder='e.g. 100'
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}  
                        cols={30}
                        rows={7}
                    />
                    {
                        formik.errors.description && formik.touched.description &&
                        <span className="required">{formik.errors.description}</span>
                    }
                    {
                        error?.description &&
                        <span className="required">{error.description}</span>
                    }
                </p>
                <p className='dash-checkbox'>
                    <input 
                        type="checkbox" 
                        name="featured" 
                        id="featured" 
                        value={formik.values.featured}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}

                    />
                    <label className='not-text' htmlFor="featured">Featured Product</label>
                    {
                        formik.errors.featured && formik.touched.featured &&
                        <span className="required">{formik.errors.featured}</span>
                    }
                    {
                        error?.featured &&
                        <span className="required">{error.featured}</span>
                    }
                </p>
                <p className='dash-checkbox'>
                    <input 
                        type="checkbox" 
                        name="offered" 
                        id="offered" 
                        value={formik.values.offered}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}

                    />
                    <label className='not-text' htmlFor="offered">Offered Product</label>
                    {
                        formik.errors.offered && formik.touched.offered &&
                        <span className="required">{formik.errors.offered}</span>
                    }
                    {
                        error?.offered &&
                        <span className="required">{error.offered}</span>
                    }
                </p>
                <p className='dash-checkbox'>
                    <input 
                        type="checkbox" 
                        name="display_big" 
                        id="display_big" 
                        value={formik.values.display_big}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}

                    />
                    <label className='not-text' htmlFor="display_big">Display as Main Offer Product</label>
                    {
                        formik.errors.display_big && formik.touched.display_big &&
                        <span className="required">{formik.errors.display_big}</span>
                    }
                    {
                        error?.display_big &&
                        <span className="required">{error.display_big}</span>
                    }
                </p>
                <p>
                    <label htmlFor="offered_time">Offered Product</label>
                    <input 
                        type="datetime-local" 
                        name="offered_time" 
                        id="offered_time"
                        value={formik.values.offered_time}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} 
                    />

                    {
                        formik.errors.offered_time && formik.touched.offered_time &&
                        <span className="required">{formik.errors.offered_time}</span>
                    }
                    {
                        error?.offered_time &&
                        <span className="required">{error.offered_time}</span>
                    }
                </p>
            </div>
        </div>

        <Button
            type={'submit'}
            className={'secondary-btn'}
            loading={loading}
        >
            Add Product
        </Button>

        <SuccessStatus success={success} />
        
        <ErrorStatus error={error} />
        
    </form>
  )
}

export default ProductAddForm