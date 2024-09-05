import { METHOD, Route } from './API';

export default {
    AUTH: {
        GENERATE: () => new Route(`auth/generate`, METHOD.POST),
        TOKEN: (portalToken?: string) =>
            new Route(`auth/token`, METHOD.GET, portalToken ? { portalToken } : undefined)
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
        DELETE: () => new Route(`user`, METHOD.DELETE)
    },
    STORE: {
        PRODUCTS: {
            GET: () => new Route(`store/products`, METHOD.GET),
            CREATE: () => new Route(`store/products`, METHOD.POST),
            DELETE: (productId: number) => new Route(`store/products/${productId}`, METHOD.DELETE)
        }
    },
    USERPRODUCTS: {
        GET: (id: number | undefined = undefined) =>
            new Route(`products${id ? '/' + id : ''}`, METHOD.GET),
        UPDATE: (id: number, quantity: number) =>
            new Route(`products/${id}`, METHOD.PATCH, undefined, { quantity }),
        DELETE: (id: number) => new Route(`products/${id}`, METHOD.DELETE)
    },
    CHECKOUT: {
        START: (infos: any) => new Route(`checkout`, METHOD.POST, undefined, infos),
        GET: (id: string) => new Route(`checkout/${id}`, METHOD.GET)
    },
    CART: {
        GET: () => new Route(`cart`, METHOD.GET),
        ADD: (id: number, quantity: number) =>
            new Route(`cart/${id}`, METHOD.POST, undefined, { quantity }),
        DELETE: () => new Route(`cart`, METHOD.DELETE),
        PRODUCTS: {
            GET: (id: number) => new Route(`cart/${id}`, METHOD.GET),
            UPDATE: (id: number, quantity: number) =>
                new Route(`cart/${id}`, METHOD.PATCH, undefined, { quantity }),
            DELETE: (id: number) => new Route(`cart/${id}`, METHOD.DELETE)
        }
    }
};
