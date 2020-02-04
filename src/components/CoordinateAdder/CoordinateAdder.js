import React from 'react';
import Form from 'react-bootstrap/Form';

import './CoordinateAdder.css';

class CoordinateAdder extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			coord: this.props.value, // Textbox value
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	// When value of textbox changes 
	handleChange(event) {
		const value = event.target.value; 
		this.setState({coord: value});
	}

	// For detecting 'Enter' keypresses
	handleKeyPress(event) {
		if (event.key === 'Enter') {
			event.preventDefault();
			const status = this.checkCoord();
			if (status.isValid) {
				this.props.addCoord(status.msg.x, status.msg.y);
				console.log("test!!!");
				this.setState({coord: ""});
			}
		}
	}

	// Check if value matches coordinate syntax
	// Returns object {
	// 	isValid: Boolean
	//	isInvalid: Boolean     
	//  msg: String (for additional info)
	// }
	// NB can't be both valid and invalid, but can be neither (when empty)	
	checkCoord(value=this.state.coord) {
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
				if (this.props.isUniqueCoord(x, y)) {
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


	render() {
		const status = this.checkCoord();
		return (
			<div id="coordinateAdder">
				<Form id="formNewCoord" autoComplete="off">
					<Form.Group controlId="formNewCoord">
						<Form.Label>Add coordinate</Form.Label>
						<Form.Control
							type="text"
							placeholder="Coordinate"
							value={this.state.coord}
							onChange={this.handleChange}
							onKeyPress={this.handleKeyPress}
							isValid={status.isValid}
							isInvalid={status.isInvalid}
						/>
						<Form.Control.Feedback type="invalid">
							{status.isInvalid ? status.msg : ""}
						</Form.Control.Feedback>
					</Form.Group>
				</Form>
			</div>
		);
	}
}

export default CoordinateAdder;