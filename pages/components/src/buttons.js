class MyButton extends React.Component {
	constructor(props) {
	  super(props);
	}
  
	render() {
			return <div>
                        <button onClick={this.props.onClick} type={this.props.type} className="btn btn-primary">{this.props.text}</button>
                    </div>
	}
}

class MySubmitButton extends React.Component {
	constructor(props) {
	  super(props);
	}
  
	render() {
			return <div style={{textAlign: 'center'}}>
                        <button type='submit' className="btn btn-primary">{this.props.text}</button>
                    </div>
	}
}
