
class MyAlert extends React.Component {
	constructor(props) {
	  super(props);
	}
  
	render() {
			return  <div>
                {this.props.show? 
                <div style={{fontSize: '1.5rem'}} class="alert alert-primary" role="alert">
                    {' '}{this.props.text}{' | '}<a onClick={this.props.onClick} class="alert-link">Click to update</a>
                </div>
            : null}

            </div>
	}
}