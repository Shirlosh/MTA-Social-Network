
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
	handle_admin()
	{
		window.location.replace('/admin/index.html');
	}
  
	render() {
			return <div style={{backgroundColor: '#F5F5F5', padding: '0.5rem'}}><div class="btn-group btn-group-lg" role="group" aria-label="Basic outlined example">
            <button onClick={this.handle_home} type="button" class="btn btn-outline-dark">Home</button>
            <button onClick={this.handle_messages} type="button" class="btn btn-outline-dark">Messages</button>
            <button onClick={this.handle_logout} type="button" class="btn btn-outline-dark">Logout</button>
            <button onClick={this.handle_about} type="button" class="btn btn-outline-dark">About</button>
			<button onClick={this.handle_admin} type="button" class="btn btn-outline-dark">Admin</button>
        </div>
        </div>
	}
}