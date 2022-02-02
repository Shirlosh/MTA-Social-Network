//TODO:
// order posts newest to oldest, first posts is my posts
// Admin page - distinguish between user and admin somehow (admin can do more things)
// indicator for messages
// id user, delete your posts


const max_num_of_posts = 20

class Post extends React.Component 
{
	constructor(props) {
		super(props);
		this.handle_click = this.handle_click.bind( this );
	}

	handle_click()
	{
		if ( this.props.handle_delete )
		  this.props.handle_delete( this.props.post.id );
	}

	render() {
        const post = this.props.post

		return 	<div style={{fontSize: '1.5rem'}} className='UserItem'  data-id={post.id}>
					<span><i onClick={this.handle_click} className='fa fa-times transparent'></i></span>
					
                    <button style={{fontSize: '0.75rem'}} onClick={this.handle_click} type="button" class="btn-close" aria-label="Close"></button>
                    {' '}<span>From {post.creator_id}: <strong>{post.text}</strong> | </span>
                    <span style={{fontSize: '1rem'}}>{post.creation_date}</span>
				</div>
	}
}

class Posts extends React.Component
{
    constructor(props){
        super(props);
    }

    render() {
        return <div>
                    {this.props.posts.map( (post,index) => 
                    { if(max_num_of_posts >= index + 1)
                        return <Post
                                    handle_delete={this.props.handle_delete}
                                    post={post}  
                                    key={index}
                                />  
                    })}
                </div>
         }
}


class HomePage extends React.Component 
{
	constructor(props) 
	{
		super(props);
		this.handle_delete = this.handle_delete.bind( this );
		this.handle_new_post = this.handle_new_post.bind(this)
		this.get_posts = this.get_messages.bind(this)
		this.state = {
            posts: [],
            new_posts_indicator: false,
            new_messages_indicator: false
        }
	}

	async componentDidMount() 
	{
        setInterval(() => {
            const messages = this.fetch_messages();
            if(this.state.posts.length < messages.length)
                this.setState({new_posts_indicator: true}) //set alert
            console.log("messages check")
        }, 30000)
        this.get_messages()
	}

    async get_messages()
    {
        const messages = await this.fetch_messages();
		this.update_messages(messages);
    }

	async fetch_messages()
	{
		const response = await fetch('/messages');
		if ( response.status != 200 )
		  throw new Error( 'Error while fetching messages');
		const data = await response.json();
        await console.log("messages:", data)
		return data;
	}

	async handle_delete( id )
	{
		const response = await fetch('/post/' + id , {method:'DELETE'});
		if ( response.status == 200 )
		{
            this.get_messages();
		}
		else 
		{
		  const err = await response.text();
		  alert( err );
		}
	}


	update_messages( posts )
	{
		this.setState( {posts : posts} );
	}

    async handle_new_post(event)
    {
        event.preventDefault()
        const post_text = event.target[0].value
        
        const response = await fetch('/post',{
			headers: {
            	'Content-Type':'application/json',
        	},
			method:'POST',
			body: JSON.stringify({post:post_text }),
		});
        if ( response.status == 200 )
		{
            this.get_messages();
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
                    <MyAlert 
                        show={this.state.new_posts_indicator}
                        onHide={() => this.setState({new_posts_indicator: false})}
                        text={'You have New Posts'}
                    />
                    <MyAlert 
                        show={this.state.new_messages_indicator}
                        onHide={() => this.setState({new_messages_indicator: false})}
                        text={'You have New Messages'}
                    />
                    <br/>
                    <div className='container'>
                        <form onSubmit={this.handle_new_post}>
                            <div class="form-group">
                                <label for="exampleFormControlTextarea1">Send new message:</label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                <MySubmitButton text={'message sent'}/>
                            </div>
                        </form>
                        <hr/>
                        
                        <MyButton onClick={() => this.get_messages()} text={'Check for new message'}/>
                        <h1>Posts</h1>
                        <Posts 
                            posts={this.state.posts}
                            handle_delete={this.handle_delete}  
                        />
                    </div>
			   </div>
	}
}
class MyAlert extends React.Component {
	constructor(props) {
	  super(props);
	}
  
	render() {
			return  <div>
                {this.props.show? 
                <div style={{fontSize: '1.5rem'}} class="alert alert-primary" role="alert">
                    <button onClick={this.props.onHide} style={{fontSize: '1rem'}} type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    {' '}{this.props.text}
                </div>
            : null}

            </div>
	}
}


class MyButton extends React.Component {
	constructor(props) {
	  super(props);
	}
  
	render() {
			return <div>
                        <button onClick={this.props.onClick} type={this.props.type} className="btn btn-primary">{this.props.text}</button>
                    </div>
	}
}

class MySubmitButton extends React.Component {
	constructor(props) {
	  super(props);
	}
  
	render() {
			return <div style={{textAlign: 'center'}}>
                        <button type='submit' className="btn btn-primary">{this.props.text}</button>
                    </div>
	}
}

class NavBar extends React.Component {
	constructor(props) {
	  super(props);
	}

	async handle_logout(){
		const response = await fetch('/logout',{
			headers: {
            	'Content-Type':'application/json',
            	'Accept':'application/json'
        	},
			method:'POST',
		})
		console.log(response)
		if(response.status == 200){
			console.log("sucesss")
			window.location.replace('/login/index.html');
		}
		else{
			alert(response.message)
		}
	}

	handle_home()
	{
		window.location.replace('/home/index.html');
	}
	handle_messages()
	{
		window.location.replace('/messages/index.html');
	}
	handle_about()
	{
		window.location.replace('/about/index.html');
	}
  
	render() {
			return <div style={{backgroundColor: '#F5F5F5', padding: '0.5rem'}}><div class="btn-group btn-group-lg" role="group" aria-label="Basic outlined example">
            <button onClick={this.handle_home} type="button" class="btn btn-outline-dark">Home</button>
            <button onClick={this.handle_messages} type="button" class="btn btn-outline-dark">Messages</button>
            <button onClick={this.handle_logout} type="button" class="btn btn-outline-dark">Logout</button>
            <button onClick={this.handle_about} type="button" class="btn btn-outline-dark">About</button>
        </div>
        </div>
	}
}
  