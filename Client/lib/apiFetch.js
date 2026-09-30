import demoFetch from "./demo/demoFetch"

export const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true'

// Drop-in replacement for fetch: in demo mode GET requests are served from local demo data
export default function apiFetch(url, options = {}) {
    const method = (options.method || 'GET').toUpperCase()
    if (isDemoMode && method === 'GET') {
        return demoFetch(url)
    }
    return fetch(url, options)
}
