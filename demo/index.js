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

const test = 'test'

console.log(test.name)

console.log(Adapter(data, 'user'))