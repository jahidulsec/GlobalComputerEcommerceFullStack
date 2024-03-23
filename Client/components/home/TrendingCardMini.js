"use client";


import Hoverable from '@/utilities/Hoverable';
import Stars from '@/utilities/Stars';
import { currencyFormat } from '@/utilities/currencyFormat';
import Image from 'next/image';
import Link from 'next/link';


const TrendingCardMini = ({
    product,
}) => {



  return (
    <div className="item">
        <div className="media">
            <div className="thumbnail object-cover">
                <Link href={`/product/${product.slug}`}>
                    <Image
                        src={product.images[0].image} 
                        alt={product.title} 
                        width={130}
                        height={160}
                        sizes='max-height: 160px, 100vw'
                        loading='eager'
                    />
                </Link>
            </div>


            {/* hoverable buttons */}
            <Hoverable
                product={product}
            />


            {
                product.discount &&
                    <div className="discount circle flexcenter"><span>{product.discount}%</span></div>
            }
        </div>
        <div className="content">
            
            <h3 className='main-link'>
                <Link href={`/product/${product.slug}`}>{product.title}</Link>
            </h3>
            <div className="rating">
                <Stars NumStar={product?.average_stars} />
                <span className="mini-text">({product?.count_review})</span>
            </div>
            <div className="price">
                <span className="current">{currencyFormat(product.price)}</span>
                <span className="normal mini-text">{currencyFormat(product.prev_price)}</span>
            </div>
        
            <div className="mini-text">
                <p>{product?.sold_stock} Sold</p>
            </div>
            
        </div>
    </div>
  )
}

export default TrendingCardMini