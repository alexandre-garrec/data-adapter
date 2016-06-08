/**
 * Params
 * type: string
 * data: array
 */
class ArrayOf {
  
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

export default ArrayOf
