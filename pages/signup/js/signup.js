
class SignupPage extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async handleSubmit(event) {
		const name = event.target[0].value;
		const email = event.target[1].value;
		const password = event.target[2].value;
		console.log("submit");

		const response = await fetch('/user', {
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({ name: name, email: email, password: password }),
			redirect: 'follow'
		});
		//.then(result => result.json())
		//	.then(response => {
		console.log(response);
		if (response.status == 200) {
			console.log("sucesss");
			window.location.replace('/login/index.html');
		} else {
			alert(response.message);
		}

		//})

		//window.location.href("http://localhost:2718/home/home_page.html")
		//console.log(response)
		//props.history.push("../../home/home_page.html");		  

		// if ( response.status == 200 )
		// {
		// 	props.history.push("../../home/home_page.html");		  
		// }
		// else 
		// {
		//   const err = await response.text();
		//   alert( err );
		// }		
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
					{ 'class': 'mb-3' },
					React.createElement(
						'label',
						{ 'for': 'exampleInputName1', 'class': 'form-label' },
						'Name'
					),
					React.createElement('input', { type: 'text', 'class': 'form-control', id: 'exampleInputName1' })
				),
				React.createElement(
					'div',
					{ 'class': 'mb-3' },
					React.createElement(
						'label',
						{ 'for': 'exampleInputEmail1', 'class': 'form-label' },
						'Email'
					),
					React.createElement('input', { type: 'email', 'class': 'form-control', id: 'exampleInputEmail1' })
				),
				React.createElement(
					'div',
					{ 'class': 'mb-3' },
					React.createElement(
						'label',
						{ 'for': 'exampleInputPassword1', 'class': 'form-label' },
						'Password'
					),
					React.createElement('input', { type: 'password', 'class': 'form-control', id: 'exampleInputPassword1' })
				),
				React.createElement(
					'button',
					{ type: 'submit', 'class': 'btn btn-primary' },
					'Register now'
				)
			)
		);
	}
}