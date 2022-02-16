class Login extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async handleSubmit(event) {
		event.preventDefault();
		const id = event.target[0].value;
		const password = event.target[1].value;
		console.log("submit");

		const response = await fetch('/api/login', {
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({ id: id, password: password }),
			redirect: 'follow'
		});
		console.log(response);
		if (response.status == 200) {
			console.log("sucesss");
			window.location.replace('/home/');
		} else {
			const err = await response.text();
			alert(err);
		}
	}

	render() {
		return React.createElement(
			'div',
			null,
			React.createElement(
				'form',
				{ onSubmit: e => this.handleSubmit(e) },
				React.createElement(
					'div',
					{ className: 'mb-3' },
					React.createElement(
						'label',
						{ htmlFor: 'exampleInputEmail1', className: 'form-label' },
						'ID'
					),
					React.createElement('input', { type: 'number', className: 'form-control', id: 'exampleInputEmail1' })
				),
				React.createElement(
					'div',
					{ className: 'mb-3' },
					React.createElement(
						'label',
						{ htmlFor: 'exampleInputPassword1', className: 'form-label' },
						'Password'
					),
					React.createElement('input', { type: 'password', className: 'form-control', id: 'exampleInputPassword1' })
				),
				React.createElement(
					'div',
					null,
					' don\'t have user?  ',
					React.createElement(
						'a',
						{ href: '/signup/' },
						'sign up'
					)
				),
				React.createElement('hr', null),
				React.createElement(
					'button',
					{ type: 'submit', className: 'btn btn-primary' },
					'Login'
				)
			)
		);
	}
}