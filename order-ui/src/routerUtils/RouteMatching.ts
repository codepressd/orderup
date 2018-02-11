import * as PathRegex from 'path-to-regexp';

export function matchRoute(route: any, routeParams: { path?: string, exact?: boolean }) {

    const { exact = false, path } = routeParams;

    // const theRoute = !route ? "" : route;

    if (!path) {
        return {
            path: null,
            url: route,
            isExact: true
        };
    }
    const keys: any = [];
    const activeRoute = PathRegex(path, keys);
    const match = activeRoute.exec(route.pathname);

    if (!match) {
        // There was no match found
        return false;
    }

    const url = match[0];
    const isExact = route.pathname === path;

    if (exact && !isExact) {
        // Was a match but not an exact match
        return null;
    }

    return {
        path,
        url,
        isExact
    };

}