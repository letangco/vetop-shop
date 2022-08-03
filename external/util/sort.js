export const getSorted = (sort) => {
  let res = {
    createdAt: -1
  }
  if (sort) {
    const s = sort.split(',')
    if (s.length > 0) {
      res = {}
      s.map(e => {
        let data = e.split(':')
        if (data.length === 2) {
          let key = data[0].trim()
          res[key] = data[1] === "asc" ? 1 : -1
        }
      })
      res["createdAt"] = -1
    }
  }
  return res
}
