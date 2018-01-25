import resolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
import json from 'rollup-plugin-json';

export default {
	input: './src/index.js',
	output: {
		format: 'umd',
		name: 'remlog',
		file: './dist/utils.js',
		sourcemap: true
	},
	plugins: [json(), resolve(), uglify()]
};
