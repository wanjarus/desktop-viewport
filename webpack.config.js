const webpack = require('webpack');
const config = require('./src/config.js');

const WrapperPlugin = require('wrapper-webpack-plugin');

let webpackConfig = {
	entry: {
		'bundle': './src/main.js'
	},
	devtool: 'source-map',
	output: {
		path: './dist',
		filename: config.webpack.bundle,
		library: config.webpack.library,
		libraryTarget: 'umd'
	},
	module: {
		rules: [
			{
				test: /.js?$/,
				loader: 'babel-loader',
				query: {
					presets: ['env'],
					plugins: ['transform-object-assign']
				}
			}
		]
	},
	resolve: {
		modules: ['src','node_modules', 'bower_components'],
		extensions: ['.js', '.jsx']
	},
	plugins: [
		new WrapperPlugin({
			footer: `if(window.${config.webpack.library} && typeof window.${config.webpack.library} === 'function'){window.${config.webpack.library} = window.${config.webpack.library}()}`
		}),
		new webpack.BannerPlugin(
			config.webpack.banner
		)
	]
};

module.exports = webpackConfig;