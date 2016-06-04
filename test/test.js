import data from '../demo/data'
import Adapter, {register} from '../src/adapter'
import { expect } from 'chai'

describe('adapter test', function () {
  it('should return', function () {
    
    register((user) => ({
      id: user.id,
      username: user.name,
    }), 'user')

    const state = Adapter(data, 'user')
    
    expect(state).to.eql({ 
      users: [ 
        { id: 1, username: 'toto' },
        { id: 2, username: 'tata' } 
      ]
    })
  })
})