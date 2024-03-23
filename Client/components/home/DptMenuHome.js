import getGeneralGET from '@/hook/getGeneralGET';
import Link from 'next/link';


const DptMenuHome = async() => {
    
    
    const data = await getGeneralGET({name: 'side-menu'})


  return (
    <div className='featured-cat container'>
        <div className="dpt-menu-home">
            <h2 className='featured-cat__title desktop-hide'>Featured Categories</h2>
            <ul className="second-link">    

                {
                    
                    data.map((cat) => (
                        <li 
                            className='menu'
                            key={cat.id}
                        >
                            <Link href={`/menu/${cat.slug}`}>
                                <div className="icon-large"><i className={`ri-${cat.logo}`}></i></div>
                                    {cat.title} 
                            </Link>
                        </li>
                    ))}
            </ul>

        </div>
    </div>
  )
}

export default DptMenuHome

