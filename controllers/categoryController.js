const Category = require('../models/category');

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isDeleted: { $ne: true } });
    res.status(200).json({"record Count":categories.length,"categories":categories});
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// Get a category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category || category.isDeleted) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

//Get a category by Name

exports.getCategoryByName = async (req, res) => {
  try {
    const { name } = req.params;
    console.log("Searching category by name:", name);

    const category = await Category.find({
      name: name,
      isDeleted: { $ne: true }
    });

    if (category.length === 0) {
      return res.status(404).json({ message: 'No category found with the given name' });
    }

    res.status(200).json({
      recordCount: category.length,
      category
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};



// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = new Category({ name, description });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ message: 'Error creating category', error: err.message });
  }
};

// Update a category
exports.updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json({ message: 'Error updating category', error: err.message });
  }
};

// Delete (soft delete) a category
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

exports.bulkCreateCategories = async (req, res) => {
  try {
    const categories = req.body;
    const saved = await Category.insertMany(categories);
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Bulk creation failed', error });
  }
};
