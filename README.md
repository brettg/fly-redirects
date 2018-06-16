# Fly Redirects

Helper method for common redirects in [Fly](https://fly.io) [Edge Applications](https://fly.io/docs/apps/).

## Usage

Install in you Fly edge app.

```
npm install -s https://github.com/initialized/fly-redirects.git
```

The redirect logic is implemented as a single wrapper method that takes config and, optionally an upstream Fly app fetch method.

Config is an object with the following keys:

- **requireHTTPS**: Set to `true` to redirect all HTTP requests to HTTPS equivalents
- **canonicalHostname**: Set to a string with the canonical hostname for the site and all requests to other domains will be redirected
- **paths**: Set to an object mapping string paths to the path they should be redirected to

### Example App

```
import redirects from 'fly-redirects'

const redirected = redirects(
  {
    requireHTTPS: true,
    canonicalHostname: 'example.com',
    paths: { '/a': '/b', '/c': '/d' }
  },
  () => new Response('No redirect needed!', { status: 200 })
)

fly.http.respondWith(redirected)
```
