const mongoose = require('mongoose');
const Item = require('./Item');

const { DB_USER, DB_PASS, DB_HOST } = require('./constants');
const url = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}`;


const options = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.connect(url, options);
const connection = mongoose.connection;
connection.on('error', err => console.error('connection error: ', err));
connection.once('open', () => console.log('connected to: ', connection.name));

module.exports = {
    async getAllItems(req, res, next){
        const result = await Item.find({});
        if (result){
            res.json(result);
            console.log(result);
        } else {
            res.status(404).send('not found');
        }
    },
    async getItem(req, res, next){
        const { id = null } = req.params;
        const result = await Item.findOne({id});
        if (result){
            res.json(result);
            console.log(result);
        } else {
            res.status(404).send('id not found');
        }
    },
    async editItem(req, res, next){
        const { id = null } = req.params;
        const { itemName = null, FirstPublished = null, itemCategory = null, reporter = null } = req.body;
        const result = await Item.updateOne({ id }, { itemName, itemCategory, FirstPublished, reporter });
        if (result) {
            res.json(`item ${id} udated successfully!`);
            console.log(`item ${id} udated successfully!`);
        } else {
            res.status(404).send('not found');
        }
    },
    async addItem(req, res, next){
        const { id = null, itemName = null, firstPublished = null, itemCategory = null, reporter = null } = req.body;
        const item = new Item({id, itemName, firstPublished, itemCategory, reporter});
        const result = await item.save();
        if (result){
            res.json(result);
            console.log(result);
        } else {
            res.status(404).send('not found');
        }
    },
    async removeItem(req, res, next){
        const { id = null } = req.params;
        const result = await Item.deleteOne({id});
        if (result){
            res.json(result);
            console.log(result);
        } else {
            res.status(404).send('not found');
        }
    },
};   
