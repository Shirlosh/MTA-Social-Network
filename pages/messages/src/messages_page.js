//import React from 'react';

import {NavBar} from '../../components/js/navbar'
import {MyAlert} from '../../components/js/alerts'
import {MySubmitButton} from '../../components/js/buttons'
import {MyButton} from '../../components/js/buttons'
//NavBar = require('../../components/js/navbar');


const max_num_of_messages = 20

class Message extends React.Component 
{
	constructor(props) {
		super(props);
	}

	render() {
        const message = this.props.message

		return 	<div style={{fontSize: '1.5rem'}} className='UserItem'  data-id={message.id}>
					<span><i onClick={this.handle_click} className='fa fa-times transparent'></i></span>                   
                    {' '}<span>message id {message.id}: <strong>{message.message}</strong> | </span>
                    <span style={{fontSize: '1rem'}}>{message.sent_date}</span>
				</div>
	}
}

class Messages extends React.Component
{
    constructor(props){
        super(props);
    }

    render() {
        return <div>
                    {this.props.messages.map( (message,index) => 
                    { if(max_num_of_messages >= index + 1)
                        return <Message
                                    message ={message}  
                                    key={index}
                                />  
                    })}
                </div>
         }
}


class MessagesPage extends React.Component 
{
	constructor(props) 
	{
		super(props);
		this.handle_new_post = this.handle_new_message.bind(this)
		this.get_posts = this.get_messages.bind(this)
		this.state = {
            messages: [],
            new_posts_indicator: false,
            new_messages_indicator: false
        }
	}

	async componentDidMount() 
	{
        setInterval(() => {
            const messages = this.fetch_messages();
            if(this.state.messages.length < messages.length)
                this.setState({new_messages_indicator: true}) //set alert
            console.log("messages check")
        }, 30000)
        this.get_messages()
	}

    async get_messages()
    {
        const messages = await this.fetch_messages();
		this.update_messages(messages);
    }

	async fetch_messages()
	{
		const response = await fetch('/messages');
		if ( response.status != 200 )
		  throw new Error( 'Error while fetching messages');
		const data = await response.json();
        await console.log("messages:", data)
		return data;
	}


	update_messages( messages )
	{
		this.setState( {messages : messages} );
	}

    async handle_new_message(event)
    {
        event.preventDefault()
		const receiver_id = event.target[0].value
        const post_text = event.target[1].value

        const response = await fetch('/send_message/' + receiver_id ,{
			headers: {
            	'Content-Type':'application/json',
        	},
			method:'POST',
			body: JSON.stringify({message:post_text }),
		});
        if ( response.status == 200 )
		{
            this.get_messages();
		}
		else 
		{
		  const err = await response.text();
		  alert( err );
		}
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
                        <form onSubmit={this.handle_new_message}>
                            <div class="form-group">
							
  								<label for="exampleFormControlInput1" class="form-label">To: </label>
  								<input type="number" class="form-control" id="exampleFormControlInput1" placeholder="user id"/>

                                <label for="exampleFormControlTextarea1">Send new message:</label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                <MySubmitButton text={'send'}/>
                            </div>
                        </form>
                        <hr/>
                        
                        <MyButton onClick={() => this.get_messages()} text={'Check for new message'}/>
                        <h1>Messages</h1>
                        <Messages 
                            messages={this.state.messages}
                        />
                    </div>
			   </div>
	}
}


// class MyAlert extends React.Component { 
// 	constructor(props) {
// 	  super(props);
// 	}
  
// 	render() {
// 			return  <div>
//                 {this.props.show? 
//                 <div style={{fontSize: '1.5rem'}} class="alert alert-primary" role="alert">
                    
//                     {' '}{this.props.text}
//                 </div>
//             : null}

//             </div>
// 	}
// }


// class MyButton extends React.Component {
// 	constructor(props) {
// 	  super(props);
// 	}
  
// 	render() {
// 			return <div>
//                         <button onClick={this.props.onClick} type={this.props.type} className="btn btn-primary">{this.props.text}</button>
//                     </div>
// 	}
// }

// class MySubmitButton extends React.Component {
// 	constructor(props) {
// 	  super(props);
// 	}
  
// 	render() {
// 			return <div style={{textAlign: 'center'}}>
//                         <button type='submit' className="btn btn-primary">{this.props.text}</button>
//                     </div>
// 	}
// }

// class NavBar extends React.Component {
// 	constructor(props) {
// 	  super(props);
// 	}

// 	async handle_logout(){
// 		const response = await fetch('/logout',{
// 			headers: {
//             	'Content-Type':'application/json',
//             	'Accept':'application/json'
//         	},
// 			method:'POST',
// 		})
// 		console.log(response)
// 		if(response.status == 200){
// 			console.log("sucesss")
// 			window.location.replace('/login/index.html');
// 		}
// 		else{
// 			alert(response.message)
// 		}
// 	}

// 	handle_home()
// 	{
// 		window.location.replace('/home/index.html');
// 	}
// 	handle_messages()
// 	{
// 		window.location.replace('/messages/index.html');
// 	}
// 	handle_about()
// 	{
// 		window.location.replace('/about/index.html');
// 	}
  
// 	render() {
// 			return <div style={{backgroundColor: '#F5F5F5', padding: '0.5rem'}}><div class="btn-group btn-group-lg" role="group" aria-label="Basic outlined example">
//             <button onClick={this.handle_home} type="button" class="btn btn-outline-dark">Home</button>
//             <button onClick={this.handle_messages} type="button" class="btn btn-outline-dark">Messages</button>
//             <button onClick={this.handle_logout} type="button" class="btn btn-outline-dark">Logout</button>
//             <button onClick={this.handle_about} type="button" class="btn btn-outline-dark">About</button>
//         </div>
//         </div>
// 	}
// }
  