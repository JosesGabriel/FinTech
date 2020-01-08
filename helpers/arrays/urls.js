export function IsInArray(urls, url) {
  let isFound;

  for (let index = 0; index < urls.length; index++) {
    if (url.includes(urls[index])) {
      isFound = true;
      break;
    }
  }

  if (!isFound) {
    return false;
  }

  return true;
}
