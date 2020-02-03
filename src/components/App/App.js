import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './App.css';
import Menu from '../Menu';
import Calculator from '../Calculator';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			degree: '1',
			coords: []
		};
		this.handleChangeDegree = this.handleChangeDegree.bind(this);
		this.handleAddCoord = this.handleAddCoord.bind(this);
	}
	handleChangeDegree(event) {
		const value = event.target.value; 
		if (value === "") {
			this.setState({degree: ""});
		} else if (isInt(value)) {
			this.setState({degree: parseInt(value)});
		}
	}

	handleAddCoord(newCoord) {
		const coords = this.state.coords;
		this.setState({
			coords: coords.concat([newCoord])
		})
	}

	render() {
		return (
			<Container fluid='true'>
				<Row>
					<Col xs={12} lg={3}>
						<Menu 
							expression={{
								value: this.state.degree,
								onChange: this.handleChangeDegree,
							}}
							coordinates={{
								coords: this.state.coords,
								addCoord: this.handleAddCoord,
							}}
						/>
					</Col>
					<Col>
						<Calculator
							degree={this.state.degree || 0}
							coords={this.state.coords}
						/>
					</Col>
				</Row>
			</Container>
		);
	} 
}

function isInt(value) {
	if (isNaN(value)) return false; 
	const x = parseFloat(value);
	return (x | 0) === x; 
}

export default App;
