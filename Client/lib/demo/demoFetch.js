import { demoBrands, demoCategories, demoProducts, demoSideMenus, demoSliders } from "./demoData"

// Serves GET requests from demo data. Mirrors the Django REST API:
// same response shapes, filters, search, ordering and `size`-based pagination.

const money = (value) => Number(value).toFixed(2)

const findBrand = (slug) => demoBrands.find(b => b.slug === slug)
const findCategory = (slug) => demoCategories.find(c => c.slug === slug)
const findSideMenu = (slug) => demoSideMenus.find(m => m.slug === slug)


// ---- serializers ----

const serializeCategory = ({ id, slug, title, logo, parent_category }) => ({ id, slug, title, logo, parent_category })

const serializeSideMenu = (menu) => ({
    id: menu.id,
    title: menu.title,
    slug: menu.slug,
    logo: menu.logo,
    query: menu.query,
    sub_side_menu: menu.sub_side_menu.map((slug, i) => ({
        id: menu.id * 100 + i,
        slug,
        name: menu.query === 'brand' ? findBrand(slug)?.title : findCategory(slug)?.title,
        side_menu: menu.title,
    })),
})

const productReviews = (p) => {
    const average_stars = p.reviews.length
        ? p.reviews.reduce((sum, r) => sum + r.stars, 0) / p.reviews.length
        : 0
    const reviews = p.reviews.map((r, i) => ({
        id: p.id * 100 + i,
        product: p.title,
        user: r.user,
        user_id: i + 1,
        count_review: p.reviews.length,
        average_stars,
        comment: r.comment,
        stars: r.stars,
        date: r.date,
    }))
    return { average_stars, count_review: p.reviews.length, reviews }
}

const productCommon = (p) => {
    const { average_stars, count_review } = productReviews(p)
    const discount = p.prev_price > p.price ? Math.round((p.prev_price - p.price) / p.prev_price * 100) : 0
    return {
        id: p.id,
        title: p.title,
        slug: p.slug,
        model_name: p.model_name,
        price: money(p.price),
        prev_price: money(p.prev_price),
        discount: String(discount),
        is_stock: p.is_stock,
        sold_stock: p.sold_stock,
        total_stock: p.total_stock,
        average_stars,
        count_review,
        images: [{ id: p.id, product: p.id, image: p.image }],
        key_features: p.key_features.map(([field_name, field_description], i) => ({
            id: p.id * 100 + i, field_name, field_description, product: p.title,
        })),
        offered: p.offered,
        offered_time: p.offered_time,
    }
}

const productSpecification = (p) => [{
    id: p.id,
    product: p.title,
    table_name: 'Specification',
    spec_table: p.key_features.map(([field_name, field_description], i) => ({
        id: p.id * 100 + i, specification: 'Specification', specification_id: p.id, field_name, field_description,
    })),
}]

// DisplayProductSerializer
const serializeDisplayProduct = (p) => ({
    ...productCommon(p),
    brand: findBrand(p.brand).title,
    category: p.category,
})

// ProductSerializer
const serializeProduct = (p) => ({
    ...productCommon(p),
    category: serializeCategory(findCategory(p.category)),
    emi_price: money(p.emi_price),
    description: p.description,
    featured: p.featured,
    display_big: p.display_big,
    specification: productSpecification(p),
})

// SingleProductSerializer
const serializeSingleProduct = (p) => ({
    ...serializeProduct(p),
    brand: findBrand(p.brand).title,
    brand_id: findBrand(p.brand).id,
    side_menu: serializeSideMenu(findSideMenu(p.side_menu)),
    side_menu_id: findSideMenu(p.side_menu).id,
    reviews: productReviews(p).reviews,
})


// ---- query helpers ----

const toBool = (value) => ['true', '1'].includes(String(value).toLowerCase())

const productFilters = {
    category__slug: (p, v) => p.category === v,
    category__title: (p, v) => findCategory(p.category).title === v,
    brand__slug: (p, v) => p.brand === v,
    side_menu__slug: (p, v) => p.side_menu === v,
    offered: (p, v) => p.offered === toBool(v),
    featured: (p, v) => p.featured === toBool(v),
    is_stock: (p, v) => p.is_stock === toBool(v),
    display_big: (p, v) => p.display_big === toBool(v),
    min_price: (p, v) => p.price >= Number(v),
    max_price: (p, v) => p.price <= Number(v),
}

const applyFilters = (items, params, filters) => items.filter(item =>
    Object.entries(filters).every(([key, test]) => {
        const value = params.get(key)
        return value === null || value === '' || test(item, value)
    })
)

// DRF SearchFilter: every whitespace/comma separated term must match the title
const applySearch = (items, params) => {
    const terms = (params.get('search') || '').toLowerCase().split(/[\s,]+/).filter(Boolean)
    return items.filter(item => terms.every(term => item.title.toLowerCase().includes(term)))
}

const applyOrdering = (items, params) => {
    const fields = (params.get('ordering') || '').split(',').filter(Boolean)
    if (!fields.length) return items
    return [...items].sort((a, b) => {
        for (const field of fields) {
            const desc = field.startsWith('-')
            const key = desc ? field.slice(1) : field
            if (a[key] === b[key]) continue
            return (a[key] > b[key] ? 1 : -1) * (desc ? -1 : 1)
        }
        return 0
    })
}

// SetPagination only paginates when `size` is present
const paginate = (items, params, url) => {
    const size = parseInt(params.get('size'))
    if (!size || size < 1) return { status: 200, data: items }

    const page = parseInt(params.get('page')) || 1
    const lastPage = Math.max(1, Math.ceil(items.length / size))
    if (page < 1 || page > lastPage) return { status: 404, data: { detail: 'Invalid page.' } }

    const pageUrl = (n) => {
        const next = new URL(url)
        next.searchParams.set('page', n)
        return next.toString()
    }

    return {
        status: 200,
        data: {
            count: items.length,
            next: page < lastPage ? pageUrl(page + 1) : null,
            previous: page > 1 ? pageUrl(page - 1) : null,
            results: items.slice((page - 1) * size, page * size),
        },
    }
}

const notFound = { status: 404, data: { detail: 'Not found.' } }

const listOrDetail = (items, id, params, url, serialize, lookup = 'slug') => {
    if (id) {
        const item = items.find(i => String(i[lookup]) === decodeURIComponent(id))
        return item ? { status: 200, data: serialize(item) } : notFound
    }
    return paginate(applyOrdering(items, params).map(serialize), params, url)
}


// ---- router ----

const routes = {
    'category': (id, params, url) => listOrDetail(applySearch(demoCategories, params), id, params, url, serializeCategory),
    'brand': (id, params, url) => listOrDetail(demoBrands, id, params, url, b => ({ ...b })),
    'side-menu': (id, params, url) => listOrDetail(demoSideMenus, id, params, url, serializeSideMenu),
    'slider': (id, params, url) => listOrDetail(demoSliders, id, params, url, s => ({ ...s }), 'id'),
    'product': (id, params, url) => {
        const items = applySearch(applyFilters(demoProducts, params, productFilters), params)
        return id
            ? listOrDetail(demoProducts, id, params, url, serializeSingleProduct)
            : listOrDetail(items, null, params, url, serializeProduct)
    },
    'display-product': (id, params, url) => {
        const items = applySearch(applyFilters(demoProducts, params, productFilters), params)
        return listOrDetail(items, id, params, url, serializeDisplayProduct)
    },
}

export default async function demoFetch(rawUrl) {
    // some hooks build URLs across multiple lines, and API_URL may be unset in demo mode
    const url = new URL(rawUrl.replace(/\n\s*/g, ''), 'http://demo.local')
    const segments = url.pathname.split('/').filter(Boolean)
    const base = segments.findIndex(s => s === 'api' || s === 'auth')
    const [kind, , name, id] = segments.slice(base)

    let result
    if (kind === 'api' && routes[name]) {
        result = routes[name](id, url.searchParams, url)
    } else if (id || kind === 'auth') {
        result = notFound
    } else {
        // endpoints without demo data (orders, reviews, ...) come back empty
        result = paginate([], url.searchParams, url)
    }

    return {
        ok: result.status >= 200 && result.status < 300,
        status: result.status,
        json: async () => structuredClone(result.data),
    }
}
