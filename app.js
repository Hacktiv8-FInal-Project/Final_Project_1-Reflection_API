const express = require('express');
const app = express();
PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
    });

app.listen(3000, () => {
    console.log('Example app listening on!' + PORT);
    }
);