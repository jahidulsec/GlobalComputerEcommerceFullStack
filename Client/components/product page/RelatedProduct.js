import Link from 'next/link'
import FeaturedCard from '../home/FeaturedCard';
import getGeneralGET from '@/hook/getGeneralGET';


const RelatedProduct = async({ productCat }) => {

    const productRelated = await getGeneralGET({name:`product`, category_slug: productCat.slug})


  return (
    <section className="related">
        <div className="container">
            <div className="wrapper">
                <div className="column">
                    <div className="sectop flexitem">
                        <h2>Related Products</h2>
                        <div className="main-link view-all">
                            <Link href={`/category/${productCat.slug}`} className="flexitem">
                                <span>View all</span>
                                <span className="ri-arrow-right-line"></span>
                            </Link>
                        </div>
                    </div>

                    {/* main product card */}
                    
                    <div className="products main">
                        {
                            productRelated.slice(0,4).map(product => (
                                <FeaturedCard
                                    key={product.id}
                                    id={product.id}
                                    product={product}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}

export default RelatedProduct