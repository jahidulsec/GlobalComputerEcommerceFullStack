export default async function getSearchQuery ({
    name, field, field_cat, field_brand, 
    field_cat_query, search_query, size, page,
    token, ordering, min_price, max_price, status
}) {
    let url = process.env.NEXT_PUBLIC_API_URL + `/api/${process.env.NEXT_PUBLIC_API_VERSION}/${name}/`
            
    const headerOpt = new Headers();
    headerOpt.append('Content-Type', "application/json")
    if (token) {
        headerOpt.append('Authorization', `Token ${token}`)
    }

    if (field == 'featured') {
        url += `?featured=true`
    }

    if (field == 'trending') {
        url += `?offered=true`
    }

    if (field == 'category') {
        url += `?category__slug=${field_cat || ``}`
    }

    if (field === 'menu') {
        url += `?side_menu__slug=${field_cat || ``}&brand__slug=${field_cat_query == 'b' ? field_brand : ''}&category__slug=${field_cat_query == 'c' ? field_brand : ''}`
    }

    if (field == 'search')  {
        url += `?search=${search_query}`
    }


   if (field) {
    url += `&size=${size}&page=${page}&ordering=${ordering ? ordering : ``}&min_price=${min_price ? min_price : ``}&max_price=${max_price ? max_price : ``}&is_stock=${status ? status :''}`
   }

    const res = await fetch( url, 
        {
            method: 'GET',
            headers: headerOpt,
            cache: 'no-store'
        })
    
    if(!res.ok) {
        return []
    }

    return res.json()
}