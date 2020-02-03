import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

import './Calculator.css';

// eslint-disable-next-line
import calcLeastSquares from '../../math/worker';

class Calculator extends React.Component {
	constructor(props) {
		super(props);
		this.graph = null;
		
		window.onload = () => {
			console.log("window loaded");
			const calc = document.getElementById('calc');
			const graph = window.Desmos.GraphingCalculator(calc, {
				expressionsCollapsed: true,
			});
			this.graph = graph; 
		}
	}

	initCoords() {
		const props = this.props.coords.slice(); 
		const expressions = props.map((coord, i) => ({
			id: `coord${i}`,
			latex: coord.toString(),
			color: '#2d70b3'
		}));
		this.graph.setExpressions(expressions);
	}

	render() {
		const graph = this.graph; 
		if (graph) {
			graph.setBlank();
			this.initCoords();
			const result = calcLeastSquares(this.props.coords, this.props.degree)
			if (result) graph.setExpression({
				id: 'leastSquares',
				latex: result
			})
		}

		return (
			<div id="calc">
			
			</div>
		);
	}
}

export default Calculator; 