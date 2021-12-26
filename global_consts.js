const {create_json_file} = require('./data/json_file_handling')
const UsersList = require('./users/users_list')
const PostsList = require('./posts/posts_list')
const MessagesList = require('./messages/messages_list')

const json_users = 'data/users.json'
const json_messages = 'data/messages.json' 
const json_posts = 'data/posts.json'

dict = create_json_file(json_users)
const users_list = new UsersList(dict)

dict = create_json_file(json_messages)
const messages_list = new MessagesList(dict)

dict = create_json_file(json_posts)
const posts_list = new PostsList(dict)

module.exports = {users_list, posts_list, messages_list ,json_users}