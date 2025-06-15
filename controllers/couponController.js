const Coupon = require('../models/cupon');

// Get all active (non-deleted) coupons
exports.getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({ isDeleted: { $ne: true } });
    res.status(200).json({ recordCount: coupons.length, coupons });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get a coupon by ID
exports.getCouponById = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon || coupon.isDeleted) {
      return res.status(404).json({ message: 'Coupon not found' });
    }
    res.status(200).json(coupon);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Create a new coupon
exports.createCoupon = async (req, res) => {
  try {
    const { code, discount, expiresAt } = req.body;

    const existing = await Coupon.findOne({ code });
    if (existing && !existing.isDeleted) {
      return res.status(400).json({ message: 'Coupon code already exists' });
    }

    const coupon = new Coupon({ code, discount, expiresAt });
    await coupon.save();
    res.status(201).json({ message: 'Coupon created successfully', coupon });
  } catch (error) {
    res.status(400).json({ message: 'Error creating coupon', error: error.message });
  }
};

// Update an existing coupon
exports.updateCoupon = async (req, res) => {
  try {
    const updates = req.body;

    const updatedCoupon = await Coupon.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    if (!updatedCoupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }

    res.status(200).json({ message: 'Coupon updated successfully', coupon: updatedCoupon });
  } catch (error) {
    res.status(400).json({ message: 'Error updating coupon', error: error.message });
  }
};

// Delete (soft delete) a coupon
exports.deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );

    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }

    res.status(200).json({ message: 'Coupon soft-deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
