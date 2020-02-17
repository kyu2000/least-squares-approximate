import React from 'react';

import './CoordinateMenu.css';

import Coordinate from '../../Coordinate';
import CoordinateAdder from '../CoordinateAdder';
import CoordinateList from '../CoordinateList';

class CoordinateMenu extends React.Component {
	constructor(props) {
		super(props);
		this.checkCoord = this.checkCoord.bind(this);
		this.isUniqueCoord = this.isUniqueCoord.bind(this);
	}

	// Check if value matches coordinate syntax
	// Returns object {
	// 	isValid: Boolean
	//	isInvalid: Boolean     
	//  msg: String (for additional info)
	// }
	// NB can't be both valid and invalid, but can be neither (when empty)	
	checkCoord(value) {
		// Empty case 
		if (value === "") {
			return {
				isValid: false,
				isInvalid: false
			};
		}

		const re = /^\((.*),(.*)\)$/;
		const found = value.match(re);
		if (found && found.length === 3) {
			const [, x, y] = found; // x is 1st val, y is 2nd val in coord

			// Check if x, y are numbers
			const isNumber = (val) => !/^\s*$/.test(val) && isFinite(val); 
			if (isNumber(x) && isNumber(y)) {
				if (this.isUniqueCoord(x, y)) {
					return {
						isValid: true,
						isInvalid: false, 
						msg: {x: x, y: y}
					}
				} 
				return {
					isValid: false,
					isInvalid: true,
					msg: "Coordinate has already been entered"
				}
			}
		}
		return {
			isValid: false,
			isInvalid: true, 
			msg: "Coordinate syntax is (x,y) where x and y are numbers"
		}; 
	}

	isUniqueCoord(x, y) {
		const coord = new Coordinate(x, y);
		return this.props.coords.every(c => !coord.equals(c));
	}

	render() {
		return (
			<div id="coordinateMenu">
				<CoordinateAdder
					value=""
					addCoord={this.props.addCoord}
					checkCoord={this.checkCoord}
				/>
				<CoordinateList
					coords={this.props.coords}
					delCoord={this.props.delCoord}
					checkCoord={this.checkCoord}
				/>
			</div>
		);
	}
}

export default CoordinateMenu;