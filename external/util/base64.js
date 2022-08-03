export const Base64Encode = (data =  "") => {
  return Buffer.from(data).toString('base64');
}

export const Base64Decode = (data = "") => {
  const jsonString = Buffer.from(data, 'base64').toString()
  return JSON.parse(jsonString)
}
