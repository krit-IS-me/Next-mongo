import 'dotenv/config';
import mongoose from 'mongoose';
import dbConnect from '../lib/db.js';
import Category from '../models/Category.js';
import Product from '../models/Product.js';

async function seed() {
  await dbConnect();

  // Create sample category
  const category = new Category({ name: 'Kitchenware' });
  await category.save();
  console.log('Category created:', category);

  // Create sample product
  const product = new Product({
    code: 'p123',
    name: 'Cup',
    description: 'A humble little cup',
    price: 10,
    category: category._id
  });
  await product.save();
  console.log('Product created:', product);

  mongoose.connection.close();
}

seed().catch(console.error);
