import React from 'react';
import Degree from '../Degree';
import CoordinateMenu from '../CoordinateMenu';

import './Menu.css';

class Menu extends React.Component {

	render() {
		return (
			<div id="menu">
				<Degree
					value={this.props.degree.value}
					onChange={this.props.degree.onChange}
					maxDegree={this.props.degree.maxDegree}
				/>
				<CoordinateMenu 
					coords={this.props.coordinates.coords}
					addCoord={this.props.coordinates.addCoord}
					feedbackAdd={this.props.coordinates.feedbackAdd}
				/>
			</div>
		);
	}
}

export default Menu;