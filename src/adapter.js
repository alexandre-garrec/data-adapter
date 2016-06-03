import invariant from 'invariant'

/**
 * Comments
 */

// List
let model = {}

// Register model
export const register = (func, name) => {
  invariant(!model[name], `model ${name} is allready existe`);
  model[name] = func
}

// Data parser
const adapter = (type, data , memo = {}, parent = false) => {
  if (model[type]) {
    
    let _contain = false
    
    const items = data.map((item) => {
      const temp = model[type](item, parent)
      if (temp._contain) _contain = temp._contain
      delete temp._contain
      return temp
    })
    
    memo[type] = Array.isArray( memo[type])
      ? memo[type] = memo[type].concat(items)
      : items

    if (_contain) {
      const [key, name] = _contain.split(':')
      data.forEach(i => adapter(name, i[key] , memo, i))
    }
    else return memo
  }
  return memo
}

export default adapter
