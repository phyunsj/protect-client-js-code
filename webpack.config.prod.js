'use strict';

const webpackMerge            = require('webpack-merge');
const ngw                     = require('@ngtools/webpack');
const UglifyJsPlugin          = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano                 = require('cssnano');

const commonConfig            = require('./webpack.config.common');
const helpers                 = require('./helpers');

var JavaScriptObfuscator = require('webpack-obfuscator');



module.exports = webpackMerge(commonConfig, {
    mode: 'production',

    output: {
        path: helpers.root('dist'),
        publicPath: '/',
        filename: '[name].[hash].js'
        //,chunkFilename: '[id].[hash].chunk.js'
    },

    optimization: {
        noEmitOnErrors: true,
        splitChunks: {
            chunks: 'all'
        },
        runtimeChunk: 'single',
        minimizer: [
            
            new UglifyJsPlugin({
                test: /(vendor|runtime|polyfills).*\.js(\?.*)?$/i,
                cache: true,
                parallel: true
            }),
  
            new OptimizeCSSAssetsPlugin({
                cssProcessor: cssnano,
                cssProcessorOptions: {
                    discardComments: {
                        removeAll: true
                    }
                },
                canPrint: false
            })
        ]
    },

    module: {
        rules: [
            {
                test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
                loader: '@ngtools/webpack'
            }
        ]
    },

    plugins: [
        new ngw.AngularCompilerPlugin({
            tsConfigPath: helpers.root('tsconfig.aot.json'),
            entryModule: helpers.root('src', 'app', 'app.module#AppModule')
        })

        ,new JavaScriptObfuscator ({
              rotateUnicodeArray: true
              ,deadCodeInjection: true
              ,deadCodeInjectionThreshold: 1
              ,stringArrayEncoding: 'base64'
              ,stringArrayThreshold: 1
          }, [ 'vendor**.js','runtime**.js', 'polyfills**.js'] )
        
    ]
});