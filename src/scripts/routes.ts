import { METHOD, Route, TYPE } from "./API";

export default {
    AUTH: {
        GENERATE: () => new Route(`auth/generate`, METHOD.POST),
        TOKEN: (portalToken?: string) => new Route(`auth/token`, METHOD.GET, portalToken ? { portalToken } : undefined),
    }
};
