export const getNestedRoutes = (route) => {
    if (route.routes) {
        const result = [route];
        route.routes.forEach((item) =>
            item.routes ? result.push(getNestedRoutes(item)) : result.push(item)
        );
        return result;
    }
    return [route];
};

export const getCurrentLocationConfiguration = (routes, location) => {
    if (!routes) {
        return true;
    }
    const nestedRouted = routes.map((route) => getNestedRoutes(route)).flat();
    return nestedRouted.find((item) => item.path === location.pathname) || {};
};

export const getLocationWithState = (location) => {
    return location.state ? { ...location } : { ...location, state: {} };
};
