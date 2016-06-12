import data, { post } from './data'
import Adapter, { ArrayOf, InstanceOf, Model } from '../src/adapter'

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

const Post = new Model('posts', (post) => ({
  id: post.id,
  user: new InstanceOf(User, post.author),
  text: post.content
}))

console.log(Adapter(data, User))
console.log('-----------------------------------')
console.log(Adapter(post, Post))
