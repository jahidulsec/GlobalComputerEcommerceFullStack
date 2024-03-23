import Image from 'next/image'
import React from 'react'

const NoItem = () => {
  return (
    <div className="no-item flexcenter flexcol">
        <Image src="/no_item.svg" alt="No item to show" width={350} height={350} />
        <p className='mini-text'>No item to show!</p>
    </div>
  )
}

export default NoItem