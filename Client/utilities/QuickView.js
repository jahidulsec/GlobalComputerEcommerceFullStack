"use client";

import ModalProduct from "@/components/product page/ModalProduct"
import { useQuickViewContext } from "@/context/QuickViewContext"




const QuickView = () => {

  const {product} = useQuickViewContext()

  const handleCloseModal = () => {
    const modal = document.querySelector(`.modal__quick_view`)
    modal.close()
}
  

  return (
    <>    
      <dialog className='modal__quick_view'>    
        <div className="modal__header">
          <button className="btn-close" onClick={handleCloseModal}>
            <span className="ri-close-line"></span>
          </button>
        </div>    
        <section id='page' className='single-page'>
          <div className="container">
            <div className="wrapper">
            {
              product.length !== 0 &&
              <ModalProduct productSlug={product} />
            }
            </div>
          </div>
        </section>
          
      </dialog>
    </>
  )
}

export default QuickView