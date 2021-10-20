// import resourse
const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const mockAPIResponse = require('./mockAPI.js');

// setup server
const app = express();
app.use(cors());
// to use json
app.use(express.json());
// to use url encoded values
app.use(express.urlencoded({ extended: true }));

// using environment variable
dotenv.config();
const apiKey = process.env.API_KEY;

// declare variable to use when fetch data
const txt = 'Main dishes were quite good, but desserts were too sweet for me.';
const url = `https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&lang=auto&txt=${txt}`;

// get data from MeaningCloud API
const data = {};

async function getData() {
	try {
		const fetchData = await fetch(url);
		const dataResponse = await fetchData.json();

		return dataResponse;
	} catch (error) {
		alert(error);
	}
}

getData().then((dataResponse) => Object.assign(data, dataResponse));

// setup static direction to dist folder
app.use(express.static('dist'));

// routing
app.get('/', function (req, res) {
	res.sendFile('dist/index.html');
	// res.sendFile(path.resolve('src/client/views/index.html'));
});

app.get('/test', function (req, res) {
	res.send(mockAPIResponse);
});

app.get('/data', function (req, res) {
	res.send(data);
});

// run server at port 8081
app.listen(8081, function () {
	console.log('Example app listening on port 8081!');
});
