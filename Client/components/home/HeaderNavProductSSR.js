import getGeneralGET from "@/hook/getGeneralGET"
import Link from "next/link"


const HeaderNavProductSSR = async() => {

    const sideCat = await getGeneralGET({name: 'side-menu'})

  return (
    <div className="mega">
        <div className="container">
            <ul className="wrapper">
                
                {
                    sideCat.map((cat) => (
                            <li key={cat.id} className="row">
                                <h4>
                                    <Link href={`/menu/${cat.slug}`}>{cat.title}</Link>
                                </h4>
                                <div className='nav-mega__sub-list'>
                                {   
                                    cat.sub_side_menu.length > 0 &&
                                    cat.sub_side_menu.map(subCat => (
                                        <ul key={subCat.id}>
                                            <li>
                                                <Link href={`/menu/${cat.slug}/${cat.query == 'brand' ? 'b' : 'c'}/${subCat.slug}`}>
                                                    {subCat.name}
                                                </Link>
                                            </li>
                                        </ul>
                                    ))
                                }
                                </div>

                            </li>
                    ))
                }
                    
            
            </ul>

        </div>
    </div>
  )
}

export default HeaderNavProductSSR