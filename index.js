const express = require('express');
const morgan = require('morgan');
const ctrl = require('./controller');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/items', ctrl.getAllItems);
app.get('/item/:id', ctrl.getItem);

app.put('/item/:id', ctrl.editItem);
app.post('/item/', ctrl.addItem);
app.post('/remove', ctrl.removeItem);

app.listen(port,
    () => console.log('Express server listening on: ', port));