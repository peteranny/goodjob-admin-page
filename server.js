// @flow
const express = require('express');
const path = require('path');
const { appBuild } = require('./config/paths');

const app = express();
const PORT = process.env.PORT || 80;

app.use(express.static(appBuild));

app.get('*', (req, res) => res.sendFile(path.join(appBuild, '/index.html')));

app.listen(PORT, () => console.log(`the app listening on ${PORT}!`));
