export default async function getGeneralGET ({name, id, order, page, size, category_slug, token, status, offered, featured, product_slug, side_menu_slug, category_id, auth, brand_slug, display_big, min_price, max_price, search, order_status}) {
    
    const headerOpt = new Headers();
    headerOpt.append('Content-Type', "application/json")
    if (token) {
        headerOpt.append('Authorization', `Token ${token}`)
    }
    
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/${auth ? `auth` : `api`}/${process.env.NEXT_PUBLIC_API_VERSION}/${name}/${id ? id : ''}` 
        + `${order ? `?ordering=${order}` : ''}` 
        + `${page ? `${order ? '&' : '?'}page=${page}` : ''}` 
        + `${size ? `${order || page ? '&' : '?'}size=${size}` : ''}` 
        + `${category_slug ? `${order || page || size ? '&' : '?'}category__slug=${category_slug}` : ''}` 
        + `${status ? `${order || page || size || category_slug ? '&' : '?'}is_stock=${status}` : ''}` 
        + `${offered ? `${order || page || size || category_slug || status ? '&' : '?'}offered=${offered}` : ''}`  
        + `${featured ? `${order || page || size || category_slug || status || offered ? '&' : '?'}featured=${featured}` : ''}` 
        + `${product_slug ? `${order || page || size || category_slug || status || offered || featured ? '&' : '?'}product__slug=${product_slug}` : ''}` 
        + `${side_menu_slug ? `${order || page || size || category_slug || status || offered || featured || product_slug ? '&' : '?'}side_menu__slug=${side_menu_slug}` : ''}`  
        + `${category_id ? `${order || page || size || category_slug || status || offered || featured || product_slug || side_menu_slug? '&' : '?'}category=${category_id}` : ''}` 
        + `${brand_slug ? `${order || page || size || category_slug || status || offered || featured || product_slug || side_menu_slug || category_id? '&' : '?'}brand__slug=${brand_slug}` : ''}` 
        + `${display_big ? `${order || page || size || category_slug || status || offered || featured || product_slug || side_menu_slug || category_id || brand_slug? '&' : '?'}display_big=${display_big}` : ''}`  
        + `${min_price ? `${order || page || size || category_slug || status || offered || featured || product_slug || side_menu_slug || category_id || brand_slug || display_big? '&' : '?'}min_price=${min_price}` : ''}` 
        + `${max_price ? `${order || page || size || category_slug || status || offered || featured || product_slug || side_menu_slug || category_id || brand_slug || display_big || min_price? '&' : '?'}max_price=${max_price}` : ''}` 
        + `${(search && search.length > 0) ? `${order || page || size || category_slug || status || offered || featured || product_slug || side_menu_slug || category_id || brand_slug || display_big || min_price || max_price? '&' : '?'}search=${search}` : ''}`  
        + `${order_status ? `${order || page || size || category_slug || status || offered || featured || product_slug || side_menu_slug || category_id || brand_slug || display_big || min_price || max_price || search? '&' : '?'}status=${order_status}` : ''}` , 
    {
        method: 'GET',
        headers: headerOpt,
        cache: 'no-store'
    })  

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}