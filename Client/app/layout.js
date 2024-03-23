import { AuthProvider } from '@/context/AuthContext'
import './globals.css'
import 'remixicon/fonts/remixicon.css'
import { CartProvider } from '@/context/CartContext'
import { QuickViewProvider } from '@/context/QuickViewContext'
import SideMenuProvider from '@/context/SideMenuContext'
import SearchProvider from '@/context/SearchContext'
import ShowCartProvider from '@/context/ShowCartContext'
import ShowDptProvider from '@/context/ShowDptContext'
import SideNav from '@/components/home/SideNav'
import HeaderNavMobile from '@/components/home/HeaderNavMain'
import HeaderMain from '@/components/home/HeaderMain'
import Footer from '@/components/home/Footer'
import FooterSSR from '@/components/home/FooterSSR'
import ShippingAddressContextProvider from '@/context/ShippingAddressContext'
import QuickView from '@/utilities/QuickView'
import HeaderNavProductSSR from '@/components/home/HeaderNavProductSSR'
import { BuildContextProvider } from '@/context/BuildContext'




export const metadata = {
  metadataBase: new URL('https://globalcomputer.com.bd'),
  title: 'Global Computer (BD) | Reliable Computer Laptop, Desktop & Component Retail Shop in Bangladesh',
  description: 'Global Computer BD is one of the reliable computer, laptop, desktop & component retail shop in Bangladesh',
  keywords: ['global computer bd', 'global computer', 'global', 'computer', 'laptop in bd', 'pc component in bd'],
  icons: {
    icon: ['/global_mini.svg']
  },
  verification: {
    google: 'EqpFyAFE7oyhF3VFqdsm3Mg7gjxTnnN6sPprWpyUUl0'
  },
  openGraph: {
    title: 'Global Computer (BD) | Reliable Computer Laptop, Desktop & Component Retail Shop in Bangladesh',
    description: 'Global Computer BD is one of the reliable computer, laptop, desktop & component retail shop in Bangladesh',
    url: 'https://globalcomputer.com.bd',
    siteName: 'Global Computer (BD)',
    images: [
      {
        url: '/global_big.svg', // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: 'Global Computer BD',
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
    canonical: 'https://globalcomputer.com.bd',
  },
  
}


export default function RootLayout({ children }) {


  return (
    <html lang="en">
      <body >
        <AuthProvider>
          <CartProvider>
            <QuickViewProvider>
              <SideMenuProvider>
                <ShowCartProvider>
                  <SearchProvider>
                    <ShowDptProvider>
                      <ShippingAddressContextProvider>
                        <BuildContextProvider>

                          <SideNav />
                          <HeaderNavMobile>
                            <HeaderNavProductSSR />
                          </HeaderNavMobile>
                          

                          {/* sticky header */}

                          <HeaderMain />
                          
                          <main>
                            {children}
                            <QuickView />
                          </main>

                          
                          <Footer>
                            <FooterSSR />
                          </Footer>

                        </BuildContextProvider>
                      
                      </ShippingAddressContextProvider>
                    </ShowDptProvider>
                  </SearchProvider>
                </ShowCartProvider>
              </SideMenuProvider>
            </QuickViewProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
