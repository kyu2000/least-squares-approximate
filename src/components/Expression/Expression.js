import React from 'react';
import Field from '../Field';

class Expression extends React.Component {

	render() {
		return (
			<Field 
				value={this.props.value}
				onChange={this.props.onChange}
			/>
		);
	}
}

export default Expression;