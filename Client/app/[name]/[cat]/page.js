import CatPage from "@/components/category page/CatPage"
import { CatPageProduct } from "@/components/category page/CatPageProduct"
import NoPage from "@/utilities/NoPage"
import { toTitleCase } from "@/utilities/toTitleCase"


export const generateMetadata = async({params}) => {
  const defaultDesc = 'Global Computer BD is one of the reliable computer, laptop, desktop & component retail shop in Bangladesh'

  return {
    title: `${toTitleCase(params.brand || params.cat || params.name)} | Global Computer (BD)` || `Global Computer (BD)`,
    description: (params.name != 'featured' && params.name != 'trending' && params.name != 'search') ? `Buy ${params.brand || params.cat || params.name} at the best price in Bangladesh. Latest ${params.brand || params.cat || params.name} available at Global Computer (BD). Order online to get delivery in BD.` : defaultDesc,
    keywords: [params?.cat, params?.brand, 'global computer bd'],
    openGraph: {
      title: `${toTitleCase(params.brand || params.cat || params.name)} | Global Computer (BD)`,
      description: (params.name != 'featured' && params.name != 'trending' && params.name != 'search') ? `Buy ${params.brand || params.cat || params.name} at the best price in Bangladesh. Latest ${params.brand || params.cat || params.name} available at Global Computer (BD). Order online to get delivery in BD.` : defaultDesc,
      url: `${process.env.NEXT_PUBLIC_APP_URL}/${params.name}`,
      siteName: 'Global Computer (BD)',
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
      canonical: `${process.env.NEXT_PUBLIC_APP_URL}/${params.name}/${params.cat}`,
    }
  }
} 


const page = async({params, searchParams}) => {
  return (
    <>
      {(params.name === 'featured' || params.name === 'trending' || params.name === 'menu' || params.name === 'category' || params.name === 'search' )?
        <CatPage params={params} >
          <CatPageProduct params={params} searchParams={searchParams} />
        </CatPage> :
        <NoPage />
      }
    </>
  )
}

export default page