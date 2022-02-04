const max_num_of_messages = 20;

class AdminPage extends React.Component {
    constructor(props) {
        super(props);
        this.handle_new_post = this.handle_new_message.bind(this);
        this.get_posts = this.get_users.bind(this);
        this.state = {
            users: [],
            new_posts_indicator: false,
            new_messages_indicator: false
        };
    }

    async componentDidMount() {
        setInterval(() => {
            this.get_users();
            // if(this.state.users.length < users.length)
            //     this.setState({new_messages_indicator: true}) //set alert
            // console.log("messages check")
        }, 1000);
        this.get_users();
    }

    async get_users() {
        const users = await this.fetch_users();
        this.update_users(users);
    }

    async fetch_users() {
        const response = await fetch('/users');
        if (response.status != 200) throw new Error('Error while fetching messages');
        const data = await response.json();
        await console.log("messages:", data);
        return data;
    }

    update_users(users) {
        this.setState({ users: users });
    }

    async handle_new_message(event) {
        event.preventDefault();
        const message_text = event.target[0].value;

        const response = await fetch('/message_users', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ message: message_text })
        });
        if (response.status == 200) {
            this.get_users();
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
                    'h1',
                    null,
                    'Users'
                ),
                React.createElement(Users, { users: this.state.users }),
                React.createElement(MyButton, { onClick: () => this.get_users(), text: 'update users list' }),
                React.createElement('br', null),
                React.createElement('br', null),
                React.createElement(
                    'form',
                    { onSubmit: this.handle_new_message },
                    React.createElement(
                        'div',
                        { 'class': 'form-group' },
                        React.createElement(
                            'label',
                            { 'for': 'exampleFormControlTextarea1' },
                            'Send message to all:'
                        ),
                        React.createElement('textarea', { 'class': 'form-control', id: 'exampleFormControlTextarea1', rows: '3' }),
                        React.createElement(MySubmitButton, { text: 'send' })
                    )
                ),
                React.createElement('hr', null)
            )
        );
    }
}

class User extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const user = this.props.user;

        return React.createElement(
            'div',
            { style: { fontSize: '1.5rem' }, className: 'UserItem', 'data-id': user.id },
            React.createElement(
                'span',
                null,
                React.createElement('i', { onClick: this.handle_click, className: 'fa fa-times transparent' })
            ),
            ' ',
            React.createElement(
                'span',
                null,
                'id ',
                user.id,
                ': ',
                React.createElement(
                    'strong',
                    null,
                    user.message
                ),
                ' ',
                user.name,
                ' ',
                React.createElement(Status, { user: user }),
                ' '
            ),
            React.createElement(
                'span',
                { style: { fontSize: '1rem' } },
                user.sent_date
            )
        );
    }
}

class Users extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return React.createElement(
            'div',
            null,
            this.props.users.map((user, index) => {
                if (user.id != 1) return React.createElement(User, {
                    user: user,
                    key: index
                });
            })
        );
    }
}

class Status extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: props.user.status };
        this.handle_change = this.handle_change.bind(this);
    }

    async handle_change(event) {

        let response;
        let id = this.props.user.id;

        if (event.target.value == "Active") {
            if (this.props.user.status == "Created") response = await fetch('/approve_user/' + id, { method: 'PUT' });else if (this.props.user.status == "Suspended") response = await fetch('/restore_user/' + id, { method: 'PUT' });
        } else if (event.target.value == "Suspended") response = await fetch('/suspend_user/' + id, { method: 'PUT' });else if (event.target.value == "Deleted") response = await fetch('/user/' + id, { method: 'DELETE' });

        if (response.status == 200) {} else {
            const err = await response.text();
            alert(err);
        }
    }

    render() {
        return React.createElement(
            'select',
            { id: 'status', onChange: this.handle_change, value: this.props.user.status },
            React.createElement(
                'option',
                { value: 'Created', disabled: true },
                'Created'
            ),
            React.createElement(
                'option',
                { value: 'Active' },
                'Active'
            ),
            React.createElement(
                'option',
                { value: 'Suspended' },
                'Suspended'
            ),
            React.createElement(
                'option',
                { value: 'Deleted' },
                'Delete'
            )
        );
    }

}