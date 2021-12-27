const StatusCodes = require('http-status-codes').StatusCodes;
const global_scope = require('../global_consts')

function messages(req, res) //get user's messages
{
    const user_messages = global_scope.messages_list.get_messages(parseInt(req.user_data['id']))
    res.status(StatusCodes.OK)
    res.send(JSON.stringify(user_messages))
}

function send_message(req, res) //user or admin to user
{
    const sender_id = parseInt(req.user_data['id'])
    const receiver_id = parseInt(req.params.receiver_id);

    if(receiver_id === 1)
    {
        res.status( StatusCodes.UNAUTHORIZED )
		res.send("Cannot message admin.")
		return;
    }

     receiver_user = global_scope.users_list.get_index(receiver_id)
    
    if(receiver_user === -1)
    {
        res.status( StatusCodes.FORBIDDEN );
		res.send( "receiver id doesn't exist")
		return;
    }

    const message = req.body.message;
    let sender_name = ""
    //message from admin
    if(sender_id === 1)
    {
        sender_name = "Admin"
    }
    else
    {
        sender_name = global_scope.users_list.get_user_name(sender_id)
    }

    new_message = global_scope.messages_list.add_message("Message from " + sender_name + ": " + message, sender_id, receiver_id)
    res.status(StatusCodes.OK)
	res.send(JSON.stringify(new_message))
}

function message_all_users(req, res) //admin to all users
{   
    if(req.user_data['id'] != '1')
    {
        res.status( StatusCodes.UNAUTHORIZED )
		res.send("Only admin can send message to all users.")
		return;
    }
    
    const message = req.body.message;
    const users_list = global_scope.users_list.get_list()
    let new_message = []

    users_list.forEach( user => { 
        if(user.id != 1)
            new_message.push(global_scope.messages_list.add_message("Message from Admin: " + message, 1, user.id))
        })

    res.status(StatusCodes.OK)
    res.send(JSON.stringify(new_message))
}

module.exports = {messages, send_message, message_all_users}