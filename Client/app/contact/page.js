import Image from "next/image"
import Link from "next/link"



export const generateMetadata = async() => {

  return {
    title: `Contact | Global Computer (BD)` || `Global Computer (BD)`,
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
      canonical: `${process.env.NEXT_PUBLIC_APP_URL}/contact`,
    }
  }
} 


const ContactUs = async() => {
  return (
    <>
      <section className='contact-page single-contact'>
          <div className="container">
              <div className="wrapper">
                <div className="breadcrump">
                  <ul className="flexitem">
                      <li><Link href="/">Home</Link></li>
                      <li>Contact Us</li>
                  </ul>
                </div>
                <section className='contact-box'>
                  <h3>Sales Outlets</h3>
                  <div className="flexwrap">
                    <article className="contact__card">
                      <Image src="/contact_icon/hp.png" alt="hp_logo" width={80} height={80} />
                      <h2>HP Outlet</h2>
                      <p>
                        47, M.E.F Center(2nd Floor), Shahid Shahidullah Kaisar Road, Feni-3900
                        <br />
                        <span className='ri-phone-fill'></span> <strong>01919 757678, 01919 757679</strong>  
                      </p>
                    </article>
                    <article className="contact__card">
                      <Image src="/contact_icon/asus.png" alt="asus_logo" width={80} height={80} />
                      <h2>Asus Showroom</h2>
                      <p>
                        Shop #66; Shamabay Market-3, Shahid Shahidullah Kaisar Road, Feni-3900
                        <br />
                        <span className='ri-phone-fill'></span> <strong>01919 757692</strong>  
                      </p>
                    </article>
                    <article className="contact__card">
                      <Image src="/contact_icon/security-camera.png" alt="cctv_logo" width={80} height={80} />
                      <h2>CCTV Showroom</h2>
                      <p>
                        Shop #65; Shamabay Market-3, Shahid Shahidullah Kaisar Road, Feni-3900
                        <br />
                        <span className='ri-phone-fill'></span> <strong>01919 757694</strong>  
                      </p>
                    </article>
                    <article className="contact__card">
                      <Image src="/contact_icon/desktop-computer.png" alt="desktop_logo" width={80} height={80} />
                      <h2>Global Computer Unit 2</h2>
                      <p>
                        Shop #67; Shamabay Market-3, Shahid Shahidullah Kaisar Road, Feni-3900
                        <br />
                        <span className='ri-phone-fill'></span> <strong>01919 757680</strong>  
                      </p>
                    </article>
                    <article className="contact__card">
                      <Image src="/contact_icon/computer-repair.png" alt="repair_logo" width={80} height={80} />
                      <h2>Service Center | Desktop, Laptop</h2>
                      <p>
                        Shop #43, 44; Shamabay Market-3, Shahid Shahidullah Kaisar Road, Feni-3900
                        <br />
                        <span className='ri-phone-fill'></span> <strong>01919 757683, 01919 757684</strong>  
                      </p>
                    </article>
                    <article className="contact__card">
                      <Image src="/contact_icon/printer.png" alt="printer_logo" width={80} height={80} />
                      <h2>Printer Service</h2>
                      <p>
                        Shop #35; Shamabay Market-3, Shahid Shahidullah Kaisar Road, Feni-3900
                        <br />
                        <span className='ri-phone-fill'></span> <strong>01919 757682</strong>  
                      </p>
                    </article>
                    <article className="contact__card">
                      <Image src="/contact_icon/warranty.png" alt="wraranty_logo" width={80} height={80} />
                      <h2>Warranty Section</h2>
                      <p>
                        Shop #35; Shamabay Market-3, Shahid Shahidullah Kaisar Road, Feni-3900
                        <br />
                        <span className='ri-phone-fill'></span> <strong>01919 757681</strong>  
                      </p>
                    </article>
                  </div>
                </section>
              </div>
          </div>
      </section>
    </>
  )
}

export default ContactUs