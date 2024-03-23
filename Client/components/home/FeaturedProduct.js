
import Link from 'next/link';
import FeaturedCard from './FeaturedCard';
import getGeneralGET from '@/hook/getGeneralGET';



const FeaturedProduct = async() => {

    const featuredRes = await getGeneralGET({name: `display-product`, page: 1, size: 16, status: `true`, featured: 1})

  return (
    <section className="featured">
        <div className="container">
            <div className="wrapper">
                <div>
                    <div className="sectop flexitem">
                        <h2>
                            Featured Products
                        </h2>
                        <div className="main-link view-all">
                            <Link href={`/featured`} className='flexitem'>
                                <span>View all</span>
                                <span className="ri-arrow-right-line"></span>
                            </Link>
                        </div>
                    </div>

                    {/* main product card */}
                    <div className="products main">
                        {
                            featuredRes.results.map(product => (
                                <FeaturedCard 
                                    key={product.id}
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

export default FeaturedProduct