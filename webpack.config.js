const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


const cssExtract = new ExtractTextPlugin('mp-vue-tools.css');

module.exports = {
	entry: path.join(__dirname, 'src/index'),
	output: {
		filename: 'mp-vue-tools.js',
		path: path.join(__dirname, 'dist'),
		library: 'mp-vue-tools',
		libraryTarget: 'umd'
	},
	externals: {
		'vue': 'Vue',
		'mp-vue-tools': 'mp-vue-tools'
    },
	module: {
		rules: [
			{
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
				include: path.join(__dirname, 'src')
	    	},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: path.join(__dirname, 'src')
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
				include: path.join(__dirname, 'src')
			},
		    {
		        test: /\.(jpe?g|png|gif)?$/,
				loader: 'file-loader',
				include: path.join(__dirname, 'src/style/img'),				
		        query: {
			        name: '[name].[ext]',
			        publicPath: './',
			        outputPath: 'img/'
		        }
		    },
		    {
		        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
				loader: 'file-loader',
				include: path.join(__dirname, 'src/style/fonts'),
		        query: {
			        name: '[name].[ext]',
			        publicPath: './',
			        outputPath: 'fonts/'
		        }
		    }
		]
	},
	plugins: [
		new webpack.DefinePlugin({ 
	    	'process.env': {
	    		NODE_ENV: '"development"' // 环境定义
	    	}
	    }),
	    new CopyWebpackPlugin([{
	    	from: path.join(__dirname, 'src/vendor'),
	    	to: path.join(__dirname, 'dist/vendor')
	    }]),
		cssExtract
	]
};