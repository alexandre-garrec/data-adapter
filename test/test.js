import data from '../demo/data'
import Adapter, { Model, ArrayOf } from '../src/adapter'
import { expect } from 'chai'

describe('adapter test', function () {
  
  it('should return list of users', function () {
    
    const User = new Model('users' , (user) => ({
      id: user.id,
      username: user.name,
    }))
    
    const state = Adapter(data, User)
    
    expect(state).to.eql({ 
      users: [ 
        { id: 1, username: 'toto' },
        { id: 2, username: 'tata' } 
      ]
    })
    
  })
  
  it('should return list of users and comments', function () {
    
    const User = new Model('users' , (user) => ({
      id: user.id,
      username: user.name,
      comments : new ArrayOf(Comment, user.comments)
    }))


    const Comment = new Model('comments', (comment, user) => ({
      id: comment.id,
      userId: user.id,
      text: comment.content
    }))

    const state = Adapter(data, User)

    expect(state).to.eql({ 
      users: [ 
        { id: 1, username: 'toto', comments : [31, 39] },
        { id: 2, username: 'tata', comments : [34, 32] } 
      ],
      comments: [
        { id: 31, userId: 1, text: 'lorem ipsum elms' },
        { id: 39, userId: 1, text: 'dare ipsum remu' },
        { id: 34, userId: 2, text: 'lorem ipsum elms' },
        { id: 32, userId: 2, text: 'dare ipsum remu' }
      ]
    })
    
  })
})