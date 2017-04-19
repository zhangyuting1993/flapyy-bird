var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

var config = {
    entry: {
        game: [ __dirname + "/src/game.js"],
        lib: [__dirname + "/src/lib/hilo-standalone.js"]

    },
    output: {
        path: __dirname + "/dist",
        publicPath:"",
        filename: "js/[name].js",
        chunkFilename: "js/[name].js"
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ names: ['lib'] }),
        new HtmlWebpackPlugin({ // Also generate a test.html 
            filename: 'index.html',
            template: __dirname + "/src/index.html",
            chunks: ['lib', 'game'],
        })
    ],
    module:{
      loaders:[{
        test:/\.(?:jpg|png)/,
        loaders:["url-loader?limit=80&name=img/[name].[ext]"]
      }]


    }

};

webpack(config).run(function(){});

