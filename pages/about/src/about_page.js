
const max_num_of_posts = 20

class AboutPage extends React.Component 
{
	constructor(props) 
	{
		super(props);
	}

    componentDidMount()
    {
        gate()
    }

	render() {
		return <div style={{fontFamily: 'calibri light', fontSize: '2rem'}}>
                    <NavBar/>
                    <br/>
                    <div className='container'>
                        
                        <h1>Exercise 3 in JS Course</h1>
                        <label>• Date: </label><br></br>
                        <label>• Details about submitters:</label><br></br>
                        <p> 
                            &emsp;Full Name: Shirley Alus<br></br>
                            &emsp;ID Number: 207023813<br></br>
                            &emsp;Email address: Shirleyalus@gmail.com<br></br>
                        </p>
                        <p>
                            &emsp; Full Name: Rami Hamdan<br></br>
                            &emsp;ID Number: 318573102<br></br>
                            &emsp;Email address: ramijoadha@mta.ac.il
                        </p>
                        
                    </div>
			   </div>

	}
}
