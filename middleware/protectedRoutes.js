/**
 * Middleware for protected routes redirection
 *
 * @return
 */
export default ({ redirect, route, app }) => {
  const { $auth } = app;

  /**
   *  List of protected routes
   */
  let protectedRoutes = ["login", "logout"];

  if ($auth.loggedIn && protectedRoutes.includes(route.name)) {
    return redirect("/");
  }

  // Skip middleware if route is not guarded
  if (routeOption(route, "auth", false)) {
    return;
  }

  // Skip middleware if route is not found to allow 404
  if (!getMatchedComponents(route, []).length) {
    return;
  }

  const { login, callback } = $auth.options.redirect;

  if ($auth.$state.loggedIn) {
    // Redirect to home page if inside login page (or login page disabled)
    if (!login || route.path === login.split("?")[0]) {
      return redirect("/");
    }
  } else {
    // Redirect to login page if not authorized and not inside callback page
    // (Those passing `callback` at runtime need to mark their callback component
    // with `auth: false` to avoid an unnecessary redirect from callback to login)
    if (!callback || route.path !== callback.split("?")[0]) {
      redirect(`/login?${encodeQuery({ redirectTo: route.fullPath })}`);
    }
  }
};

/**
 * NOTES:
 * For some reason when I try to import functions with the same name below from
 * @nuxtjs/auth/lib/core/utilities, it will throw an "Unexpected token export" error.
 * The functions below are just copies of the functions of the same name in that file.
 */

/**
 * Checks to see if a given route has a specified option and is equal to a specified value
 * @see @nuxtjs/auth/lib/core/utilities routeOption function
 * @param {object} route Context's route
 * @param {string} key Route option's key
 * @param {*} value Route option's value
 */
const routeOption = (route, key, value) => {
  return route.matched.some(m => {
    if (process.client) {
      // Client
      return Object.values(m.components).some(
        component => component.options && component.options[key] === value
      );
    } else {
      // SSR
      return Object.values(m.components).some(component =>
        Object.values(component._Ctor).some(
          ctor => ctor.options && ctor.options[key] === value
        )
      );
    }
  });
};

/**
 * @see @nuxtjs/auth/lib/core/utilities encodeQuery function
 * @param {object} queryObject object representation of a query string
 */
const encodeQuery = queryObject => {
  return Object.entries(queryObject)
    .filter(([key, value]) => typeof value !== "undefined")
    .map(
      ([key, value]) =>
        encodeURIComponent(key) +
        (value != null ? "=" + encodeURIComponent(value) : "")
    )
    .join("&");
};

/**
 * @see @nuxtjs/auth/lib/core/utilities getMatchedComponents function
 * @param {object} route Context's route
 * @param {array|bool} matches An array of matching components. Set to false to disable. Defaults to false.
 */
export const getMatchedComponents = (route, matches = false) => {
  return [].concat.apply(
    [],
    route.matched.map(function(m, index) {
      return Object.keys(m.components).map(function(key) {
        matches && matches.push(index);
        return m.components[key];
      });
    })
  );
};
