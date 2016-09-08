import data from '../demo/data'
import Adapter, { Model, ArrayOf } from '../src/adapter'
import { expect } from 'chai'

describe('adapter test', function () {
  
  it('should return list of users', function () {
    
    const User = new Model('users' , (user) => ({
      id: user.id,
      username: user.name
    }))
    
    const state = Adapter(data, User)
    
    expect(state).to.eql({ 
      users: {
        1: { id: 1, username: 'toto' },
        2: { id: 2, username: 'tata' } 
      }
    })
    
  })

  it('should return list of users with custom id key', function () {
    
    const User = new Model('users' , (user) => ({
      uniq: `uniq_${user.id}`,
      username: user.name
    }), 'uniq')
    
    const state = Adapter(data, User)
    
    expect(state).to.eql({ 
      users: {
        uniq_1: { uniq: 'uniq_1', username: 'toto' },
        uniq_2: { uniq: 'uniq_2', username: 'tata' } 
      }
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
      users: {
        1: {
          id: 1,
          username: 'toto',
          comments : [31, 39] 
        },
        2: {
          id: 2,
          username: 'tata',
          comments : [34, 32] 
        } 
      },
      comments: {
        31: { 
          id: 31,
          userId: 1,
          text: 'lorem ipsum elms' 
        },
        39: { 
          id: 39,
          userId: 1,
          text: 'dare ipsum remu' 
        },
        34: { 
          id: 34,
          userId: 2,
          text: 'lorem ipsum elms' 
        },
        32: { 
          id: 32,
          userId: 2,
          text: 'dare ipsum remu' 
        }
      }
    })
    
  })
})
