class MyButton extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return React.createElement(
			'div',
			null,
			React.createElement(
				'button',
				{ onClick: this.props.onClick, type: this.props.type, className: 'btn btn-primary' },
				this.props.text
			)
		);
	}
}

class MySubmitButton extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return React.createElement(
			'div',
			{ style: { textAlign: 'center' } },
			React.createElement(
				'button',
				{ type: 'submit', className: 'btn btn-primary' },
				this.props.text
			)
		);
	}
}