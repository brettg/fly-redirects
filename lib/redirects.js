
export const redirects = (redirectConfig, fetch) => {
  const { requireHTTPS, canonicalHostname, paths } =  redirectConfig

  return async (req, init) => {
    const url =  new URL(req.url)
    let redirectNeeded = false

    if (requireHTTPS && url.protocol !== 'https:') {
      redirectNeeded = true
      url.protocol = 'https'
      url.port = '443'
    }

    if (canonicalHostname && url.hostname != canonicalHostname) {
      redirectNeeded = true
      url.hostname = canonicalHostname
    }

    if (paths) {
      const newPath = paths[url.pathname]
      if (newPath) {
        redirectNeeded = true
        url.pathname = newPath
      }
    }
    if (redirectNeeded) {
      return new Response(
        'Redirecting',
        {
          status: 301,
          headers: { 'Location': url.toString() }
        }
      )
    } else if (fetch) {
      return await fetch(req, init)
    }
  }
}
