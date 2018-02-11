import { parse } from 'query-string';

// Creating Active classes
export const IS_ACTIVE = 'IS_ACTIVE';

// Is for navigation
export const PUSH = 'PUSH';
export const REPLACE = 'REPLACE';
export const GO = 'GO';
export const GO_BACK = 'GO_BACK';
export const GO_FORWARD = 'GO_FORWARD';
export const LOCATION_CHANGE = 'LOCATION_CHANGE';
export const LOCATION_CHANGE_TAB = 'LOCATION_CHANGE_TAB';

export const isActive = (isActive: string) => ({
    type: IS_ACTIVE,
    activeRoute: isActive
});

// For Navigation
export const push = (href: string, state?: string) => ({
    type: PUSH,
    payload: href,
    state: state,
});

export const replace = (href: string) => ({
    type: REPLACE,
    payload: href,
});

export const go = (index: string) => ({
    type: GO,
    payload: index,
});

export const goBack = () => ({
    type: GO_BACK
});

export const goForward = () => ({
    type: GO_FORWARD
});
// Basic Route Change
export function locationChange(pathname: string, search: string, hash: string, state?: any) {
    return ({
        type: LOCATION_CHANGE,
        payload: {
            pathname,
            search,
            queries: parse(search),
            hash,
        }

    });
}
// For Routes that have other info passed in the route
export function locationChangeTab(pathname: string, search: string, hash: string, state?: any) {
    return ({
        type: LOCATION_CHANGE_TAB,
        payload: {
            pathname,
            search,
            queries: parse(search),
            hash,
            state
        }

    });
}