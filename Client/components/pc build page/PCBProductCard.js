"use client";

import { useBuildContext } from "@/context/BuildContext";
import { currencyFormat } from "@/utilities/currencyFormat";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";



const PCBProductCard = ({
    product,
    cat
}) => {

    const {parts, onParts} = useBuildContext()

    const router = useRouter()



  return (
    <article className="pcb-product">   
        <div className="media">
            <Link href={`/product/${product.slug}`}>
                <Image 
                    src={product.images[0] && product.images[0].image} 
                    alt={product.title}
                    width={294}
                    height={220} 
                    loading='lazy'
                />
            </Link>
        </div>
        
        <div className="pcb-content">
            <div className="content">
                <Link href={`/product/${product.slug}`}><h3>{product.title}</h3></Link>

                {/* feature for mobile view */}
                <div className="medium-text">
                    <ul>
                        {
                            product.key_features &&
                            product.key_features.map(feature => (
                                <li className='flexitem gap-1 feature-list' key={feature.field_name}>
                                    <span>
                                        {feature.field_name}
                                    </span>
                                    <span>
                                        {feature.field_description}
                                    </span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>

            <div className="price">
                <span className={`current`}>{currencyFormat(product.price)}</span>
                <button 
                    type='button' 
                    className="pc-build-btn"
                    onClick={
                       () => {
                            onParts({
                                ...parts,
                                [cat]: {
                                    title: product.title,
                                    price: product.price,
                                    unitPrice: product.price,
                                    image: product.images[0].image,
                                }
                            })
                            router.push('/tool/pc-build')
                       }
                    }
                >
                    Add
                </button>
            </div>
        </div>
    </article>
  )
}

export default PCBProductCard