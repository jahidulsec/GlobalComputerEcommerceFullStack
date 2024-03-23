"use client";


const Button = ({children, className, type, disable, loading, onClick}) => {
  return (
    <>
      <button
        className={className}
        type={type}
        disabled={disable}
        onClick={onClick}
        >
          {
            loading ? <span className='loading'>Loading</span> :
            children
          }
      </button>
    </>
  )
}

export default Button