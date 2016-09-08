/**
 * Params
 * type : string
 * data : function
 * id   : string (optional)
 */
class Model {
  
  constructor(type, converter, id = 'id') {
    this.type = type
    this.converter = converter
    this.id = id
  }
  
  getId () {
    return this.id
  }
  
  getType () {
    return this.type
  }
  
  getConverter () {
    return this.converter
  }
  
}

export default Model
