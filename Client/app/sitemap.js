import getGeneralGET from "@/hook/getGeneralGET"



export default async function sitemap() {
    const baseUrl = 'https://globalcomputer.com.bd'

    const products = await getGeneralGET({name: 'display-product'})
    const productsUrls = products?.map((product) => {
        return {
            url: `${baseUrl}/product/${product.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
        }
    }) ?? [];

    const categories = await getGeneralGET({name: 'category'})
    const categoriesUrls = categories?.map((category) => {
        return {
            url: `${baseUrl}/category/${category.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
        }
    }) ?? [];

    const sideMenus = await getGeneralGET({name: `side-menu`})
    const sideMenusUrls = sideMenus.map((menu) => {
        for (let i = 0; i < menu.sub_side_menu.length; i++) {
            return {
                url: `${baseUrl}/menu/${menu.slug}/${menu.query === 'brand'? 'b' : 'c'}/${menu.sub_side_menu[i].slug}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
            }
        }
    })

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
        },
        {
            url: `${baseUrl}/login`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
        },
        {
            url: `${baseUrl}/signup`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/policies`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
        },
        {
            url: `${baseUrl}/terms-conditions`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
        },
        
        ...productsUrls,
        ...categoriesUrls,
        ...sideMenusUrls,
    ]

}