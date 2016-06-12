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
