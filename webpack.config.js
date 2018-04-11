const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

function join(p) {
	return path.join(__dirname, p);
}

module.exports = {
	entry: join('src/index'),
	output: {
		filename: 'mp-vue-tools.js',
		path: path.join(__dirname, 'dist'),
		library: 'mp-vue-tools',
		libraryTarget: 'umd'
	},
	externals: {
		'vue': {
			commonjs: 'vue',	
			commonjs2: 'vue',
			amd: 'vue',
			root: 'Vue'
		}
    },
	module: {
		rules: [{
			test: /\.vue$/,
			loader: 'vue-loader',
			options: {
				loaders: {
					css: ExtractTextPlugin.extract({
						use: ['css-loader', 'postcss-loader'],
						fallback: 'vue-style-loader'
					}),
					less: ExtractTextPlugin.extract({
						use: ['css-loader', 'postcss-loader', 'less-loader'],
						fallback: 'vue-style-loader'
					})
				}
			},
			include: join('src')
		},
		{
			test: /\.js$/,
			loader: 'babel-loader',
			include: join('src')
		},
		{
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
				use: ['css-loader', 'postcss-loader'],
				fallback: 'vue-style-loader'
			})
		},
		{
			test: /\.less$/,
			use: ExtractTextPlugin.extract({
				use: ['css-loader', 'postcss-loader', 'less-loader'],
				fallback: 'vue-style-loader'
			}),
			include: join('src')
		},
		{
			test: /\.(jpe?g|png|gif)(\?.*)?$/,
			loader: 'file-loader',
			include: join('src/style/img'),				
			query: {
				name: '[name].[ext]',
				publicPath: './img/',
				outputPath: './img/'
			}
		},
		{
			test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
			loader: 'file-loader',
			include: join('src/style/fonts'),
			query: {
				name: '[name].[ext]',
				publicPath: './fonts/',
				outputPath: './fonts/'
			}
		}]
	},
	plugins: [
		new webpack.DefinePlugin({ 
	    	'process.env': {
	    		NODE_ENV: JSON.stringify('development')
	    	}
	    }),
		new CleanWebpackPlugin([join('dist')], {
			verbose: true,
			allowExternal: true
		}),
		new ExtractTextPlugin('mp-vue-tools.css')
	]
};