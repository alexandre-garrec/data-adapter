import data from './data'
import Adapter, { ArrayOf, Model } from '../src/adapter'

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

console.log(Adapter(data, User))

/**
 * { user: [ { id: 1, username: 'toto' }, { id: 2, username: 'tata' } ],
 *  comment: 
 *   [ { id: 31, userId: 1, text: 'lorem ipsum elms' },
 *     { id: 39, userId: 1, text: 'dare ipsum remu' },
 *     { id: 34, userId: 2, text: 'lorem ipsum elms' },
 *     { id: 32, userId: 2, text: 'dare ipsum remu' } ] }
 */