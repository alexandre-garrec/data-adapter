import ArrayOf from './arrayOf'
import Model from './model'
import { isObj, mapObject } from './utils'


const adapter = (data = [], model, memo = {}, parent = false) => {
  const _type = model.getType()
  
  const list = data.reduce((previous, current) => {
    const element = model.getConverter()(current, parent)
    
    previous[element.id] = mapObject(element, (value) => {
      if(value instanceof ArrayOf) {
        adapter(value.getData(), value.getType(), memo, current)
        value = value.data.map(d => d.id)
      }
      return value
    })
    
    return previous
  }, {})
    
  
  if(isObj(memo[_type])) Object.assign(memo[_type], list)
  else memo[_type] = list
  
  return memo
}

export {
  adapter as default,
  ArrayOf,
  Model
}
