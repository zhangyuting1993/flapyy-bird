var HtmlWebpackPlugin = require('html-webpack-plugin');
var server = require('webpack-dev-server');
var webpack = require('webpack');

var config = {
    entry: {
        game: ['webpack-dev-server/client?http://127.0.0.1:8080/','webpack/hot/only-dev-server', __dirname + "/src/game.js"],
        lib: [__dirname + "/src/lib/hilo-standalone.js"]

    },
    output: {
        path: __dirname + "/dist",
        publicPath:"http://127.0.0.1:8080/",
        filename: "js/[name].js",
        chunkFilename: "js/[name].js"
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ names: ['lib'] }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({ // Also generate a test.html 
            filename: 'index.html',
            template: __dirname + "/src/index.html",
            chunks: ['lib', 'game'],
        })
    ],
    module:{
      loaders:[{
        test:/\.(?:jpg|png)/,
        loaders:["url-loader?limit=80&name=[name].[ext]"]
      }]


    }

};

new server(webpack(config), {
    hot: false,
    inline: true,
    compress: true,
    stats: {
        chunks: false,
        children: false,
        colors: true
    },
    historyApiFallback: true
}).listen("8080", "127.0.0.1", function() {
    console.log("suc");
})