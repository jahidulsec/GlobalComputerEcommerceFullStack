import Link from 'next/link'
import ConstructionSection from '@/utilities/ConstructionSection'


export const generateMetadata = async() => {

  return {
    title: `About Us | Global Computer (BD)` || `Global Computer (BD)`,
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
      canonical: `${process.env.NEXT_PUBLIC_APP_URL}/about`,
    }
  }
} 

const AboutPage = async() => {
  return (
    <section className='about-page'>
        <div className="container">
            <div className="wrapper">
                <div className="breadcrump">
                  <ul className="flexitem">
                      <li><Link href="/">Home</Link></li>
                      <li>About</li>
                  </ul>
                </div>
                <ConstructionSection />
            </div>
        </div>
    </section>
  )
}

export default AboutPage