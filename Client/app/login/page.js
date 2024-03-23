import Image from 'next/image';
import Link from 'next/link';
import LoginForm from '@/components/LoginForm';


export const generateMetadata = async() => {

    return {
      title: `Login | Global Computer (BD)` || `Global Computer (BD)`,
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
        canonical: `${process.env.NEXT_PUBLIC_APP_URL}/login`,
      }
    }
  } 


const Login = () => {

  return (
    <>
    <section className='login-page'>
        <div className="container">
            <div className="wrapper">
                <div className="login flexwrap">
                    <div className="item right mobile-hide">
                        <Image src="/login_bg.jpg" alt="login" width={670} height={670} />
                    </div>

                    <div className="item left styled">
                        <Link href="/" className='flexcenter'>
                          <Image 
                            src={`/${process.env.NEXT_PUBLIC_LOGO_BIG}`} 
                            alt="Global Computer logo" 
                            width={160}
                            height={90}
                            priority 
                          />
                        </Link>
                        <h1>Welcome Back</h1>
                        <LoginForm />


                        <div className="footer flexitem">
                            <Link href={`/reset-password`}>
                                <span className='mini-text'>
                                    <b>
                                        Forget Password?
                                    </b>
                                </span>
                            </Link>
                            <span className='mini-text'>|</span>
                            <span className='mini-text'>Create an account?</span>
                            <button 
                                className="mini-text" 
                                type='button'
                            >
                                <Link href={`/signup`}>
                                    <b>Sign up</b>
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default Login