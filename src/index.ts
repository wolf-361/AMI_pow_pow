const express = require('express');
import {Express} from 'express';

const app:Express = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
