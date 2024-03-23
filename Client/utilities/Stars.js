'use client';

const Stars = ({NumStar}) => {

    const num = Math.ceil(NumStar)
    
  return (
    <div className="stars" itemProp="ratingValue" content={NumStar || 0}>
        { num > 0 ?
          Array.from({length: num}, (_, index) => index + 1).map(star => (
            <i key={star} className="ri-star-fill"></i>
          )) : 
          <i className="ri-star-line"></i>
        }
    </div>
  )
}

export default Stars