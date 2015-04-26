import LRU from 'lru-cache'
import assign from 'object-assign'
import axios from 'axios'

function cache(options = {}) {
  return function (Store) {
    const cache = LRU(assign({
      length: (n) => {
        return unescape(encodeURIComponent(JSON.stringify(n))).length
      },
      max: 2e6,
      maxAge: 1000 * 60 * 60
    }, options))

    const inFlightRequests = {}

    class CacheStore extends Store {
      constructor(...args) {
        super(...args)

        this.exportPublicMethods({
          cacheValue(key, value) {
            cache.set(key, value)
            return value
          },

          source(config) {
            const { key, ...remote } = config
            const id = JSON.stringify(config)
            const cacheKey = key || id

            if (inFlightRequests[id]) {
              return inFlightRequests[id]
            }

            return new Promise((resolve, reject) => {
              const value = cache.has(cacheKey)
                ? cache.get(cacheKey)
                : undefined

              if (value === undefined) {
                inFlightRequests[id] = axios(remote)
                inFlightRequests[id].then(resolve).catch(reject)
              } else {
                resolve(value)
              }
            }).then(value => {
              delete inFlightRequests[id]
              return this.cacheValue(cacheKey, value)
            })
          },

          getCache() {
            return cache
          }
        })
      }
    }

    return CacheStore
  }
}

export default cache
