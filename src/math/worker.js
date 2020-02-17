import { create, all } from 'mathjs';

const config = {
	// number: 'Fraction'
};

// eslint-disable-next-line
const math = create(all, config); 

// Returns latex of polynomial of least squares
function calcLeastSquares(coords, degree) {
	if (coords.length <= 0) return null;
	
	const A = math.matrix(coords.map(coord => 
		Array(parseInt(degree) + 1).fill(coord.x)
						 		   .map((v, i) => math.pow(v, i))
	));
	const b = math.matrix(coords.map(coord => coord.y));

	// x = (A*A)^(-1) A*b
	const A_T = math.transpose(A);
	const M = math.multiply(A_T, A); 
	const c = math.multiply(A_T, b); 

	if (math.det(M) === 0) return null;
	const x = math.multiply(math.inv(M), c);

	const terms = x.valueOf().map((v, i) => 
		math.simplify(`${math.format(v, {fraction: 'ratio'})} * x^${i}`));
	const result = terms.reduce((acc, curr) => math.simplify(`(${acc}) + (${curr})`), 0);
	return `y = ${result.toTex()}`;
}

// eslint-disable-next-line
function print(v) {
	console.log(math.format(v, 14));
}

export default calcLeastSquares; 