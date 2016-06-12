/**
 * Params
 * type: string
 * data: array
 */

class Of {
  constructor(type, data) {
    this.type = type
    this.data = data
  }
  getType () {
    return this.type
  }
}

export class InstanceOf extends Of {
  getData () {
    return [this.data]
  }
  getConvertData () {
    return this.data[this.type.getId()]
  }
}
export class ArrayOf extends Of {
  getData () {
    return this.data
  }
  getConvertData () {
    return this.data.map(d => d[this.type.getId()])
  }
}
