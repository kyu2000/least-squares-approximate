import React from 'react';

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
			id: `coord${coord.toString()}`,
			latex: coord.toString(),
			color: '#2d70b3'
		}));
		this.graph.setExpressions(expressions);
	}

	// Calculates coordinates to remove, and add 
	// Assumes graph exists
	setUpCoords() {
		const graph = this.graph; 
		const oldCoordsExpressions = graph.getExpressions().filter(exp => /^coord/.test(exp.id));
		
		const map = new Map();
		// Set up coordinates for removal
		for (const expr of oldCoordsExpressions) {
			map.set(expr.id, () => graph.removeExpression({id: expr.id}));
		}

		const newCoords = this.props.coords.slice();
		for (const coord of newCoords) {
			const id = `coord${coord.toString()}`
			if (map.has(id)) { // Don't remove existing coordinate
				map.delete(id);
			} else { // Add new coordinate
				map.set(id, () => graph.setExpression({
					id: id,
					latex: coord.toString(),
					color: '#2d70b3'
				}))
			}
		}

		// Run anonymous functions
		for (const functions of map.values()) {
			functions();
		}
	}

	render() {
		const graph = this.graph; 
		if (graph) {
			this.setUpCoords();
			const result = calcLeastSquares(this.props.coords, this.props.degree)
			if (result) {
				graph.setExpression({
					id: 'leastSquares',
					latex: result,
					color: '#c74440'
				});
			}
		}

		return (
			<div id="calc">

			</div>
		);
	}
}

export default Calculator; 