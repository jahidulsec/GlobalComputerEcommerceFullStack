
import Link from "next/link"
import ResetPageForm from "@/components/reset page/ResetPageForm"


export const metadata = {
    title: 'Reset Password | Global Computer (BD)'
}


const ResetPassword = async() => {

  return (
    <section className="reset-page">
        <div className="container flexcenter">
            <div className="wrapper">
                <div>
                    <div className="reset-page__header">
                        <Link href={`/login`} className="flexitem">
                            <span className="ri-arrow-left-line"></span>
                            <span>Go to Login page</span>
                        </Link>
                    </div>
                    <h1>Reset Password</h1>
                    <p>Enter the email associated with your account and we will send an email with instructions to reset your password.</p>
                    <ResetPageForm />
                </div>
            </div>
        </div>
    </section>
  )
}

export default ResetPassword