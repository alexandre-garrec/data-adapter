export const isObj = obj => typeof obj === 'object'

export const mapObject = (obj, funct) => (
  Object.keys(obj).reduce((previous, key) => {
    previous[key] = funct(obj[key], key)
    return previous
  }, {})
)

export const associativeTable = (data, funct) => (
  data.reduce((previous, current, index) => {
    const { key, data } = funct(current, index)
    previous[key] = data
    return previous
  }, {})
)
