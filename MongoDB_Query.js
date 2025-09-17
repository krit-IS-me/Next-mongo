/* global use, db */
// MongoDB Playground
// Select the database
use('mongodbVSCodePlaygroundDB');

// Reset the collection for a clean slate
db.getCollection('sales').deleteMany({});


// 1. Insert sample documents
db.getCollection('sales').insertMany([
  { item: 'abc', price: 10, quantity: 2, date: new Date('2014-03-01T08:00:00Z') },
  { item: 'jkl', price: 20, quantity: 1, date: new Date('2014-03-01T09:00:00Z') },
  { item: 'xyz', price: 5, quantity: 10, date: new Date('2014-03-15T09:00:00Z') },
  { item: 'xyz', price: 5, quantity: 20, date: new Date('2014-04-04T11:21:39.736Z') },
  { item: 'abc', price: 10, quantity: 10, date: new Date('2014-04-04T21:23:13.331Z') },
  { item: 'def', price: 7.5, quantity: 5, date: new Date('2015-06-04T05:08:13Z') },
  { item: 'def', price: 7.5, quantity: 10, date: new Date('2015-09-10T08:43:00Z') },
  { item: 'abc', price: 10, quantity: 5, date: new Date('2016-02-06T20:20:13Z') },
]);

// 2. Count sales on April 4th, 2014
const salesOnApril4th = db.getCollection('sales').find({
  date: {
    $gte: new Date('2014-04-04'),
    $lt: new Date('2014-04-05')
  }
}).count();
console.log(`${salesOnApril4th} sales occurred on April 4th, 2014.`);

// 3. Aggregation: Total sales per product in 2014
const totalSales2014 = db.getCollection('sales').aggregate([
  { $match: { date: { $gte: new Date('2014-01-01'), $lt: new Date('2015-01-01') } } },
  { $group: { _id: '$item', totalSaleAmount: { $sum: { $multiply: ['$price', '$quantity'] } } } }
]);
totalSales2014.toArray(); // This will show results in the output panel

// --- TASKS ---

// 4. Show all sales of item 'abc'
db.getCollection('sales').find({ item: 'abc' }).toArray(); // shows in output panel

// 5. Find total sales (price × quantity) of item 'abc'
db.getCollection('sales').aggregate([
  { $match: { item: 'abc' } },
  {
    $group: {
      _id: null,
      totalSalesAmount: { $sum: { $multiply: ['$price', '$quantity'] } }
    }
  }
]).toArray(); // shows result in output panel

// 6. Change all 'abc' to 'xyz'
const updateResult = db.getCollection('sales').updateMany(
  { item: 'abc' },
  { $set: { item: 'xyz' } }
);
console.log(`Updated ${updateResult.modifiedCount} documents from 'abc' to 'xyz'.`);

// 7. Delete all 'xyz'
const deleteResult = db.getCollection('sales').deleteMany({ item: 'xyz' });
console.log(`Deleted ${deleteResult.deletedCount} documents with item 'xyz'.`);

db.getCollection('sales').find().toArray();
