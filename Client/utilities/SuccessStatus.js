"use client";



const SuccessStatus = ({success}) => {
  return (
    <div className={`success-msg ${success && 'success'}`}>
        Successfully added!
    </div>
  )
}

export default SuccessStatus