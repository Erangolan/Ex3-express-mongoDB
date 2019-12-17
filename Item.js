const mongoose = require('mongoose');

const schema = {
    id: { type: Number, required: true},
    itemName: { type: String, required: true },
    firstPublished: { type: String, required:true },
    itemCategory: { type: String, required:true },
    reporter: { type: String, required:true },
}

const item_schema = new mongoose.Schema(schema);
const Item = mongoose.model('Item', item_schema);
module.exports = Item;