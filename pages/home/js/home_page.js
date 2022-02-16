
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
            messages: [],
            new_posts_indicator: false,
            new_messages_indicator: false
        };
    }

    async componentDidMount() {
        gate();
        setInterval(async () => {
            const posts = await this.fetch_posts();
            if (this.state.posts.length < posts.length) {
                this.setState({ new_posts_indicator: true }); //set alert
            }

            const messages = await this.fetch_messages();
            if (this.state.messages.length < messages.length) {
                this.setState({ new_messages_indicator: true }); //set alert
                this.setState({ messages: messages });
            }
        }, 30000);
        this.get_posts();
        const messages = await this.fetch_messages();
        this.setState({ messages: messages });
    }

    async get_posts() {
        const posts = await this.fetch_posts();
        this.update_posts(posts);
    }

    async fetch_posts() {
        const response = await fetch('/api/posts');
        if (response.status != 200) throw new Error('Error while fetching posts');
        const data = await response.json();
        await console.log("posts:", data);
        return data;
    }

    async fetch_messages() {
        const response = await fetch('/api/messages');
        if (response.status != 200) throw new Error('Error while fetching messages');
        const data = await response.json();
        await console.log("messages:", data);
        return data;
    }

    async handle_delete(id) {
        const response = await fetch('/api/post/' + id, { method: 'DELETE' });
        if (response.status == 200) {
            this.get_posts();
        } else {
            const err = await response.text();
            alert(err);
        }
    }

    update_posts(posts) {
        this.setState({ posts: posts });
    }

    async handle_new_post(event) {
        event.preventDefault();
        const post_text = event.target[0].value;

        const response = await fetch('/api/post', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ post: post_text })
        });
        if (response.status == 200) {
            this.get_posts();
            alert("Posted.");
        } else {
            const err = await response.text();
            alert(err);
        }
    }

    render() {
        return React.createElement(
            'div',
            { style: { fontFamily: 'calibri light', fontSize: '2rem' } },
            React.createElement(NavBar, null),
            React.createElement(MyAlert, {
                show: this.state.new_posts_indicator,
                onClick: () => {
                    this.setState({ new_posts_indicator: false });
                    this.get_posts();
                },
                text: 'You have New Posts'
            }),
            React.createElement(MyAlert, {
                show: this.state.new_messages_indicator,
                onClick: () => {
                    this.setState({ new_messages_indicator: false });
                    window.location.replace('/messages/');
                },
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