import { METHOD, Route, TYPE } from "./API";

export default {
    AUTH: {
        GENERATE: () => new Route(`auth/generate`, METHOD.POST),
        TOKEN: (portalToken?: string) => new Route(`auth/token`, METHOD.GET, portalToken ? { portalToken } : undefined),
    },
    USERS: {
        GET: (furwazId: number) => new Route(`https://main.apis.furwaz.fr/users/${furwazId}`, METHOD.GET),
    },
};
