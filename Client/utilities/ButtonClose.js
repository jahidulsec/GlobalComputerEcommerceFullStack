import { useEffect, useRef, useState } from "react"

const ButtonClose = ({onClick}) => {
  
  const [showConfirm, SetShowConfirm] = useState(false)
  const confirmBtnRef = useRef()

  useEffect(() => {
    const confirmBtn = confirmBtnRef.current

    const handleConfirmBtnClose = (e) => {
      if(confirmBtn && !confirmBtn.contains(e.target)) {
        SetShowConfirm(false)
      }
    }

    document.addEventListener('click', handleConfirmBtnClose)

      return () => {
        document.removeEventListener('click', handleConfirmBtnClose)
      }


  },[showConfirm])

  return (
    <>
      {
        !showConfirm ?
          <button 
              type='button' 
              className='btn-close' 
              title="Delete"
              onClick={() => {SetShowConfirm(true)}}
              >
              <span className="ri-close-line"></span>
          </button> 
            :
          <button
            type="button"
            className="confirm-btn"
            title="Confirm"
            onClick={onClick}
            ref={confirmBtnRef}
          >
            <span className="ri-check-line"></span>
          </button>
      }
    </>
  )
}

export default ButtonClose