export default function ({ $auth }) {
  console.log('AUTH', !$auth.loggedIn)
    if (!$auth.loggedIn) {
      return
    }
  }