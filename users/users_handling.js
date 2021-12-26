const StatusCodes = require('http-status-codes').StatusCodes;
const global_scope = require('../global_consts')
const Status = require('./status')
const jwt = require('jsonwebtoken')


function check_active_user(id)
{
    if(id === '1') return true

    const status = global_scope.users_list.get_user_status(id)
    if(status === null)
    {
        return false
    }
    else
    {
        if(status == Status.active) return true
        else return false
    }
}


function check_id(id, res, allow_admin=false)
{
	if (allow_admin === false && id === 1)
	{
		res.status(StatusCodes.FORBIDDEN);
		res.send("can't modify or delete root user")
		return null;
	}

	const idx = global_scope.users_list.get_index(id)
	if (idx === - 1)
	{
		res.status(StatusCodes.NOT_FOUND);
		res.send("id doesn't exist")
		return null;
	}

	let lst = global_scope.users_list.get_list()
	if(lst[idx].status == Status.suspended)
	{
		res.status(StatusCodes.FORBIDDEN);
		res.send("cannot login, this user has been suspended")
		return null;
	}

	return 1;
}

function list_users(req, res) 
{
	res.send(JSON.stringify(global_scope.users_list.get_list()))
}

function delete_user(req, res)
{
	const id = parseInt(req.params.id);

	if(req.user_data['id'] != '1')
	{
		res.status(StatusCodes.FORBIDDEN); // Forbidden
		res.send("only root user can delete users")
		return
	}

	if (id == 1)
	{
		res.status(StatusCodes.FORBIDDEN); // Forbidden
		res.send("Can't delete root user")
		return	
	}
	
	else if(check_id(id,res))
	{
		global_scope.users_list.delete_user(id)
		res.send(JSON.stringify({}))
	}
}

function create_user(req, res)
{
	const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

	if (!name)
	{
		res.status( StatusCodes.BAD_REQUEST );
		res.send( "Missing name in request")
		return;
	}
    if(!valid_mail(email))
	{
		res.status( StatusCodes.BAD_REQUEST );
		res.send( "request email is invalid")
		return;
	}
	if(!password)
	{
		res.status( StatusCodes.BAD_REQUEST );
		res.send( "Missing password in request")
		return;
	}

	new_user = global_scope.users_list.add_user(name,email,password)
	res.send(JSON.stringify(new_user));   
}

function update_user_status(req, res, new_status)
{
	if(req.user_data['id'] != '1')
	{
		res.status(StatusCodes.FORBIDDEN); // Forbidden
		res.send("only root user can change users status")
		return
	}

	const id = parseInt(req.params.id);

	if(check_id(id,res))
	{
		user = global_scope.users_list.update_status(id, new_status)
		res.send(JSON.stringify({user}))
	}	
}

function approve_user(req, res)
{
	update_user_status(req, res, Status.active)
}

function suspend_user(req, res)
{
	update_user_status(req, res, Status.suspended)
}

function restore_suspended_user(req, res)
{
	update_user_status(req, res, Status.active)
}

function valid_mail(email)
{
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

module.exports = {check_active_user, check_id, list_users, create_user, delete_user, approve_user, suspend_user, restore_suspended_user}