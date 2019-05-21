// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
// 	.BundleAnalyzerPlugin;

const path = require('path');
const fs = require('fs');

const exclusions = ['.eslintrc', 'index.js', 'test.js', 'styles.css', 'utils'];

const componentNames = fs
	.readdirSync('./src')
	.filter(name => exclusions.indexOf(name) === -1);

const entryPoints = componentNames.reduce(
	(acc, componentName) => {
		return {
			...acc,
			[`${componentName}/index`]: `./src/${componentName}/index.js`
		};
	},
	{
		index: './src/index.js'
	}
);

module.exports = {
	entry: entryPoints,
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].js',
		libraryTarget: 'commonjs2' // THIS IS THE MOST IMPORTANT LINE! :mindblow: I wasted more than 2 days until realize this was the line most important in all this guide.
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				include: path.resolve(__dirname, 'src'),
				exclude: /(node_modules|build)/,
				use: {
					loader: 'babel-loader'
				}
			}
		]
	},
	// plugins: [new BundleAnalyzerPlugin()],
	plugins: [],
	externals: {
		react: {
			commonjs: 'react',
			commonjs2: 'react',
			amd: 'React',
			root: 'React'
		},
		'react-dom': {
			commonjs: 'react-dom',
			commonjs2: 'react-dom',
			amd: 'ReactDOM',
			root: 'ReactDOM'
		},
		'styled-components': {
			commonjs: 'styled-components',
			commonjs2: 'styled-components',
			amd: 'styled-components',
			root: 'styled-components'
		}
	}
};
