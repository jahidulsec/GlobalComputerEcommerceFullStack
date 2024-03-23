
import { toTitleCase } from '@/utilities/toTitleCase'
import Link from 'next/link'


const ProductPageHeader = ({productTitle, productCat}) => {

  return (
    <div className="breadcrump">
        <ul className="flexwrap">
            <li><Link href="/">Home</Link></li>
            <li><Link href={`/category/${productCat.slug}`}>{toTitleCase(productCat.slug)}</Link></li>
            <li>{productTitle}</li>
        </ul>
    </div>
  )
}

export default ProductPageHeader