const max_num_of_messages = 20

class AdminPage extends React.Component 
{
	constructor(props) 
	{
		super(props);
		this.handle_new_post = this.handle_new_message.bind(this)
		this.get_posts = this.get_users.bind(this)
		this.state = {
            users: [],
            new_posts_indicator: false,
            new_messages_indicator: false
        }
	}

	async componentDidMount() 
	{
        if (gate() == false)
        {
            alert("invalid access you are about to redirect");
            window.location.replace('/home/');
        }
        setInterval(() => {
            this.get_users();
        }, 1000)
        this.get_users()
	}

    async get_users()
    {
        const users = await this.fetch_users();
		this.update_users(users);
    }

	async fetch_users()
	{
		const response = await fetch('/api/users');
		if ( response.status != 200 )
		  throw new Error( 'Error while fetching messages');
		const data = await response.json();
		return data;
	}


	update_users( users )
	{
		this.setState( {users : users} );
	}

    async handle_new_message(event)
    {
        event.preventDefault()
        const message_text = event.target[0].value

        const response = await fetch('/api/message_users',{
			headers: {
            	'Content-Type':'application/json',
        	},
			method:'POST',
			body: JSON.stringify({message:message_text }),
		});
        if ( response.status == 200 )
		{
            alert("Messaged all users");
		}
		else 
		{
		  const err = await response.text();
		  alert( err );
		}
    }

	render() {
		return <div style={{fontFamily: 'calibri light', fontSize: '2rem'}}>
                    <NavBar/>
                    <div className='container'>
                        <h1>Users</h1>
                        <Users users={this.state.users}/>
                        <MyButton onClick={() => this.get_users()} text={'update users list'}/>
                        <br/><hr/><br/>
                            <form onSubmit={this.handle_new_message}>
                                <div class="form-group">
                                    <label for="exampleFormControlTextarea1">Send message to all users:</label>
                                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                    <MySubmitButton text={'send'}/>
                                </div>
                            </form>
                    </div>
			   </div>
	}
}

class User extends React.Component 
{
	constructor(props) {
		super(props);
	}

	render() {
        const user = this.props.user

		return 	<div style={{fontSize: '1.5rem'}} className='UserItem'  data-id={user.id}>
					<span><i onClick={this.handle_click} className='fa fa-times transparent'></i></span>                   
                    {' '}<span>id {user.id}: <strong>{user.message}</strong> {user.name} <Status user = {user} /> </span>
                    <span style={{fontSize: '1rem'}}>{user.sent_date}</span>
				</div>
	}
}

class Users extends React.Component
{
    constructor(props){
        super(props);
    }

    render() {
        return <div>
                    {this.props.users.map( (user,index) => 
                    { if(user.id != 1)
                        return <User
                                    user ={user}  
                                    key={index}
                                />  
                    })}
                </div>
         }
}


class Status extends React.Component
{
    constructor(props){
        super(props);
        this.state = { value: props.user.status }
        this.handle_change = this.handle_change.bind( this );
    }

    async handle_change(event) {

        let response
        let id = this.props.user.id

        if (event.target.value == "Active")
        {
            if(this.props.user.status == "Created")
                response = await fetch('/api/approve_user/' + id , {method:'PUT'});
            else if(this.props.user.status == "Suspended")
                response = await fetch('/api/restore_user/' + id , {method:'PUT'})
        }
        
        else if (event.target.value == "Suspended")
            response = await fetch('/api/suspend_user/' + id , {method:'PUT'})

        else if(event.target.value == "Deleted")
            response = await fetch('/api/user/' + id , {method:'DELETE'});

        if ( response.status == 200 )
		{
            alert("Status updated");
		}
		else 
		{
		  const err = await response.text();
		  alert( err );
		}
    }

    render() {
        return <select id="status" onChange={this.handle_change} value={this.props.user.status}>
                        <option value="Created" disabled>Created</option>
                        <option value="Active">Active</option>
                        <option value="Suspended">Suspended</option>
                        <option value="Deleted">Delete</option>
                </select>
    }
    
}