"use client"

import { pc_build_accessories, pc_build_core_component } from "@/lib/data"
import Link from "next/link"
import { useBuildContext } from "@/context/BuildContext"
import { currencyFormat } from "@/utilities/currencyFormat"


const PCQuotation = () => {

    const {parts, onParts, total} = useBuildContext()
    const handlePrint = () => {
        window.print()
    }

  return (
    <div className="pc-build__quotation box-shadow">
        <div className="pc-build__quotation-header gap-1 flexspace">
            <div>
                <h1>Build Your PC | Global Computer (BD)</h1>
                <h5><i>Build your dream with us</i></h5>
            </div>

            <div className="flexitem gap-1">
                <button type="button" className="print-btn flexitem flexcenter icon-large" onClick={handlePrint}>
                    <span className="ri-printer-line"></span>
                    {/* <span >Print</span> */}
                </button>
                <span className="pc-build__total flexcol flexcenter">
                    <span>Total</span>
                    <span>{currencyFormat(total)}</span>
                </span>
            </div>
        </div>
        <div className="pc-build__core">
            <h2>Core Components</h2>
            <ul className="pc-build__core-components">
                {
                    pc_build_core_component.map(component => (

                
                    <li key={component.title} className="flexspace">
                        <div className="left flexitem gap-1">
                            {
                                parts[component.slug].image ?
                                <img className="pc-build-img" src={parts[component.slug].image} /> 
                                
                                    :
                                <span className="icon">
                                    <img src={`/pc/${component.image}.png`} />
                                </span>
                            }

                            <div className="product flexcol">
                                <h3 className="flexitem gap-1">
                                    <span>{component.title}</span>
                                    {component.quantity && parseInt(parts[component.slug].quantity) > 0 && <span className="fly-item">x{parts[component.slug].quantity}</span>}
                                    {
                                        component.required &&
                                        <span className="required">Required</span>
                                    }
                                </h3>
                                {
                                    
                                    parts[component.slug].title ?
                                    <h4>{parts[component.slug].title}</h4>
                                        :
                                    <span className="empty-title"></span>

                                }
                            </div>
                        </div>
                        <div className="right flexitem gap-1">
                            {
                                parts[component.slug].price ?
                                <span className="price">
                                    {currencyFormat(parts[component.slug].price)}
                                </span>
                                    :
                                <span className="empty-title"></span>
                                
                            }
                            {
                                !parts[component.slug].title ?
                                <Link href={`/tool/pc-build/choose/category/${component.slug}`}>
                                    <button className="choose-btn">Choose</button>
                                </Link>
                                    :
                                    <div className="flexitem gap-1">
                                        {
                                            component.quantity &&

                                            <input 
                                                title="quantity"
                                                type="number" 
                                                min={1} 
                                                className="pcb-build__core-quantity" 
                                                name="quantity" 
                                                id="quantity" 
                                                onChange={e => {
                                                onParts({
                                                    ...parts,
                                                    [component.slug]: {
                                                        title: parts[component.slug].title,
                                                        unitPrice: parts[component.slug].unitPrice ,
                                                        price: parseInt(parts[component.slug].unitPrice) * parseInt(e.target.value) ,
                                                        image: parts[component.slug].image,
                                                        quantity: e.target.value,
                                                    }
                                                })
                                            }} />
                                        }
                                        <button 
                                            type="button"
                                            onClick={
                                                () => {
                                                    onParts({
                                                        ...parts,
                                                        [component.slug]: {
                                                            title: "",
                                                            unitPrice: "",
                                                            price: "",
                                                            image: "",
                                                        }
                                                    })
                                                }
                                            }
                                        >
                                            <i className="ri-close-line ri-xl"></i>
                                        </button>
                                        <Link href={`/tool/pc-build/choose/category/${component.slug}`}>
                                            <button type="button"><i className="ri-refresh-line ri-xl"></i></button>
                                        </Link>
                                    </div>
                                
                            }
                        </div>
                    </li>
                    ))
                }

            </ul>  
        </div>
        <div className="pc-build_-core">
        <h2>Peripherals & Accessories</h2>
            <ul className="pc-build__core-components">
                {
                    pc_build_accessories.map(accessory => (

                
                    <li key={accessory.title} className="flexspace">
                        <div className="left flexitem gap-1">
                            {
                                parts[accessory.slug].image ?
                                <img className="pc-build-img" src={parts[accessory.slug].image} /> 
                                
                                    :
                                <span className="icon">
                                    <img src={`/pc/${accessory.image}.png`} />
                                </span>
                            }
                            <div className="product flexcol">
                                <h3 className="flexitem gap-1">
                                    <span>{accessory.title}</span>
                                </h3>
                                {
                                    parts[accessory.slug].title ?
                                        <h4>{parts[accessory.slug].title}</h4>
                                            :
                                        <span className="empty-title"></span>

                                }
                            </div>
                        </div>
                        <div className="right flexitem gap-1">
                        {
                                parts[accessory.slug].price ?
                                <span className="price">
                                    {currencyFormat(parts[accessory.slug].price)}
                                </span>
                                    :
                                <span className="empty-title"></span>
                                
                            }
                            {
                                !parts[accessory.slug].title ?
                                <Link href={`/tool/pc-build/choose/category/${accessory.slug}`}>
                                    <button className="choose-btn">Choose</button>
                                </Link>
                                    :
                                <div className="flexitem gap-1">
                                    <button 
                                        type="button"
                                        onClick={
                                            () => {
                                                onParts({
                                                    ...parts,
                                                    [accessory.slug]: {
                                                        title: "",
                                                        unitPrice: "",
                                                        price: "",
                                                        image: "",
                                                    }
                                                })
                                            }
                                        }
                                    >
                                        <i className="ri-close-line ri-xl"></i>
                                    </button>
                                    <Link href={`/tool/pc-build/choose/category/${accessory.slug}`}>
                                        <button type="button"><i className="ri-refresh-line ri-xl"></i></button>
                                    </Link>
                                </div>
                                
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

export default PCQuotation