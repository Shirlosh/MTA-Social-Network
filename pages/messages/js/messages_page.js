//TODO:
// order posts newest to oldest, first posts is my posts
// Admin page - distinguish between user and admin somehow (admin can do more things)
// indicator for messages
// id user, delete your posts


const max_num_of_posts = 20;

class Post extends React.Component {
	constructor(props) {
		super(props);
		this.handle_click = this.handle_click.bind(this);
	}

	handle_click() {
		if (this.props.handle_delete) this.props.handle_delete(this.props.post.id);
	}

	render() {
		const post = this.props.post;

		return React.createElement(
			'div',
			{ style: { fontSize: '1.5rem' }, className: 'UserItem', 'data-id': post.id },
			React.createElement(
				'span',
				null,
				React.createElement('i', { onClick: this.handle_click, className: 'fa fa-times transparent' })
			),
			React.createElement('button', { style: { fontSize: '0.75rem' }, onClick: this.handle_click, type: 'button', 'class': 'btn-close', 'aria-label': 'Close' }),
			' ',
			React.createElement(
				'span',
				null,
				'From ',
				post.creator_id,
				': ',
				React.createElement(
					'strong',
					null,
					post.text
				),
				' | '
			),
			React.createElement(
				'span',
				{ style: { fontSize: '1rem' } },
				post.creation_date
			)
		);
	}
}

class Posts extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return React.createElement(
			'div',
			null,
			this.props.posts.map((post, index) => {
				if (max_num_of_posts >= index + 1) return React.createElement(Post, {
					handle_delete: this.props.handle_delete,
					post: post,
					key: index
				});
			})
		);
	}
}

class HomePage extends React.Component {
	constructor(props) {
		super(props);
		this.handle_delete = this.handle_delete.bind(this);
		this.handle_new_post = this.handle_new_post.bind(this);
		this.get_posts = this.get_posts.bind(this);
		this.state = {
			posts: [],
			new_posts_indicator: false,
			new_messages_indicator: false
		};
	}

	async componentDidMount() {
		setInterval(() => {
			const posts = this.fetch_messages();
			if (this.state.posts.length < posts.length) this.setState({ new_posts_indicator: true }); //set alert
			console.log("posts check");
		}, 30000);
		this.get_posts();
	}

	async get_posts() {
		const messages = await this.fetch_messages();
		this.update_messages(messages);
	}

	async fetch_messages() {
		const response = await fetch('/messages');
		if (response.status != 200) throw new Error('Error while fetching messages');
		const data = await response.json();
		await console.log("messages:", data);
		return data;
	}

	async handle_delete(id) {
		const response = await fetch('/post/' + id, { method: 'DELETE' });
		if (response.status == 200) {
			this.get_posts();
		} else {
			const err = await response.text();
			alert(err);
		}
	}

	update_messages(posts) {
		this.setState({ posts: posts });
	}

	async handle_new_post(event) {
		event.preventDefault();
		const post_text = event.target[0].value;

		const response = await fetch('/post', {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({ post: post_text })
		});
		if (response.status == 200) {
			this.get_posts();
		} else {
			const err = await response.text();
			alert(err);
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
		return React.createElement(
			'div',
			{ style: { fontFamily: 'calibri light', fontSize: '2rem' } },
			React.createElement(NavBar, null),
			React.createElement(MyAlert, {
				show: this.state.new_posts_indicator,
				onHide: () => this.setState({ new_posts_indicator: false }),
				text: 'You have New Posts'
			}),
			React.createElement(MyAlert, {
				show: this.state.new_messages_indicator,
				onHide: () => this.setState({ new_messages_indicator: false }),
				text: 'You have New Messages'
			}),
			React.createElement('br', null),
			React.createElement(
				'div',
				{ className: 'container' },
				React.createElement(
					'form',
					{ onSubmit: this.handle_new_post },
					React.createElement(
						'div',
						{ 'class': 'form-group' },
						React.createElement(
							'label',
							{ 'for': 'exampleFormControlTextarea1' },
							'Upload new Post:'
						),
						React.createElement('textarea', { 'class': 'form-control', id: 'exampleFormControlTextarea1', rows: '3' }),
						React.createElement(MySubmitButton, { text: 'Upload Post' })
					)
				),
				React.createElement('hr', null),
				React.createElement(MyButton, { onClick: () => this.get_posts(), text: 'Get New Posts' }),
				React.createElement(
					'h1',
					null,
					'Posts'
				),
				React.createElement(Posts, {
					posts: this.state.posts,
					handle_delete: this.handle_delete
				})
			)
		);
	}
}
class MyAlert extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return React.createElement(
			'div',
			null,
			this.props.show ? React.createElement(
				'div',
				{ style: { fontSize: '1.5rem' }, 'class': 'alert alert-primary', role: 'alert' },
				React.createElement('button', { onClick: this.props.onHide, style: { fontSize: '1rem' }, type: 'button', 'class': 'btn-close', 'data-bs-dismiss': 'alert', 'aria-label': 'Close' }),
				' ',
				this.props.text
			) : null
		);
	}
}

class MyButton extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return React.createElement(
			'div',
			null,
			React.createElement(
				'button',
				{ onClick: this.props.onClick, type: this.props.type, className: 'btn btn-primary' },
				this.props.text
			)
		);
	}
}

class MySubmitButton extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return React.createElement(
			'div',
			{ style: { textAlign: 'center' } },
			React.createElement(
				'button',
				{ type: 'submit', className: 'btn btn-primary' },
				this.props.text
			)
		);
	}
}

class NavBar extends React.Component {
	constructor(props) {
		super(props);
	}

	async handle_logout() {
		const response = await fetch('/logout', {
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			method: 'POST'
		});
		console.log(response);
		if (response.status == 200) {
			console.log("sucesss");
			window.location.replace('/login/index.html');
		} else {
			alert(response.message);
		}
	}

	handle_home() {
		window.location.replace('/home/index.html');
	}
	handle_messages() {
		window.location.replace('/messages/index.html');
	}
	handle_about() {
		window.location.replace('/about/index.html');
	}

	render() {
		return React.createElement(
			'div',
			{ style: { backgroundColor: '#F5F5F5', padding: '0.5rem' } },
			React.createElement(
				'div',
				{ 'class': 'btn-group btn-group-lg', role: 'group', 'aria-label': 'Basic outlined example' },
				React.createElement(
					'button',
					{ onClick: this.handle_home, type: 'button', 'class': 'btn btn-outline-dark' },
					'Home'
				),
				React.createElement(
					'button',
					{ onClick: this.handle_messages, type: 'button', 'class': 'btn btn-outline-dark' },
					'Messages'
				),
				React.createElement(
					'button',
					{ onClick: this.handle_logout, type: 'button', 'class': 'btn btn-outline-dark' },
					'Logout'
				),
				React.createElement(
					'button',
					{ onClick: this.handle_about, type: 'button', 'class': 'btn btn-outline-dark' },
					'About'
				)
			)
		);
	}
}