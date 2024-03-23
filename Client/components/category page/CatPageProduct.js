import NoItem from "@/utilities/NoItem"
import FeaturedCard from "../home/FeaturedCard"
import getSearchQuery from "@/hook/getSearchQuery"
import PaginationProduct from "@/utilities/PaginationProduct"


export const CatPageProduct = async({params, searchParams}) => {

    const searchProduct = await getSearchQuery({
        name: `display-product`, 
        field: params.name, 
        field_cat: params.cat || ``,
        field_cat_query: params.query || ``,
        field_brand: params.brand || ``,
        search_query: searchParams.q || ``,
        page: searchParams.page || 1, 
        size: searchParams.size || 12,
        ordering: searchParams.sorting || '',
        status: searchParams.status || ``,
        max_price: searchParams.max || ``,
        min_price: searchParams.min || ``
    })


  return (
    <>
        <div className="products main flexwrap">
            {   
                searchProduct.length != 0 &&
                searchProduct.results.map(product => (
                    <FeaturedCard 
                        key={product.id}
                        product={product}
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
