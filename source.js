import axios from 'axios'

const inFlightRequests = {}

function source(config) {
  const id = JSON.stringify(config)

  if (inFlightRequests[id]) {
    return inFlightRequests[id]
  }

  return new Promise((resolve, reject) => {
    inFlightRequests[id] = axios(config)
    inFlightRequests[id].then(resolve).catch(reject)
  }).then(value => {
    delete inFlightRequests[id]
    return value
  }).catch(error => {
    delete inFlightRequests[id]
    return error
  })
}

export default source
