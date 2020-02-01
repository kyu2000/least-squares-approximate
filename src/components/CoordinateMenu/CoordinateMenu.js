import React from 'react';
import Field from '../Field';
import Coordinate from '../../Coordinate';


class CoordinateMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			newCoordVal: ""
		};
		this.handleChangeCoord = this.handleChangeCoord.bind(this);
	}

	isNewCoord(x, y) {
		// Check x, y are numbers
		const isNumber = (val) => !/^\s*$/.test(val) && isFinite(val);
		if (isNumber(x) && isNumber(y)) {
			const coord = new Coordinate(x, y); 
			const coords = this.props.coords; 
			
			if (!coords.reduce((acc, cur) => acc || cur.equals(coord), false)) {
				return coord; 
			}
		}
		return false;
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
			<li key={coord.toString()}>
				{coord.toString()}
			</li>
		);

		return (
			<div>
				<h3>add a coord</h3>
					<Field
						value={this.state.newCoordVal}
						onChange={this.handleChangeCoord}
					/>
				<h3>coords list</h3>
				<ul>
					{listCoords}
				</ul>

			</div>
		);
	}
}

export default CoordinateMenu;