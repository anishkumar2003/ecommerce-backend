const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");

require("dotenv").config();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

afterEach(async () => {
  await Category.deleteMany(); // clean after each test
});

describe('Category Model Test', () => {
  test('should save a valid category', async () => {
    const cat = new Category({ name: 'Electronics', description: 'Gadgets' });
    const savedCat = await cat.save();

    expect(savedCat.name).toBe('Electronics');
    expect(savedCat.description).toBe('Gadgets');
    expect(savedCat.isDeleted).toBe(false);
    expect(savedCat.createdAt).toBeDefined();
    expect(savedCat.updatedAt).toBeDefined();
  });

  test('should not save a category without a name', async () => {
    const cat = new Category({ description: 'No name' });
    let err;
    try {
      await cat.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeDefined();
    expect(err.errors.name).toBeDefined();
  });

  test('should not save duplicate category name', async () => {
    const cat1 = new Category({ name: 'Books' });
    const cat2 = new Category({ name: 'Books' });

    await cat1.save();

    let err;
    try {
      await cat2.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeDefined();
    // Depending on your MongoDB version and index setup, you may get either:
    // a MongoError or Mongoose ValidationError
    expect(err.message).toMatch(/duplicate key/i);
  });
});
