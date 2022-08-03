export const CallGrpc = (client, service, data) => {
  return new Promise((resolve, reject) => {
    return client[service](data,  (error, response) => {
      if (error) {
        reject(error)
      }
      resolve(response)
    })
  })
}