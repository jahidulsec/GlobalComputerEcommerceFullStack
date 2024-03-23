"use client";

const StockStatus = ({stock}) => {

  return (
    <span className={ stock ? "available" : "inavailable"}>{stock ? `In Stock` : `Out of Stock`}</span>
  )
}

export default StockStatus