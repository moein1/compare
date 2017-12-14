const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParer = require('body-parser');

//adding webpack for config automatically with server
const webpackConfig = require('./webpack.config');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

//this is where we can compile the react section automatically after changes
const compiler = webpack(webpackConfig);

var app = express();

app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));

app.use(bodyParer.json());
app.use(bodyParer.urlencoded({
    extended: true
}));

//set the view engine to html
app.set('view engine', 'html');
app.engine('html', (path, options, callback) => {
    fs.readFile(path, 'utf-8', callback);
})

app.use(express.static(path.join(__dirname, 'client')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'clinet/index.html'));
});

const port = 8000;

app.listen(port, () => {
    console.log(`we are listening on port ${port} `);
})