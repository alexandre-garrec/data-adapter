import data from './data'
import Parser, { register } from '../src/parser'

const User = register((user) => ({
  id: user.id,
  username: user.name,
  _contain: 'comments:comment'
}), 'user')

const Comment = register((comment, post) => ({
  id: comment.id,
  postId: post.id,
  text: comment.content
}), 'comment')


console.log(Parser('user', data))