
import Link from "next/link"


const ResetConfirm = async() => {

  return (
    <section className="reset-page">
        <div className="container flexcenter">
            <div className="wrapper">
                <div className="flexcenter flexcol">
                    <div className="mail-icon">
                        <span className="ri-mail-line"></span>
                    </div>
                    <h1>Check your mail</h1>
                    <p>We have sent a password recovery link to your mail.</p>
                    <button className="secondary-btn" type='button' title='Go to homepage'>
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

export default ResetConfirm