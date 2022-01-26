const express = require('express')
const package = require('./package.json');
const cookieParser = require('cookie-parser');
const UsersHandling = require('./users/users_handling');
const PostsHandling = require('./posts/posts_handling');
const MessagesHandling = require('./messages/messages_handling');
const LoginHandling = require('./login_handling')
const path = require('path');

const app = express()
let  port = 2718;
const reExt = /\.([a-z]+)/i;

// General app settings
// const set_content_type = function (req, res, next) 
// {
// 	res.setHeader("Content-Type", "application/json; charset=utf-8");
// 	next()
// }
function content_type_from_extension( url)
{
	const m = url.match( reExt );
	if ( !m ) return 'application/json'
	const ext = m[1].toLowerCase();

	switch( ext )
	{
		case 'js': return 'text/javascript';
		case 'css': return 'text/css';
		case 'html': return 'text/html';
	}

	return 'text/plain'
}

const set_content_type = function (req, res, next) 
{
	const content_type = req.baseUrl == '/api' ? "application/json; charset=utf-8" : content_type_from_extension( req.url)
	res.setHeader("Content-Type", content_type);
	next()
}
app.use( set_content_type );
app.use(express.json());  // to support JSON-encoded bodies
app.use(express.urlencoded( // to support URL-encoded bodies
{  
  extended: true
}));

// Version 
function get_version(req, res) 
{
	const version_obj = { version: package.version, description: package.description };
	res.send(JSON.stringify(version_obj));   
}


// Routing
const router = express.Router();

router.get('/version', (req, res) => {get_version(req, res)})
router.post('/login', (req, res) => {LoginHandling.login(req,res)}) 
router.post('/logout', (req, res) => {LoginHandling.token_checker(req, res, LoginHandling.logout)})

router.get('/users', (req, res) => {LoginHandling.token_checker(req,res, UsersHandling.list_users)}) 
router.put('/approve_user/(:id)', (req, res) => {LoginHandling.token_checker(req, res, UsersHandling.approve_user)}) 
router.put('/suspend_user/(:id)', (req, res) => {LoginHandling.token_checker(req, res, UsersHandling.suspend_user)})
router.delete('/user/(:id)', (req, res) => {LoginHandling.token_checker(req,res, UsersHandling.delete_user)}) 
router.put('/restore_user/(:id)', (req, res) => {LoginHandling.token_checker(req, res, UsersHandling.restore_suspended_user)})
router.post('/user', (req, res) => {UsersHandling.create_user(req, res)}) 


router.get('/posts', (req, res) => {LoginHandling.token_checker(req,res,PostsHandling.list_posts)})
router.post('/post', (req, res) => {LoginHandling.token_checker(req,res,PostsHandling.publish_post)})
router.delete('/post/(:id)', (req, res) => {LoginHandling.token_checker(req,res,PostsHandling.delete_post)})


router.get('/messages', (req, res) => {LoginHandling.token_checker(req,res,MessagesHandling.messages)}) // fetch user's messages
router.post('/send_message/:receiver_id', (req, res) => {LoginHandling.token_checker(req,res,MessagesHandling.send_message)}) // from user to user
router.post('/message_users', (req, res) => {LoginHandling.token_checker(req,res,MessagesHandling.message_all_users)})

app.use('/',router)
//app.use(cookieParser())
//app.use(LoginHandling.token_checker)

app.use(express.static(path.join(__dirname, 'pages'))); //added
app.use('/api',router) //added

// Init 
let msg = `${package.description} listening at port ${port}`
app.listen(port, () => { console.log( msg ) ; })