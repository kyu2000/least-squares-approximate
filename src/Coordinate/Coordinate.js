class Coordinate {
	constructor(x, y) {
		this.x = parseFloat(x); // maybe not as a float? 
		this.y = parseFloat(y);  
	}

	toString() {
		return `(${this.x}, ${this.y})`;
	}

	equals(coord) {
		return coord.hasOwnProperty('x') && coord.x === this.x && coord.hasOwnProperty('y') && coord.y === this.y; 
	}
}

export default Coordinate; 