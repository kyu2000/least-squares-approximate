import React from 'react';
import Expression from '../Expression';
import CoordinateMenu from '../CoordinateMenu';

class Menu extends React.Component {

	render() {
		return (
			<div>
				<Expression 
					value={this.props.expression.value}
					onChange={this.props.expression.onChange}
				/>
				<CoordinateMenu 
					coords={this.props.coordinates.coords}
					addCoord={this.props.coordinates.addCoord}
				/>
			</div>
		);
	}
}

export default Menu;