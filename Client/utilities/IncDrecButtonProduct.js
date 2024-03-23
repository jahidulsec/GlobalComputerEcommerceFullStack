"use client";

const IncDrecButtonProduct = ({count, setCount}) => {

    const adjustCount = (add) => {
        setCount((prevCount) => {
            if (prevCount  > 0) {
                return prevCount + add
            }
            else if (prevCount == 0) {
                return prevCount + 1
            }
        })
    }

  return (
    <>
        <button 
            className="minus circle" 
            onClick={() => {adjustCount(-1)}}
            disabled={count===1}
        >
            -
        </button>
        <input type="text" value={count} min={1}/>
        <button className='plus circle' onClick={() => {adjustCount(1)}}>+</button>
    </>
  )
}

export default IncDrecButtonProduct