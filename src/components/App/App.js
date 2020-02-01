import React from 'react';
import './App.css';
import Menu from '../Menu'

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			degree: '',
			coords: []
		};
		this.handleChangeDegree = this.handleChangeDegree.bind(this);
		this.handleAddCoord = this.handleAddCoord.bind(this);
	}

  // componentDidMount() {
  //   const script = document.createElement("script");
  //   script.src = "https://www.desmos.com/api/v1.4/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6";
  //   script.async = true; 
  //   script.onload = () => {
  //     console.log("Loaded")
  //     const div = document.getElementById('calculator');
  //     const calc = window.Desmos.GraphingCalculator(div);
  //     console.log(calc)
  //     calc.setExpression({ id: 'graph1', latex: 'y=x^2' });
  //   }
  //   document.body.appendChild(script)


  // }

	handleChangeDegree(event) {
		const value = event.target.value; 
		if (value === "") {
			this.setState({degree: ""});
		} else if (isInt(value)) {
			this.setState({degree: parseInt(value)});
		}
	}

	handleAddCoord(newCoord) {
		console.log(newCoord.toString());
		const coords = this.state.coords;
		this.setState({
			coords: coords.concat([newCoord])
		})
	}

	render() {
		return (
			<div>
				<Menu 
					expression={{
						value: this.state.degree,
						onChange: this.handleChangeDegree,
					}}
					coordinates={{
						coords: this.state.coords,
						addCoord: this.handleAddCoord,
					}}
				/>
			</div>
		);
	} 
}

function isInt(value) {
	if (isNaN(value)) return false; 
	const x = parseFloat(value);
	return (x | 0) === x; 
}

export default App;
