
class HomePage extends React.Component 
{
	constructor(props) 
	{
		super(props);
		//this.handleSubmit = this.handleSubmit.bind(this);
	}
	// async handleSubmit(event) {
	// 	const id = event.target[0].value
	// 	const password = event.target[1].value
		
	// 	const response = await fetch('/login',{
	// 		headers: {
    //         	'Content-Type':'application/json',
    //         	'Accept':'application/json'
    //     	},
	// 		method:'POST',
	// 		body: JSON.stringify({id:id,password:password }) 
	// 	});

	// 	if ( response.status == 200 )
	// 	{
	// 		props.history.push('/home');		  
	// 	}
	// 	else 
	// 	{
	// 	  const err = await response.text();
	// 	  alert( err );
	// 	}		
	// }
	

	render() {
		// return <div>
		// 	<button type="button" class="btn btn-primary">Posts</button>
		// 	<button type="button" class="btn btn-primary">Message</button>
		// 	<button type="button" class="btn btn-primary">logout</button>
		// </div>
		return <div>
		<ReactButton name='Posts'/>
		<ReactButton name='Messages'/>
		<ReactButton name='Logout'/>
		</div>
	}
}


class ReactButton extends React.Component {
	constructor(props) {
	  super(props);
	//   this.name = this.props.name
	//   this.props.value = this.props.name
	  this.state ={name: this.props.name};
	  //this.handle_click = this.handle_click.bind( this ); 
	}
	
	handle_click()
	{
		const new_state = {visible: false};
		this.setState( new_state );
	}
  
	render() {
	//   return <button className={this.state.visible ? '' : 'hidden'}  
	// 			  onClick={this.handle_click}>Hello {this.props.name ? this.props.name : 'No idea' }
	// 		  </button>
			return <div>
			<button  type="button" class="btn btn-primary" value={this.state.name}>Not</button>
		</div>
	}
}



  