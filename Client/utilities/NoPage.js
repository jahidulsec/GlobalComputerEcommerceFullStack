import Link from "next/link"


function NoPage() {
  return (
    <section className='nopage-page'>
        <div className="container">
            <div className="wrapper">
                <div className="breadcrump">
                  <ul className="flexitem">
                      <li><Link href="/">Home</Link></li>
                      <li></li>
                  </ul>
                </div>
                <div className="error-section">
                    <img src="/error_404.svg" alt="404 error" />
                    <button 
                        type="button"
                        className='primary-btn'
                    >
                        <Link href={`/`}>
                            Go to homepage
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    </section>
  )
}

export default NoPage