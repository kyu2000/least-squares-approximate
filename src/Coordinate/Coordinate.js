class Coordinate {
	constructor(x, y) {
		this.x = parseFloat(x);
		this.y = parseFloat(y);  
	}

	toString() {
		return `(${this.x}, ${this.y})`;
	}

	equals(coord) {
		return coord.x === this.x && coord.y === this.y; 
	}
}

export default Coordinate; 