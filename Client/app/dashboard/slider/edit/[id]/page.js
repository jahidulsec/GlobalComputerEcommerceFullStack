"use client";


import { useAuthContext } from '@/context/AuthContext';
import { useFormPATCH } from '@/hook/useFormPATCH';
import { useGeneralGET } from '@/hook/useGeneralGET';
import Button from '@/utilities/Button';
import { useFormik } from 'formik'
import { useParams, usePathname } from 'next/navigation';
import { useEffect } from 'react'
import * as Yup from 'yup'




const SliderEditDash = () => {

    const {auth} = useAuthContext()

    const pathname = usePathname()
    const {id} = useParams()

    const [response, handleSliderGET] = useGeneralGET()
    const [loading, error, success, handleSlider] = useFormPATCH()


    useEffect(() => {

        handleSliderGET(`slider`, id)

    }, [pathname])

    

    // image validator
    const validFileExtensions = { image: ['jpg', 'png', 'jpeg', 'svg', 'webp'] };

    function getAllowedExt() {
        return validFileExtensions["image"].map((e) => `.${e}`).toString()
    } 


    const MAX_FILE_SIZE = 5 * 10 * 102400; //500KB


    function isValidFileType(fileName, fileType) {
        return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
    }

    let allowedExts = getAllowedExt();


    useEffect(() => {
        if (success || error) {
            window.scrollTo(0, document.body.scrollHeight)
        }
    }, [success, error])


    // add form formik
    const formik = useFormik({
        initialValues: {
            slider_url: response?.slider_url,
            mini_text: response?.mini_text,
            mid_text: response?.mid_text,
            color: response?.color,
            image: '',
        },
        enableReinitialize: true,
        onSubmit: async(values) => {
            var formdata = new FormData();
            for (let [key, data] of Object.entries(values)) {
                formdata.append(key, data)
            }

            console.log(formdata)

            handleSlider(`slider`, id, formdata, auth)
            
            if (success) {   
                formik.resetForm()
            }
            
        },
        validationSchema: Yup.object({
            slider_url: Yup.string().required("enter slider url!"),
            mini_text: Yup.string(),
            mid_text: Yup.string(),
            color: Yup.string(),
            image: Yup
                .mixed()
                .required("Required")
                .test("is-valid-type", "Not a valid image type",
                    value => isValidFileType(value && value.name.toLowerCase(), "image"))
                .test("is-valid-size", "Max allowed size is 500KB",
                    value => value && value.size <= MAX_FILE_SIZE)
            })
    })




  return (
    <form className="add-form styled" onSubmit={formik.handleSubmit}>
        <h2>Add Slider</h2>
        <p>
            <label htmlFor="slider_url">Slider URL</label>
            <input 
                type="text" 
                name="slider_url" 
                id="slider_url" 
                placeholder='e.g. /category/processor'
                value={formik.values.slider_url}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {
                formik.errors.slider_url && formik.touched.slider_url &&
                <span className="required">{formik.errors.slider_url}</span>
            }
            {
                error?.slider_url &&
                <span className="required">{error.slider_url}</span>
            }
        </p>
        <p>
            <label htmlFor="mini_text">Slider Mini Text</label>
            <input 
                type="text" 
                name="mini_text" 
                id="mini_text" 
                placeholder='e.g. Gaming Laptop'
                value={formik.values.mini_text}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {
                formik.errors.mini_text && formik.touched.mini_text &&
                <span className="required">{formik.errors.mini_text}</span>
            }
            {
                error?.mini_text &&
                <span className="required">{error.mini_text}</span>
            }
        </p>
        <p>
            <label htmlFor="mini_text">Slider Middle Text</label>
            <input 
                type="text" 
                name="mid_text" 
                id="mid_text" 
                placeholder='e.g. Asus ROG Laptop'
                value={formik.values.mid_text}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {
                formik.errors.mid_text && formik.touched.mid_text &&
                <span className="required">{formik.errors.mid_text}</span>
            }
            {
                error?.mid_text &&
                <span className="required">{error.mid_text}</span>
            }
        </p>

        <p>
            <label htmlFor="color">Color</label>
            <select 
                name="color" 
                id="color" 
                value={formik.values.color}
                onChange={formik.handleChange}
            >
                <option value="" disabled hidden selected>Select product</option>
                <option value="0">Dark</option>
                <option value="1">Light</option>
            </select>
            {
                formik.errors.color && formik.touched.color &&
                <span className="required">{formik.errors.color}</span>
            }
            {
                error?.color &&
                <span className="required">{error.color}</span>
            }
        </p>
        
        <p>
            <label htmlFor="image">
                Slider Image <span></span>
            </label>
            <input 
                type="file" 
                name="image" 
                id="image" 
                accept={allowedExts}
                onChange={(event) => {
                    formik.setFieldValue('image', event.currentTarget.files[0]);
                }}
            />
            {
                formik.errors["image"] && formik.touched['image'] &&
                <span className="required">{formik.errors.image}</span>
            }
        </p>

        <Button
            type={'submit'}
            className={'secondary-btn'}
            loading={loading}
        >
            Update Slider
        </Button>

        <div className={`required-msg ${error?.detail && 'failed'}`}>
            {error?.detail}
        </div>

        <div className={`success-msg ${success && 'success'}`}>
            Successfully added!
        </div>
    </form>
  )
}

export default SliderEditDash