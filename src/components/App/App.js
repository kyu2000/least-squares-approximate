import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './App.css';
import Menu from '../Menu';
// eslint-disable-next-line
import Calculator from '../Calculator';
import Coordinate from '../../Coordinate';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			degree: 1,
			coords: []
		};
		this.handleChangeDegree = this.handleChangeDegree.bind(this);
		this.handleAddCoord = this.handleAddCoord.bind(this);
	}

	handleChangeDegree(value) {
		this.setState({degree: value});
	}

	handleAddCoord(x, y) {
		const newCoord = new Coordinate(x, y);
		const coords = this.state.coords;
		this.setState({
			coords: coords.concat([newCoord])
		})
	}

	calcMaxDegree() {
		const map = new Map(); 
		this.state.coords.forEach(coord => map.set(coord.x, 0)); // 0 is just random value
		return map.size - 1;
	}

	render() {
		return (
			<Container fluid='true' style={{padding: 0}}>
				<Row noGutters='true'>
					<Col xs={12} lg={3}>
						<Menu 
							degree={{
								value: this.state.degree,
								onChange: this.handleChangeDegree,
								maxDegree: this.calcMaxDegree(),
							}}
							coordinates={{
								coords: this.state.coords,
								addCoord: this.handleAddCoord
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



export default App;
