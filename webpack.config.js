var path = require('path')
var webpack = require("webpack")
var GenerateJsonPlugin = require('generate-json-webpack-plugin')
var packageJson = require('./package.json')

var entry = './src/bundle.ts'
var entryWithWorker = './src/bundle.worker.ts'

var packagePlatformJson = {
    'name': 'node-vibrant',
    'version': packageJson.version,
    'keywords': packageJson.keywords,
    'homepage': packageJson.homepage,
    'license': packageJson.license,
    'files': [
      'vibrant.js',
      'vibrant.js.map',
      'vibrant.min.js',
      'vibrant.worker.js',
      'vibrant.worker.js.map',
      'vibrant.worker.min.js',
    ],
    'repository': packageJson.repository,
    'dependencies': packageJson.dependencies,
};

module.exports = {
    entry: {
        'vibrant': entry,
        'vibrant.min': entry,
        'vibrant.worker': entryWithWorker,
        'vibrant.worker.min': entryWithWorker
    },
    devtool: "source-map",
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    configFileName: 'tsconfig.browser.json'
                }
            }
        ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        }),
        new GenerateJsonPlugin(
            'package.json',
            packagePlatformJson,
            undefined,
            2
        )
    ]
}