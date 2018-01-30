const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = require('./config');
const rootPath = config.rootPath;

const cssExtract = new ExtractTextPlugin('mp-vue-tools.css');

module.exports = {
	entry: path.join(rootPath, 'src/index'),
	output: {
		filename: 'mp-vue-tools.js',
		path: path.join(rootPath, 'dist')
	},
	resolve: {
		extensions: ['.js', '.vue']
	},
	externals: {
        'vue': 'window.Vue'
    },
	module: {
		rules: [
			{
		        test: /\.vue$/,
		        loader: 'vue-loader',
		        options: {
		        	loaders: {
		        		css: ExtractTextPlugin.extract({
		        			use: ['css-loader', 'autoprefixer-loader'],
		        			fallback: 'vue-style-loader'
		        		}),
		        		less: ExtractTextPlugin.extract({
		        			use: ['css-loader', 'autoprefixer-loader', 'less-loader'],
		        			fallback: 'vue-style-loader'
		        		})
		        	}
		        }
	    	},
			{
				test: /\.js$/,
				loader: 'babel-loader'
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					use: ['css-loader', 'autoprefixer-loader'],
					fallback: 'vue-style-loader'
				})
			},
			{
				test: /\.less$/,
				use: ExtractTextPlugin.extract({
					use: ['css-loader', 'autoprefixer-loader', 'less-loader'],
					fallback: 'vue-style-loader'
				})
			},
		    {
		        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
		        loader: 'file-loader',
		        query: {
			        name: '[name].[ext]',
			        publicPath: '../../',
			        outputPath: 'static/fonts/'
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
	    	from: path.join(rootPath, 'src/static'),
	    	to: path.join(rootPath, 'dist/static')
	    }]),
	    /*new webpack.optimize.UglifyJsPlugin({ // 压缩JS 生产环境
		    compress: {
		    	warnings: false
		    }
	    }),*/
		cssExtract
	]
};