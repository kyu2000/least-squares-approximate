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
			const status = this.props.checkCoord(this.state.coord);
			if (status.isValid) {
				this.props.addCoord(status.msg.x, status.msg.y);
				this.setState({coord: ""});
			}
		}
	}

	render() {
		const status = this.props.checkCoord(this.state.coord);
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