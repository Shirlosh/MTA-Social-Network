
const max_num_of_posts = 20;

class AboutPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        gate();
    }

    render() {
        return React.createElement(
            'div',
            { style: { fontFamily: 'calibri light', fontSize: '2rem' } },
            React.createElement(NavBar, null),
            React.createElement('br', null),
            React.createElement(
                'div',
                { className: 'container' },
                React.createElement(
                    'h1',
                    null,
                    'Exercise 3 in JS Course'
                ),
                React.createElement(
                    'label',
                    null,
                    '\u2022 Date: '
                ),
                React.createElement('br', null),
                React.createElement(
                    'label',
                    null,
                    '\u2022 Details about submitters:'
                ),
                React.createElement('br', null),
                React.createElement(
                    'p',
                    null,
                    '\u2003Full Name: Shirley Alus',
                    React.createElement('br', null),
                    '\u2003ID Number: 207023813',
                    React.createElement('br', null),
                    '\u2003Email address: Shirleyalus@gmail.com',
                    React.createElement('br', null)
                ),
                React.createElement(
                    'p',
                    null,
                    '\u2003 Full Name: Rami Hamdan',
                    React.createElement('br', null),
                    '\u2003ID Number: 318573102',
                    React.createElement('br', null),
                    '\u2003Email address: ramijoadha@mta.ac.il'
                )
            )
        );
    }
}