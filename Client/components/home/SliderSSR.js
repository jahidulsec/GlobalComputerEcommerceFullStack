import getGeneralGET from "@/hook/getGeneralGET"
import Image from "next/image"
import Link from "next/link"

const SliderSSR = async() => {

    const sliderRes = await getGeneralGET({name: 'slider', order:`-id`})

  return (
    <>
    {
        sliderRes.map(item => (
            <div key={item.id} className="item">
                <div className="image object-cover">
                    <Link href={item.slider_url}>
                        <Image
                            src={item?.image} 
                            width='160'
                            height='90'
                            sizes='(max-width: 1004px) 100vw'
                            alt={item?.mini_text || `slider ${item?.id}`}
                            priority
                        />
                    </Link>
                </div>
                    <div 
                        className="text-content flexcol"
                        style={{color: `${item?.color ? `#fff`:`#0a021c`}`}}
                    >
                        <h2 className='flexcol'>
                            <span>{item?.mini_text} 
                            </span>
                            <span>
                                {item?.mid_text}
                            </span>
                        </h2>
                        {
                            (item.mini_text || item.mid_text) &&
                            <Link href={item.slider_url}>
                                <button 
                                    type='button'
                                    className='primary-btn'
                                >
                                    Shop Now
                                </button>
                            </Link>
                        }
                    </div>
            </div>

        ))
    }
    </>
  )
}

export default SliderSSR