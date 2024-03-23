'use client';


import { AiOutlineMenu } from 'react-icons/ai'

const Topbar = ({toggle, setToggle}) => {
  return (
    <div className="topbar flexcenter">
        <div 
            className="toggle" 
            onClick={() => {
                setToggle(!toggle)
            }}
        >
            <AiOutlineMenu />
        </div>
    </div>
  )
}

export default Topbar