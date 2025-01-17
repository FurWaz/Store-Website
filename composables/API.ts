import User from "~/composables/User";

export enum METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}

export enum TYPE {
    TEXT = 'text/plain',
    JSON = 'application/json',
    FORM = 'application/x-www-form-urlencoded',
    FILE = 'multipart/form-data',
    ERROR = 'error'
}

export enum STATUS {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    PAYEMENT_REQUIRED = 402,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    NOT_ACCEPTABLE = 406,
    CONFLICT = 409,
    EXPECTATION_FAILED = 417,
    TEAPOT = 418,
    ENHANCE_YOUR_CALM = 420,
    TOO_MANY_REQUESTS = 429,
    TOKEN_EXPIRED = 498,
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501
}

export class Route {
    private static SanatizePath(path: string) {
        if (path.startsWith('/'))
            path = path.substring(1);
        if (path.endsWith('/'))
            path = path.substring(0, path.length - 1);
        return path;
    }

    public path: string;
    public method: METHOD = METHOD.GET;
    public query: object|undefined;
    public body: any;
    public type: TYPE;

    constructor(path: string, method: METHOD = METHOD.GET, query: object|undefined = undefined, body: any = undefined, type: TYPE = TYPE.JSON) {
        this.path = Route.SanatizePath(path);
        this.query = query;
        this.method = method;
        this.body = body;
        this.type = type;
    }

    buildPath(): string {
        let url = this.path;
        if (this.query !== undefined && Object.keys(this.query).length > 0) {
            url += '?';
            for (const key in this.query) {
                if (key === undefined || (this.query as any)[key] === undefined)
                    continue;
                url += `${key}=${(this.query as any)[key]}&`;
            }
            url = url.substring(0, url.length - 1);
        }
        return url;
    }

    buildBody(): any {
        return this.body
            ? (typeof(this.body) === 'object' ? JSON.stringify(this.body) : this.body)
            : undefined;
    }
}
export type RouteBuilder = ((...args: any[]) => Promise<Route>)|((...args: any[]) => Route);


export class Response {
    public static async FromFetchResponse(res: any): Promise<Response> {
        const text = await res.text();
        let json = undefined;
        try { json = JSON.parse(text) }
        catch (err) { ; }

        if (!res.ok) {
            return new Response(
                res.status,
                json?.error ?? res.statusText,
                json?.data,
                TYPE.ERROR,
                json?.field
            );
        }

        return new Response(
            res.status,
            json?.message ?? res.statusText,
            json?.data,
            json !== undefined ? TYPE.JSON : TYPE.TEXT
        );
    }

    public status: number;
    public message: any;
    public data: any;
    public type: TYPE;
    public field: any;

    constructor(status: number, message: string, data: any = undefined, type: TYPE = TYPE.JSON, field: any = undefined) {
        this.status = status;
        this.data = data;
        this.type = type;
        this.field = field;
        this.message = message;
    }

    get error(): boolean {
        return this.type === TYPE.ERROR;
    }
}

export class API {
    private static DOMAIN_REGEX = /^([a-zA-Z]+:\/\/)?[a-zA-Z]+\.([a-zA-Z]+\.)*[a-zA-Z]+/;

    private static SanatizeHost(host: string) {
        if (host.indexOf('//') !== -1)
            host = host.substring(host.indexOf('//') + 2);
        if (host.indexOf('/') !== -1)
            host = host.substring(0, host.indexOf('/'));
        if (host.indexOf('?') !== -1)
            host = host.substring(0, host.indexOf('?'));
        return host;
    }

    private static SanatizePath(path: string) {
        const domain = API.DOMAIN_REGEX.exec(path);
        if (domain !== null && domain.length > 0) {
            path = path.substring(domain[0].length);
        }
        if (path.startsWith('/'))
            path = path.substring(1);
        if (path.endsWith('/'))
            path = path.substring(0, path.length - 1);
        return path;
    }

    private static GetProtocol(): string {
        if (import.meta.server) return import.meta.env.VITE_API_HOST.startsWith('localhost')? 'http': 'https';
        return window.location.protocol === 'https:' ? 'https' : (window.location.hostname === 'localhost' ? 'http': 'https');
    }

    public static async Request(route: Route|RouteBuilder, headers: object|undefined = undefined): Promise<Response> {
        if (typeof (route) === 'function') {
            route = await route();
        }

        const routePath = route.buildPath();
        const routeBody = route.buildBody();

        const pathContainsHost = API.DOMAIN_REGEX.test(routePath);
        const host = API.SanatizeHost(pathContainsHost ? routePath : import.meta.env.VITE_API_HOST);
        const path = API.SanatizePath(routePath);

        const protocol = routePath.startsWith('http') ? routePath.split('://')[0] : API.GetProtocol();

        const { locale } = useNuxtApp().$i18n;

        const res = await fetch(
            `${protocol}://${host}/${path}`,
            {
                method: route.method,
                body: routeBody,
                headers: {
                    'Content-Type': route.type,
                    'Accept-Language': locale.value,
                    ...headers
                }
            }
        );
        return await Response.FromFetchResponse(res);
    }

    public static async RequestLogged(route: Route|RouteBuilder, headers?: object, user?: User): Promise<Response> {
        const currentUser = user ? user : User.Current;

        if (!currentUser) {
            throw new Error('API::RequestLogged : No user logged in');
        }

        const newHeaders = {
            'Authorization': `Bearer ${User.Current?.token}`,
            ...headers
        };

        let response = await API.Request(route, newHeaders);
        if (response.status === 401) {
            User.Forget();
        }

        return response;
    }

    public static async RequestTryLogged(route: Route|RouteBuilder, headers: object|undefined = undefined): Promise<Response> {
        try {
            return await API.RequestLogged(route, headers);
        } catch (err) {
            return await API.Request(route, headers);
        }
    }
}