/**
 * Formats the query string parameters ready to be appended to the URI.
 *
 * @param   {Object}  args  parameters
 *
 * @return  {String}        query string params
 */
export function BuildQueryParams(args) {
  let bld = [];
  let params = "";
  if (args != undefined) {
    for (const [key, value] of Object.entries(args)) {
      bld.push(`${key}=${value}`);
    }
    params = bld.join("&");
  }
  return params;
}
