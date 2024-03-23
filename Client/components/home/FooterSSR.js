import getGeneralGET from "@/hook/getGeneralGET"
import Link from "next/link"


const FooterSSR = async() => {

    const sideCat = await getGeneralGET({name: `side-menu`})

  return (
    <>
        {
            sideCat.map(menu => (
                <li key={menu.id}>
                    <Link href={`/menu/${menu.slug}`}>
                        {menu.title}
                    </Link>
                </li>
            ))
        }
    </>
  )
}

export default FooterSSR