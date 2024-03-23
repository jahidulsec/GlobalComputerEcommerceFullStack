import PCQuotation from "@/components/pc build page/PCQuotation"
import Link from "next/link"



const page = async() => {
    
    return (
    <section className="pc-build-page">
        <div className="container">
            <div className="wrapper">
                <div className="breadcrump">
                    <ul className="flexwrap">
                        <li><Link href="/">Home</Link></li>
                        <li>Build Your PC</li>
                    </ul>
                </div>
                <PCQuotation />
            </div>
        </div>
    </section>
  )
}

export default page