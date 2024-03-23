import ConfirmPasswordForm from "@/components/reset page/ConfirmPasswordForm"
import Link from "next/link"


export const metadata = {
    title: 'Create New Password | Global Computer (BD)'
}

const ConfirmPassword = async({params}) => {
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
                    <h1>Create new password</h1>
                    <p>Your password must be different from previous used password</p>
                    <ConfirmPasswordForm params={params} />
                </div>
            </div>
        </div>
    </section>
  )
}

export default ConfirmPassword