import NoItem from "@/utilities/NoItem"
import getSearchQuery from "@/hook/getSearchQuery"
import PaginationProduct from "@/utilities/PaginationProduct"
import PCBProductCard from "./PCBProductCard"


export const PCBuildCatSSR = async({params, searchParams}) => {

    const searchProduct = await getSearchQuery({
        name: `display-product`, 
        field: params.name, 
        field_cat: params.cat || ``,
        search_query: searchParams.q || ``,
        page: searchParams.page || 1, 
        size: searchParams.size || 12,
        ordering: searchParams.sorting || 'price',
        status: searchParams.status || ``,
        max_price: searchParams.max || ``,
        min_price: searchParams.min || ``
    })


  return (
    <>
        <div className="pcb-product__container">
            {   
                searchProduct.length != 0 &&
                searchProduct.results.map(product => (
                    <PCBProductCard 
                        key={product.id}
                        product={product}
                        cat = {params.cat}
                    />
                )) 
            } 
        </div>

        {
            (searchProduct.length == 0 || searchProduct.results.length == 0)  &&
                <NoItem />
        }



        <PaginationProduct
            response={searchProduct}
            page={searchParams.page || 1}
            size={searchParams.size || 12}
        />
    </>
  )
}
