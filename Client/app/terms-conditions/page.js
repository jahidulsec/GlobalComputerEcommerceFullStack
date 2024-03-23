

export const generateMetadata = async({params}) => {

  return {
    title: `Terms and Conditions | Global Computer (BD)` || `Global Computer (BD)`,
    robots: {
      index: true,
      follow: true,
      nocache: true,
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

const page = async() => {
  return (
    <div>Terms and Conditions</div>
  )
}

export default page