const Product = require('../models/product');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products=await Product.find({isDeleted: {$ne:true}});
    console.log("geeting products");
    res.status(200).json({"record Count":products.length,"products":products});
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');

    if (!product || product.isDeleted) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, brand, quantity, images, isFeatured } = req.body;
    
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      brand,
      quantity,
      images,
      isFeatured
    });

    await newProduct.save(); // Correct usage
    console.log(newProduct)
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: 'Error adding product', error: err.message });
  }
};

exports.bulkCreateProducts = async (req, res) => {
  try {
    const products = req.body;
    const saved = await Product.insertMany(products);
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Bulk creation failed', error });
  }
};


// Update an existing product
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, brand, quantity, images, isFeatured } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
        category,
        brand,
        quantity,
        images,
        isFeatured
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};

// Delete (soft delete) a product
exports.deleteProduct = async (req, res) => {
  try {
    const delProduct=await Product.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    if (!delProduct)
    {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({"Message: ": "error while deleting product","error message": error.message})
  }
};


exports.searchProductsByName = async (req, res) => {
  try {
    const keyword = req.query.q || ''; // get keyword from query string like ?q=p
    const regex = new RegExp(keyword, 'i'); // 'i' for case-insensitive match

    const products = await Product.find({
      name: { $regex: regex },
      isDeleted: { $ne: true }
    }).populate('category');

    res.status(200).json({ recordCount: products.length, products });
  } catch (error) {
    res.status(500).json({ message: 'Error searching products', error: error.message });
  }
};