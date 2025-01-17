import { METHOD, Route } from "~/composables/API";

export default {
    AUTH: {
        GENERATE: () => new Route(`auth/generate`, METHOD.POST),
        TOKEN: (portalToken?: string) => new Route(`auth/token`, METHOD.GET, portalToken ? { portalToken } : undefined)
    },
    FURWAZ: {
        USER: {
            GET: (id: number) => new Route(`https://api.furwaz.com/users/${id}`, METHOD.GET)
        },
        APP: {
            GET: (id: number) => new Route(`https://api.furwaz.com/apps/${id}`, METHOD.GET)
        }
    },
    USER: {
        GET: () => new Route(`user`, METHOD.GET),
        DELETE: () => new Route(`user`, METHOD.DELETE),
        INFOS: {
            DELETE: () => new Route(`user/infos`, METHOD.DELETE),
            UPDATE: (infos: any) => new Route(`user/infos`, METHOD.PATCH, undefined, infos)
        }
    },
    STORE: {
        PRODUCTS: {
            GET: (id?: number) => new Route(`store/products${id ? '/' + id : ''}`, METHOD.GET),
            CREATE: () => new Route(`store/products`, METHOD.POST),
            DELETE: (productId: number) => new Route(`store/products/${productId}`, METHOD.DELETE)
        },
        CATEGORIES: {
            GET: () => new Route(`store/categories`, METHOD.GET),
            CREATE: () => new Route(`store/categories`, METHOD.POST),
            DELETE: (categoryId: number) => new Route(`store/categories/${categoryId}`, METHOD.DELETE)
        },
        TYPES: {
            GET: () => new Route(`store/types`, METHOD.GET)
        }
    },
    USERPRODUCTS: {
        GET: (id: number | undefined = undefined) => new Route(`products${id ? '/' + id : ''}`, METHOD.GET),
        UPDATE: (id: number, quantity: number) => new Route(`products/${id}`, METHOD.PATCH, undefined, { quantity }),
        DELETE: (id: number) => new Route(`products/${id}`, METHOD.DELETE)
    },
    CHECKOUT: {
        START: (infos: any) => new Route(`checkout`, METHOD.POST, undefined, infos),
        GET: (id: string) => new Route(`checkout/${id}`, METHOD.GET)
    },
    CART: {
        GET: () => new Route(`cart`, METHOD.GET),
        ADD: (id: number, quantity: number) => new Route(`cart/${id}`, METHOD.POST, undefined, { quantity }),
        DELETE: () => new Route(`cart`, METHOD.DELETE),
        PRODUCTS: {
            GET: (id: number) => new Route(`cart/${id}`, METHOD.GET),
            UPDATE: (id: number, quantity: number) => new Route(`cart/${id}`, METHOD.PATCH, undefined, { quantity }),
            DELETE: (id: number) => new Route(`cart/${id}`, METHOD.DELETE)
        }
    }
};