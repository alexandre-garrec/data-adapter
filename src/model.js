/**
 * Params
 * type: string
 * data: function
 */
class Model {
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

export default Model
