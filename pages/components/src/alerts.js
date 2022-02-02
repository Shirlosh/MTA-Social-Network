
class MyAlert extends React.Component {
	constructor(props) {
	  super(props);
	}
  
	render() {
			return  <div>
                {this.props.show? 
                <div style={{fontSize: '1.5rem'}} class="alert alert-primary" role="alert">
                    
                    {' '}{this.props.text}
                </div>
            : null}

            </div>
	}
}