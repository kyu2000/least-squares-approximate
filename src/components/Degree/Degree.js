import React from 'react';
import Form from 'react-bootstrap/Form';

import './Degree.css';

class Degree extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			degree: this.props.value, // Textbox value
		}
		this.handleChange = this.handleChange.bind(this);
	}

	// For textbox onChange
	handleChange(event) {
		const value = event.target.value; 
		if (value === "" || isInt(value)) { // Only numbers
			this.setState({degree: value}); // For textbox 
			if (this.validDegree(value)) {
				this.props.onChange(parseInt(value)); // For calculations 
			} 
		}
	}

	// Prevent 'Enter' default
	handleKeyPress(event) {
		if (event.key === 'Enter') {
			event.preventDefault(); 
		}
	}

	// Valid degree for calculation purposes
	validDegree(degree=this.state.degree) {
		return isInt(degree) && 
				degree >= 0 && 
				degree <= this.props.maxDegree ;
	}

	render() {
		return (
			<div id="divDegree">
				<Form id="formDegree">
					<Form.Group controlId="formDegree">
						<Form.Label>Polynomial degree</Form.Label>
						<Form.Control
							type="text" 
							placeholder="Degree"
							value={this.state.degree}
							onChange={this.handleChange}
							onKeyPress={this.handleKeyPress}
							isInvalid={!this.validDegree()}
						/>
						<Form.Control.Feedback type="invalid">
							Degree is a non-negative integer. 
							<br/>
							Maximum: Number of unique x values - 1
						</Form.Control.Feedback>
					</Form.Group>
				</Form>
			</div>
		);
	}
}

// eslint-disable-next-line
function isInt(value) {
	if (isNaN(value)) return false; 
	const x = parseFloat(value);
	return (x | 0) === x; 
}

export default Degree;