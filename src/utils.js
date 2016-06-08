export const isObj = obj => typeof obj === 'object'

export const mapObject = (obj, funct) => (
  Object.keys(obj).reduce((previous, key) => {
    previous[key] = funct(obj[key], key)
    return previous
  }, {})
)
