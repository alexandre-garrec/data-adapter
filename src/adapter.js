import invariant from 'invariant'

export class Model {
  constructor(type, converter) {
    this.type = type
    this.converter = converter
  }
  getType () {
    return this.type
  }
  
  getConverter () {
    return this.converter
  }
}

export class ArrayOf {
  constructor(type, data) {
    this.type = type
    this.data = data
  }
  
  getType () {
    return this.type
  }
  
  getData () {
    return this.data
  }
}

const adapter = (data = [], model, memo = {}, parent = false) => {
  if (model.getType()) {
      const items = data.reduce((previous, current) => {
        let temp = model.getConverter()(current, parent)
        
        previous[temp.id] = Object.keys(temp).reduce((p, key) => {
          const value = temp[key]
          if(value instanceof ArrayOf) {
            adapter(value.getData(), value.getType(), memo, current)
            p[key] = value.data.map(d => d.id)
          }
          else p[key] = value
          
          return p
        }, {})
        return previous
      }, {})
      
    const _type = model.getType()
    if(isObj(memo[_type])) Object.assign( memo[_type],  items)
    else memo[_type] = items
  }
  return memo
}

const isObj = obj => typeof obj === 'object'

export default adapter
