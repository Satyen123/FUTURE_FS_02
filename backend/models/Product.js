// backend/models/Product.js
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, default: 0 },
  imageUrl: { type: String, required: true },
  category: { type: String },
  countInStock: { type: Number, required: true, default: 0 },
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;