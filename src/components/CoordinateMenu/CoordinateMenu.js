import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

import './CoordinateMenu.css';

import CoordinateAdder from '../CoordinateAdder';
import Coordinate from '../../Coordinate';

class CoordinateMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			newCoordVal: ""
		};
		this.handleChangeCoord = this.handleChangeCoord.bind(this);
		this.isUniqueCoord = this.isUniqueCoord.bind(this);
	}

	// todo: fractions
	isNewCoord(x, y) {
		// Check x, y are numbers 
		const isNumber = (val) => !/^\s*$/.test(val) && isFinite(val); 
		if (isNumber(x) && isNumber(y)) {
			const coord = new Coordinate(x, y); 			
			if (this.props.coords.every(c => !coord.equals(c))) {
				return coord; 
			}
		}
		return false;
	}

	isUniqueCoord(x, y) {
		const coord = new Coordinate(x, y);
		return this.props.coords.every(c => !coord.equals(c));
	}
	
	handleChangeCoord(event) {
		const value = event.target.value; 
		const re = /^\((.*),(.*)\)$/;
		
		const found = value.match(re);
		if (found && found.length === 3) {
			const [, x, y] = found;

			const newCoord = this.isNewCoord(x, y); 
			if (newCoord) {
				this.props.addCoord(newCoord);
				this.setState({newCoordVal: ""});
				return; 
			}
		}
		this.setState({newCoordVal: value});
	}

	render() {
		const coords = this.props.coords; 
		const listCoords = coords.map((coord) => 
			<ListGroup.Item key={coord.toString()}>
				{coord.toString()}
			</ListGroup.Item>
		);

		return (
			<div id="coordinateMenu">
				<CoordinateAdder
					value=""
					isUniqueCoord={this.isUniqueCoord}
					addCoord={this.props.addCoord}
				/>
				<h3>coords list</h3>
				<ListGroup>
					{listCoords}
				</ListGroup>

			</div>
		);
	}
}

export default CoordinateMenu;