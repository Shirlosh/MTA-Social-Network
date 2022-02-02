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
		this.get_posts = this.get_posts.bind(this)
		this.state = {
            posts: [],
            new_posts_indicator: false,
            new_messages_indicator: false
        }
	}

	async componentDidMount() 
	{
        setInterval(() => {
            const posts = this.fetch_posts();
            if(this.state.posts.length < posts.length)
                this.setState({new_posts_indicator: true}) //set alert
            console.log("posts check")
        }, 30000)
        this.get_posts()
	}

    async get_posts()
    {
        const posts = await this.fetch_posts();
		this.update_posts(posts);
    }

	async fetch_posts()
	{
		const response = await fetch('/posts');
		if ( response.status != 200 )
		  throw new Error( 'Error while fetching posts');
		const data = await response.json();
        await console.log("posts:", data)
		return data;
	}

	async handle_delete( id )
	{
		const response = await fetch('/post/' + id , {method:'DELETE'});
		if ( response.status == 200 )
		{
            this.get_posts();
		}
		else 
		{
		  const err = await response.text();
		  alert( err );
		}
	}


	update_posts( posts )
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
            this.get_posts();
		}
		else 
		{
		  const err = await response.text();
		  alert( err );
		}
        /*
        .then(result => result.json())
			.then(response => {

            console.log("response:", response)
			if(response.statusCode === 200 || response.){
                this.get_posts()
			}
			else{
				alert(response.message)
			}

		})
        */
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
                                <label for="exampleFormControlTextarea1">Upload new Post:</label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                <MySubmitButton text={'Upload Post'}/>
                            </div>
                        </form>
                        <hr/>
                        
                        <MyButton onClick={() => this.get_posts()} text={'Get New Posts'}/>
                        <h1>Posts</h1>
                        <Posts 
                            posts={this.state.posts}
                            handle_delete={this.handle_delete}  
                        />
                    </div>
			   </div>
	}
}
