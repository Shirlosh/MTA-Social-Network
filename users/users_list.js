const { update_json_file } = require("../data/json_file_handling")
const Status = require("./status")
const bcrypt = require('bcrypt')
const User = require("./user")
const gi = require('../generate_id')

const json_users = 'data/users.json'

class UsersList {
    constructor(json)
    {
        if(json != null)
        {
            json.forEach(data => {
            if(data.id != 1)
                this.users_array.push(new User(data.name, data.id ,data.email, data.password, data.status, data.creation_date))});
        }
        else update_json_file(this.users_array,json_users)
    }

    users_array = [ {id:1, name: 'Root', password: hash('123456')} ];

    add_user(name, email, password)
    {
        const new_user = new User(name,gi.create_unique_id(this.users_array),email,hash(password),Status.created,new Date(Date.now()).toDateString())
        this.users_array.push(new_user)
        update_json_file(this.users_array,json_users)
        return new_user
    }

    get_index(id)
    {
        return this.users_array.findIndex(user => user.id == id)
    }

    get_user_name(id)
    {
        const user_index = this.get_index(id)
        if(user_index !== -1)
        {
            return this.users_array[user_index].name
        }
        else
        {
            return "Deleted User"
        }
    }

    delete_user(id)
    {
        let index = this.get_index(id)
        if (index === -1 ) return -1
	
	    this.users_array.splice(index, 1)
        update_json_file(this.users_array,json_users)
        return 0;
    }

    get_list()
    {
        return this.users_array
    }

    update_status(id, new_status)
    {
        let index = this.get_index(id)
        if (index === -1 ) return -1

        const user = this.users_array[index]
	    user.status = new_status;
	    update_json_file(this.users_array,json_users)
        return user;
    }

    login_authentication(id,password)
    {
        const user = this.users_array[this.get_index(id)]
        let res = false
        if(user)
            res = compare_pass(password, user.password)

        return res
    }

    get_user_status(id)
    {
        const index = this.get_index(id)
        if(index > 0)
            return this.users_array[index].status

        else return null
    }
}


function hash(password)
{
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    return hash
}

//get id saved password hash and comparewith the given password
function compare_pass(password, hash)
{
    return bcrypt.compareSync(password, hash);
}

module.exports = UsersList