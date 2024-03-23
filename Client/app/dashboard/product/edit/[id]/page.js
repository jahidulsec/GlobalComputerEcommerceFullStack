"use client";


import { useAuthContext } from '@/context/AuthContext';
import { useFormPOST } from '@/hook/useFormPOST';
import { useGeneralDEL } from '@/hook/useGeneralDEL';
import { useGeneralGET } from '@/hook/useGeneralGET';
import { useGeneralPATCH } from '@/hook/useGeneralPATCH';
import Button from '@/utilities/Button';
import ButtonClose from '@/utilities/ButtonClose';
import DelStatus from '@/utilities/DelStatus';
import ErrorStatus from '@/utilities/ErrorStatus';
import SuccessStatus from '@/utilities/SuccessStatus';
import { ToDateFormat } from '@/utilities/ToDateFormat';
import { useFormik } from 'formik'
import { useParams } from 'next/navigation';
import { useEffect } from 'react'
import * as Yup from 'yup'




const ProductEditDash = () => {

    // custom hook
    const [responseBrd, handleBrand] = useGeneralGET()
    const [responseCat, handleCategory] = useGeneralGET()
    const [responseSM, handleSideMenu] = useGeneralGET()
    const [response, handleSingleProduct] = useGeneralGET()
    const [loading, error, success, handleProductPATCH] = useGeneralPATCH()
    const [loadingImage, errorImage, successImage, handleProductImagePATCH] = useFormPOST()
    const [delStatus, handleDelImage] = useGeneralDEL()


    const {auth} = useAuthContext()

    const { id } = useParams()





    useEffect(() => {
        
        handleSingleProduct({name: `product`, id: id})
        handleCategory({name: `category`,order: `title`})
        handleBrand({name: `brand`, order: `title`})
        handleSideMenu({name: `side-menu`, order: `title`})

    }, [success, successImage, delStatus])


    useEffect(() => {
        if (success || error ) {
            window.scrollTo(0, document.body.scrollHeight)
        }

        
        if (successImage) {
            formikImage.resetForm()
        }

    }, [success, error, successImage, errorImage])


    // image validator
    const validFileExtensions = { uploaded_images: ['jpg', 'png', 'jpeg', 'svg', 'webp', 'avif'] };

    function getAllowedExt() {
        return validFileExtensions["uploaded_images"].map((e) => `.${e}`).toString()
    } 

    const MAX_FILE_SIZE = 5 * 10 * 102400; //10 * 5 * 100KB


    function isValidFileType(fileName, fileType) {
        return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
    }

    let allowedExts = getAllowedExt();


    // calculate discount
    const calDiscount = (price, prev_price) => {
        if (prev_price == 0 || price == 0 || prev_price <= price) {
            return 0
        } else {
            let difference = prev_price - price
            let discount = ((difference) / prev_price * 100).toFixed(0)
            return discount
        }
    }
    

    // add form formik
    const formik = useFormik({
        initialValues: {
            title: response?.title,
            category_id: response?.category_id,
            brand_id: response?.brand_id,
            side_menu_id: response?.side_menu_id,
            model_name: response?.model_name,
            price: response?.price,
            prev_price: response?.prev_price,
            emi_price: response?.emi_price,
            discount: response?.discount,
            is_stock: response?.is_stock,
            sold_stock: response?.sold_stock,
            total_stock: response?.total_stock,
            description: response?.description,
            featured: response?.featured,
            offered: response?.offered,
            offered_time: response?.offered_time,
            display_big: response?.display_big,
        },
        enableReinitialize: true,
        onSubmit: async(values) => {
            let discount = calDiscount(values?.price, values?.prev_price)
            values.discount = discount
           handleProductPATCH(`product`, id, values, auth)
        },
        validationSchema: Yup.object({
            title: Yup.string(),
            category_id: Yup.string(),
            brand_id: Yup.string(),
            side_menu_id: Yup.string(),
            model_name: Yup.string(),
            price: Yup.number(),
            prev_price: Yup.number(),
            emi_price: Yup.number(),
            discount: Yup.number(),
            is_stock: Yup.boolean(),
            sold_stock: Yup.number(),
            total_stock: Yup.number(),
            description: Yup.string(),
            featured: Yup.boolean(),
            display_big: Yup.boolean(),
            offered: Yup.boolean(),
            offered_time: Yup.date().nullable(),
            })
        }
    )

    const formikImage = useFormik({
        initialValues: {
            uploaded_images: '',
        },
        onSubmit: (values) => {
            var formdata = new FormData();

            formdata.append('product_id', response.id)

            for (let item of values.uploaded_images) {
                formdata.append("uploaded_images", item)
            }

            handleProductImagePATCH(`product-image`, formdata, auth)

        },
        validationSchema: Yup.object({
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

    response &&
    <>
    <form className="add-form styled" onSubmit={formikImage.handleSubmit}>
        <h2>Product Images</h2>
        <div className="product-form flexwrap uploaded-image-form">
            <div>
                <p>
                    <label htmlFor="uploaded_images">
                        Insert new images
                    </label>
                    <input 
                        type="file" 
                        name="uploaded_images" 
                        id="uploaded_images" 
                        accept={allowedExts}
                        onChange={(event) => {
                            formikImage.setFieldValue('uploaded_images', [...event.currentTarget.files]);
                        }}
                        multiple
                    />
                    {
                        formikImage.errors["uploaded_images"] && formikImage.touched['uploaded_images'] &&
                        <span className="required">{formikImage.errors.uploaded_images}</span>
                    }
                    {
                        error?.uploaded_images &&
                        <span className="required">{errorImage.slug}</span>
                    }
                </p>
                <Button
                    className={`secondary-btn flexitem gap-1`}
                    loading={loadingImage}
                    type={`submit`}
                >
                    <span className="ri-upload-2-line"></span>
                    <span>Upload</span>
                </Button>

                <SuccessStatus success={successImage} />

                <ErrorStatus error={errorImage} />
            </div>
            <div>
                <h5>Uploaded Images</h5>

                <DelStatus delStatus={delStatus} />

                <div className='uploaded_image '>
                    {
                        response &&
                        response.images &&
                        response.images.map(item => (
                            <div key={item.id}>
                                <img 
                                    className='thumbnail' 
                                    src={item.image} 
                                    alt={item.id} 
                                    loading='lazy'
                                />
                                <ButtonClose onClick={() => {handleDelImage(`product-image`, item.id, auth)}} />
                            </div>
                        ))
                    }
                </div>
            </div>
           
        </div>
    </form>



    <form className="add-form styled " onSubmit={formik.handleSubmit}>
    <h2>Product Info</h2>
    <div className="product-form flexwrap">
        <div>
            <p>
                <label htmlFor="title">Product name</label>
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
                    error?.title &&
                    <span className="required">{error.title}</span>
                }
            </p>
            <p>
                <label htmlFor="category_id">Category</label>
                <select 
                    name="category_id" 
                    id="category_id" 
                    value={formik.values.category_id}
                    onChange={formik.handleChange}
                >
                    <option value="" disabled hidden>Select Category</option>
                    {
                        responseCat &&
                        responseCat.map(item => (
                            <option key={item.id} value={item.id}>{item.title}</option>
                        ))
                    }
                </select>
                {
                    error?.category_id &&
                    <span className="required">{error.category_id}</span>
                }
            </p>
            <p>
                <label htmlFor="brand_id">Brand</label>
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
                    error?.brand_id &&
                    <span className="required">{error.brand_id}</span>
                }
            </p>
            <p>
                <label htmlFor="side_menu_id">Side menu</label>
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
                    error?.side_menu_id &&
                    <span className="required">{error.side_menu_id}</span>
                }
            </p>
            <p>
                <label htmlFor="model_name">Model name</label>
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
                    error?.model_name &&
                    <span className="required">{error.model_name}</span>
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
                    checked={formik.values.is_stock}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}

                />
                <label className='not-text' htmlFor="is_stock">Stock Available</label>
                {
                    error?.is_stock &&
                    <span className="required">{error.is_stock}</span>
                }
            </p>
            <p>
                <label htmlFor="total_stock">Total Offered Stock</label>
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
                    error?.total_stock &&
                    <span className="required">{error.total_stock}</span>
                }
            </p>
            <p>
                <label htmlFor="total_stock">Sold Offered Stock</label>
                <input 
                    type="text" 
                    name="sold_stock" 
                    id="sold_stock" 
                    placeholder='e.g. 100'
                    value={formik.values.sold_stock}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}  
                />
                {
                    error?.sold_stock &&
                    <span className="required">{error.sold_stock}</span>
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
                    error?.description &&
                    <span className="required">{error.description}</span>
                }
            </p>
            <p className='dash-checkbox'>
                <input 
                    type="checkbox" 
                    name="featured" 
                    id="featured" 
                    checked={formik.values.featured}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}

                />
                <label className='not-text' htmlFor="featured">Featured Product</label>
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
                    checked={formik.values.offered}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}

                />
                <label className='not-text' htmlFor="offered">Offered Product</label>
                
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
                    checked={formik.values.display_big}
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
                <label htmlFor="offered_time">
                    Offered Product
                </label>
                <input 
                    type="datetime-local" 
                    name="offered_time" 
                    id="offered_time"
                    value={formik.values.offered_time}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} 
                    
                />
                <div className='medium-text flexcenter gap-1'>
                    <span>Current offered date:</span> 
                    <span className='secondary-clr'>{ToDateFormat(response?.offered_time)}</span>
                </div>

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
        Update Product
    </Button>

    <SuccessStatus success={success} />
        
    <ErrorStatus error={error} />

</form>
</>

)
}

export default ProductEditDash