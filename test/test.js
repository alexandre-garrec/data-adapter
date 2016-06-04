import data from '../demo/data'
import Adapter, {register} from '../src/adapter'
import { expect } from 'chai'

describe('adapter test', function () {
  
  it('should return list of users', function () {
    
    register((user) => ({
      id: user.id,
      username: user.name,
      _contain: 'comments:comment'
    }), 'user')
    
    const state = Adapter(data, 'user')
    
    expect(state).to.eql({ 
      user: [ 
        { id: 1, username: 'toto' },
        { id: 2, username: 'tata' } 
      ]
    })
    
  })
  
  it('should return list of users and comments', function () {
    
    register((comment, user) => ({
      id: comment.id,
      userId: user.id,
      text: comment.content
    }), 'comment')

    const state = Adapter(data, 'user')

    expect(state).to.eql({ 
      user: [ 
        { id: 1, username: 'toto' },
        { id: 2, username: 'tata' } 
      ],
      comment: [
        { id: 31, userId: 1, text: 'lorem ipsum elms' },
        { id: 39, userId: 1, text: 'dare ipsum remu' },
        { id: 34, userId: 2, text: 'lorem ipsum elms' },
        { id: 32, userId: 2, text: 'dare ipsum remu' }
      ]
    })
    
  })
})