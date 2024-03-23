import ConstructionSection from "@/utilities/ConstructionSection"
import Link from "next/link"


export const generateMetadata = async() => {

  return {
    title: `Career | Global Computer (BD)` || `Global Computer (BD)`,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `${typeof(window) !== 'undefined' ? window.location.href : ''}`,
    }
  }
} 


const CareerPage = () => {
  return (
    <section className='career-page'>
        <div className="container">
            <div className="wrapper">
                <div className="breadcrump">
                  <ul className="flexitem">
                      <li><Link href="/">Home</Link></li>
                      <li>Career</li>
                  </ul>
                </div>
                <ConstructionSection />
            </div>
        </div>
    </section>
  )
}

export default CareerPage