const StatusCodes = require('http-status-codes').StatusCodes;
const global_scope = require('../global_consts')
const {check_active_user} = require('../users/users_handling')

function list_posts(req, res) //view all posts
{
    res.send(JSON.stringify(global_scope.posts_list.get_list()))
}

function publish_post(req, res)
{
    if( !check_active_user(req.user_data['id']) )
    {
        res.status( StatusCodes.BAD_REQUEST )
		res.send( "you are not active user yet, please wait for root activation")
		return;
    }

    const post = req.body.post;

    if(req.user_data)
	{
        new_post = global_scope.posts_list.add_post(post,req.user_data['id'])
        res.status( StatusCodes.OK );
		res.send(JSON.stringify(new_post))
		return
	}
}

function delete_post(req, res)
{
    const id = parseInt(req.params.id);
    creator_id = global_scope.posts_list.get_creator_id(id)
    
    if(creator_id == null)
    {
        res.status( StatusCodes.FORBIDDEN );
		res.send( "this post id doesn't exist")
		return;
    }

    if(creator_id == req.user_data['id'] || req.user_data['id'] == '1' )
    {
        global_scope.posts_list.delete_post(id)
        res.send( "the post deleted successfully")
        return
    }

    else 
    {
        res.status(StatusCodes.FORBIDDEN); // Forbidden
		res.send("only the creator or root user can delete this post")
		return	
    }
}

module.exports = {list_posts, publish_post, delete_post}