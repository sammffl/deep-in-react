'use strict'
var path = require('path');

module.exports = function(config){
    if(process.env.RELEASE) {
        config.singleRun = true;
    }

    config.set({
        basePath: '../',
        frameworks: ['mocha', 'chai'],
        files: [
            {
                pattern: 'test/index.js',
                included: true,
                watched: false,
            }
        ],
        exclude: [
            'test/civerage/**',
            'node_modules',
        ],
        preprocessors: {
            'test/index.js': ['wabpack', 'sourcemap'],
        }
        webpack: {
            devtool: 'inline-source-map',
            module: {
                noParse: [
                    /node_modules\/sinon\//,
                ],
                loaders:[
                    {
                        test: /\.js$/,
                        include: [
                            /src|test|recharts/,
                        ],
                        exclude: /node_modules/,
                        loader: 'babel',
                    },
                    {
                        test: /\.json$/,
                        loader: 'json',
                    }
                ],
                postLoaders: [
                    {
                        test: /\.js$/,
                        include: /src/,
                        exclude: /node_modules/,
                        loader: 'istanbul-instrumenter'
                    }
                ]
            },
            externals: {
                'jsdom': 'window',
                'react/lib/ExcecutionEnvironment': true,
                'react/lib/ReactContext': 'window',
                'text-encoding': 'window',
            },
            resolve: {
                alias: {
                    'sinon': 'sinon/pkg/sinon',
                    'recharts': path.resolve('./src/index.js'),
                }
            },
            stats: {
                assets: false,
                colors: true,
                version: false,
                hash: false,
                timing: false,
                chunks: false,
                chunkModules: false,
            },
            debug: false,
        },
        plugins: [
            'karma-webpack',
            'karma-mocha',
            'karma-coverage',
            'karma-chai',
            'karma-sourcemap-loader',
            'karma-chrome-launcher',
            'istanbul-instrumenter-loader',
            'karma-coveralls',
        ],
        reporters: ['progress', 'coverage', 'coveralls'],
        coverageReporter: {
            dir: 'test',
            reporters: [
                {
                    type: 'html',
                    subdir: 'coverage',
                },
                {
                    type: 'text',
                },
                {
                    type: 'lcov',
                    subdir: 'coverage',
                }
            ]
        },
        webpackMiddleware: {
            noInfo: true,
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        browser: ['Chrome'],
        browserNoActivityTimeout: 60000,


    });
};
