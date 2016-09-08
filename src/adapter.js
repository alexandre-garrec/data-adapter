import { ArrayOf , InstanceOf } from './class'
import Model from './model'
import { isObj, mapObject, associativeTable } from './utils'


const adapter = (data = [], model, memo = {}, parent = false) => {
  const _type = model.getType()
  
  const list = associativeTable(data, (current) => {
    const element = model.getConverter()(current, parent)
    return {
      key: element[model.getId()],
      data: mapObject(element, (value) => {
        if(value instanceof ArrayOf || value instanceof InstanceOf) {
          adapter(value.getData(), value.getType(), memo, current)
          value = value.getConvertData()
        }
        return value
      })
    }
  })
  
  if(isObj(memo[_type])) Object.assign(memo[_type], list)
  else memo[_type] = list
  
  return memo
}

export {
  adapter as default,
  ArrayOf,
  InstanceOf,
  Model
}
