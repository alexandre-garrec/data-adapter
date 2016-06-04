import data from './data'
import Adapter, { register } from '../src/adapter'

register((user) => ({
  id: user.id,
  username: user.name,
  _contain: 'comments:comment'
}), 'user')


register((comment, user) => ({
  id: comment.id,
  userId: user.id,
  text: comment.content
}), 'comment')

console.log(Adapter(data, 'user'))

/**
 * { user: [ { id: 1, username: 'toto' }, { id: 2, username: 'tata' } ],
 *  comment: 
 *   [ { id: 31, userId: 1, text: 'lorem ipsum elms' },
 *     { id: 39, userId: 1, text: 'dare ipsum remu' },
 *     { id: 34, userId: 2, text: 'lorem ipsum elms' },
 *     { id: 32, userId: 2, text: 'dare ipsum remu' } ] }
 */