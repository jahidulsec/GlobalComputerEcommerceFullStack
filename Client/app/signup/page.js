
import Link from 'next/link';
import Image from 'next/image';
import SignupForm from '@/components/SignupForm';


export const generateMetadata = async() => {

    return {
      title: `Sign Up | Global Computer (BD)` || `Global Computer (BD)`,
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
        canonical: `${process.env.NEXT_PUBLIC_APP_URL}/signup`,
      }
    }
  } 


const SignUp = async() => {

  return (
    <>
    <section className='signup-page'>
        <div className="container">
            <div className="wrapper">
                <div className="signup flexwrap">
                    <div className="item left styled">
                      <Link href="/" className='flexcenter'>
                          <Image 
                            src={`/${process.env.NEXT_PUBLIC_LOGO_BIG}`} 
                            alt="global_logo" 
                            width={160}
                            height={90}
                            priority 
                          />
                        </Link>
                        <h1>Create an account</h1>
                        <SignupForm />
                        <div className="footer flexitem">
                            <p className='mini-text'>Already Have an account?</p>
                            <button 
                                className="mini-text" 
                                type='button'
                            >
                                <Link href={`/login`}>
                                    <b>Login</b>
                                </Link>
                            </button>

                        </div>
                    </div>

                    <div className="item right mobile-hide">
                        <Image src="/signup_bg.jpg" alt="signup_bg" width={670} height={670} />
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default SignUp