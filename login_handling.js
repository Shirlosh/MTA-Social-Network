const StatusCodes = require('http-status-codes').StatusCodes;
const global_scope = require('./global_consts')
const users_handlings = require('./users/users_handling')
const Status = require('./users/status')
const jwt = require('jsonwebtoken');

function login(req, res)
{
	const id = req.body.id;
  const password = req.body.password;

  if(req.headers.cookie)
  {
    res.status(StatusCodes.BAD_REQUEST);
    res.send("Please logout before you login to another user")
    return;
  }

	const idx = global_scope.users_list.get_index(id)
	let lst = global_scope.users_list.get_list()

  if(idx == -1)
  {
    res.status( StatusCodes.BAD_REQUEST)
    res.send("this user doesnt exist")
    return;
  }

	if(lst[idx].status == Status.suspended)
	{
		res.status(StatusCodes.FORBIDDEN);
		res.send("cannot login, this user has been suspended")
		return;
	}

  if (users_handlings.check_id(id, res, allow_admin=true))
  {
    if (global_scope.users_list.login_authentication(id,password))
    {
      res.status(StatusCodes.OK);
      create_token(res,id)
      res.send("user " + id +" logged in successfully")
      return;
    }
    else
    {
      res.status( StatusCodes.BAD_REQUEST );
      res.send("Invalid Credentials")
      return;
    }
  }
}


function logout(req,res)
{
  if (req.user_data)
  {
    res.clearCookie('auth');

    res.status(StatusCodes.OK)
    res.send("user " + req.user_data['id'] + " logged out successfully")
    return;
  }

  else
  {
    res.status( StatusCodes.BAD_REQUEST );
    res.send("invalid Credentials")
    return;
  }
}

function create_token(res,id)
{
  let token = jwt.sign( {id: id} , 'secret', { expiresIn: '24h' }   );
  res.cookie('auth',token, { httpOnly : false } );
}

function token_checker(req, res, next)
{
  let token = req.headers.cookie

  if (token) {
    token = token.split('=')[1]
    jwt.verify(token, 'secret', function(err, token_data) {
      if (err) 
      {
        res.status(StatusCodes.FORBIDDEN)
        res.send('Error');
        return
      } 
      else
      {
        req.user_data = token_data;
        next(req,res);
      }
    });
  } 
  else 
  {
    res.status(StatusCodes.FORBIDDEN)
    res.send('please login before using the system');
  }
}


function is_admin(req, res)
{
    res.send(JSON.stringify(req.user_data['id'] == '1'))
}


module.exports = {login,token_checker,logout, is_admin}