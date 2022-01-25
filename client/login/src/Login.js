
class Login extends React.Component 
{
	constructor(props) 
	{
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async handleSubmit(event) {
		console.log(event)
		const id = event.target[0].value
		const password = event.target[1].value
		const response = await fetch('/login', {method:'POST', body: {id:id,password:password }});
		if ( response.status == 200 )
		{
			props.history.push('/home');		  
		}
		else 
		{
		  const err = await response.text();
		  alert( err );
		}
		
	}
	

	render() {
		return <div><form onSubmit={e => this.handleSubmit(e)}>
		<div class="mb-3">
		  <label for="exampleInputEmail1" class="form-label">ID</label>
		  <input type="number" class="form-control" id="exampleInputEmail1"/>
		  
		</div>
		<div class="mb-3">
		  <label for="exampleInputPassword1" class="form-label">Password</label>
		  <input type="password" class="form-control" id="exampleInputPassword1"/>
		</div>
		<button type="submit" class="btn btn-primary">Submit</button>
	  </form></div>
	}
}
