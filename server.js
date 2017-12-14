const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParer = require('body-parser');

//adding webpack for config automatically with server
const webpackConfig = require('./webpack.config');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');


const compiler = webpack(webpackConfig);

var app = express();

//this is where we can compile the react section automatically after changes
app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));

//adding the body-parser for working with any body that will come form restful api
app.use(bodyParer.json());
app.use(bodyParer.urlencoded({
    extended: true
}));

//set the view engine to html
app.set('view engine', 'html');
app.engine('html', (path, options, callback) => {
    fs.readFile(path, 'utf-8', callback);
})

//set the static part that contain all the react section
app.use(express.static(path.join(__dirname, 'client')));

//handle the root for rendering the main html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'clinet/index.html'));
});

//error hander
app.use((err,req,res,next)=>{
    res.status(err.status || 500);
})

// setting the port that we can access from the browser
const port = 8000;

//listening for any request from the specific port to render the page
app.listen(port, () => {
    console.log(`we are listening on port ${port} `);
})