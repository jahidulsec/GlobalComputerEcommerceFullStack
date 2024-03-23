import ProductPageHeader from "@/components/product page/ProductPageHeader"
import ProductSection from "@/components/product page/ProductSection"
import RelatedProduct from "@/components/product page/RelatedProduct"
import getGeneralGET from "@/hook/getGeneralGET"
import Head from "next/head"


export const generateMetadata = async({params}) => {
  const product = await getGeneralGET({name: 'product', id: params.slug})

  return {
    title: `${product.title} | Global Computer (BD)` || `Global Computer (BD)`,
    description: `Buy ${product && product.title} at the best price in Bangladesh. Latest ${product && product.brand} ${product && product.model_name} ${product && product.category.title} available at Global Computer (BD). Order online to get delivery in BD.`,
    keywords: [product.title.split(' '), product.title],
    openGraph: {
      title: `${product.title} | Global Computer (BD)`,
      description: `Buy ${product && product.title} at the best price in Bangladesh. Latest ${product && product.brand} ${product && product.model_name} ${product && product.category.title} available at Global Computer (BD). Order online to get delivery in BD.`,
      url: `${process.env.NEXT_PUBLIC_APP_URL}/product/${product && product.slug}`,
      siteName: 'Global Computer (BD)',
      images: [
        {
          url: `${product.images[0].image}`, // Must be an absolute URL
          width: 1800,
          height: 1600,
          alt: `${product.title}`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_URL}/product/${product && product.slug}`,
    },
  }
} 



const page = async({params}) => {

  const product = await getGeneralGET({name: 'product', id: params.slug})


  return (
    <section id='page' className='product-page single-page'>
      <div className='container'>
        <div className="wrapper">
          <ProductPageHeader 
            productCat={product.category} 
            productTitle={product.title}
          />
          <ProductSection 
            product={product} 
          />
          <RelatedProduct 
            productCat={product.category}
          />
        </div>
      </div>
    </section>
  )
}

export default page