"use client";

const StockBar = ({productSold, totalStock}) => {

    const availablePercent = (productSold / totalStock) * 100

  return (
    <div className="bar">
        <div 
            className="available"
            style={{width: `${availablePercent}%`}}
        ></div>
    </div>
  )
}

export default StockBar