/**
 * Middleware for protected routes redirection
 *
 * @return
 */
export default function ({ store, redirect, route, app: { $auth } }) {
    /**
     *  List of protected routes
     */
    let protectedRoutes = [
      'login',
      'logout'
    ]

    if ($auth.loggedIn && protectedRoutes.includes(route.name)){
      return redirect('/')
    }
  }