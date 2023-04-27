const express = require('express');

const routeAuth = require('./routes/auth.route');

const app = express();

const port = 3000;

app.use(express.json());

app.listen(port, () => console.log('server started'));

app.use('/auth', routeAuth);