const path = require('path');

const rootPath = __dirname;

module.exports = {
	entry: path.join(__dirname, 'index.src.js'),
	output: {
		filename: 'index.js',
		path: path.join(__dirname),
		library: 'selector',
		libraryTarget: 'umd'
	},
	externals: {
		'vue': 'Vue',
		'mp-vue-tools': 'mp-vue-tools'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: path.join(rootPath, 'src')
			}
		]
	}
};