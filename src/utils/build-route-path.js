export function buildRoutePath(path){
  const routeParametersRegex = /:([a-zA-Z]+)/g
  const pathParametersRegex = path.replace(routeParametersRegex,'(?<id>[a-z0-9\-_]+)')

 const pathRegex = new RegExp(`^${pathParametersRegex}(?<query>\\?(.*))?$`)

 return pathRegex;
}