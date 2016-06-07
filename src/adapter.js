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
    const items = data.map((item) => {
     
      let temp = model.getConverter()(item, parent)
      Object.keys(temp).forEach(key => {
        const obj = temp[key]
        if(obj instanceof ArrayOf) {
          adapter(obj.getData(), obj.getType(), memo, item)
          temp[key] = obj.data.map(d => d.id)
        }
      })
      
      return temp
      
    })
    
    const _type = model.getType()
    
    memo[_type] = Array.isArray(memo[_type])
      ? memo[_type] = memo[_type].concat(items)
      : items
  }
  return memo
}

export default adapter
