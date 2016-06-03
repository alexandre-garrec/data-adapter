import data from './data'
import Adapter, { register } from '../src/adapter'

const User = register((user) => ({
  id: user.id,
  username: user.name,
  _contain: 'comments:comment'
}), 'user')


const Comment = register((comment, user) => ({
  id: comment.id,
  userId: user.id,
  text: comment.content
}), 'comment')


console.log(Adapter('user', data))