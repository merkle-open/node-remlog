import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
import json from 'rollup-plugin-json';

export default {
	input: './src/index.js',
	output: {
		format: 'umd',
		name: 'remlog',
		file: './dist/browser-client.js',
		sourcemap: true
	},
	plugins: [
		json(),
		resolve(),
		babel({
			exclude: 'node_modules/**'
		}),
		uglify()
	]
};
