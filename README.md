# Protect(Secure?) Javascript Code

An example of obfuscating Angular components to make code as difficult to read as possible. (The purpose of a minifier is to optimise code for the faster delivery. Meanwhile, an obfuscator has a different intention. ) 

Start with [angular-7-webpack-4-boilerplate](https://github.com/samteb/angular-7-webpack-4-boilerplate)

#### webpack.config.prod.js 

```
+ var JavaScriptObfuscator = require('webpack-obfuscator');



module.exports = webpackMerge(commonConfig, {
    mode: 'production',

    output: {
        path: helpers.root('dist'),
        publicPath: '/',
+        filename: '[name].[hash].js'
-        chunkFilename: '[id].[hash].chunk.js'
    },

    optimization: {
        
        ...
        
        minimizer: [
            
            // minimize vendor-specific codes 
            new UglifyJsPlugin({
 +              test: /(vendor|runtime|polyfills).*\.js(\?.*)?$/i,
                cache: true,
                parallel: true
            }),
  
            ...
            
        ]
    },

    ...
    
    plugins: [
       
        ...
                // obfuscating user code only
 +       ,new JavaScriptObfuscator ({
 +             rotateUnicodeArray: true
 +             ,deadCodeInjection: true
 +             ,deadCodeInjectionThreshold: 1
 +             ,stringArrayEncoding: 'base64'
 +             ,stringArrayThreshold: 1
 +         }, [ 'vendor**.js','runtime**.js', 'polyfills**.js'] )
        
    ]
});
```

`deadCodeInjection`& `deadCodeInjectionThreshold`(0.4:default) insert 'garbage code' to make harder to be reverserd-engineered. Ultimately those options increase the filesize.

#### If you'd like to explore other options, visit [JavaScript Obfuscator Tool](https://obfuscator.io/)

#### Build & Run 

```
 $ npm run build:prod
 $ npm run serve
```



#### Related Posts :

- [javascript obfuscator](https://github.com/javascript-obfuscator/javascript-obfuscator)
- [webpack obfuscator](https://github.com/javascript-obfuscator/webpack-obfuscator)
- [100% correct way to split your chunks with Webpack](https://hackernoon.com/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758)
- [Misconceptions in Client-Side Security](https://medium.com/@pat_migliaccio/misconceptions-in-client-side-security-reverse-engineering-obfuscation-disguised-endpoints-dddfdafbc60e)
- [JS Deobfuscation](http://jsnice.org/)

