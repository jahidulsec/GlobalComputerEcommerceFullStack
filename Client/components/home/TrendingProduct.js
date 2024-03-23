
import Link from 'next/link'
import BigTrendingCard from './BigTrendingCard';
import TrendingCardMini from './TrendingCardMini';
import getGeneralGET from '@/hook/getGeneralGET';


const TrendingProduct = async() => {

    const productBig = await getGeneralGET({name:`display-product`, display_big: `true`})
    const offeredProduct = await getGeneralGET({name: `display-product`,page: 1,size: 6, offered: 1, status: `1`})

  return (
    <section className="trending">
        <div className="container">
            <div className="wrapper">
                <div className="sectop flexitem">
                    <h2>
                        Trending Products
                    </h2>
                    <div className="main-link view-all">
                        <Link href={`/trending`} className='flexitem'>
                            <span>View all</span>
                            <span className="ri-arrow-right-line"></span>
                        </Link>
                    </div>
                </div>

                <div className="column">
                    <div className="flexwrap">
                        <BigTrendingCard 
                            product={productBig[0]}
                        />
                    
                        {/* mini card */}
                        <div className="row products mini">
                            <div className='products-mini-content'>

                                {    
                                    offeredProduct.results.map(product => (
                                        <TrendingCardMini
                                            key={product.id} 
                                            product={product}
                                        />
                                    ))
                                }
                            </div>

                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}

export default TrendingProduct