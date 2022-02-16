class Login extends React.Component 
{
	constructor(props) 
	{
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async handleSubmit(event) {
		event.preventDefault()
		const id = event.target[0].value
		const password = event.target[1].value
		console.log("submit")
		
		const response = await fetch('/api/login',{
			headers: {
            	'Content-Type':'application/json',
            	'Accept':'application/json'
        	},
			method:'POST',
			body: JSON.stringify({id:id,password:password }),
			redirect: 'follow'
		})
			console.log(response)
			if(response.status == 200){
				console.log("sucesss")
				window.location.replace('/home/');
			}
			else{
				const err = await response.text();
				alert( err );
			}		
	}
	

	render() {
		return 	<div>
					<form onSubmit={e => this.handleSubmit(e)}>
						<div className="mb-3">
						<label htmlFor="exampleInputEmail1" className="form-label">ID</label>
						<input type="number" className="form-control" id="exampleInputEmail1"/>
						
						</div>
						<div className="mb-3">
						<label htmlFor="exampleInputPassword1" className="form-label">Password</label>
						<input type="password" className="form-control" id="exampleInputPassword1"/>
						</div>
						<div> don't have user?  <a href="/signup/">sign up</a></div>
						<hr/>
						<button type="submit" className="btn btn-primary">Login</button>
					</form>
				</div>
	}
}
