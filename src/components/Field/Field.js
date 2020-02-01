import React from 'react';

class Field extends React.Component {

	render() {
		return (
			<form>
				<input 
					type="text"
					value={this.props.value}
					onChange={this.props.onChange}
				/>
			</form>
		);
	}
}

export default Field;