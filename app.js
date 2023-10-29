const express = require('express');
const app = express();
const routes = require('./routes/index')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

app.use(routes)


module.exports = app