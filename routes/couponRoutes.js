const express = require('express');
const router = express.Router();

const couponController = require('../controllers/couponController');

// Get all coupons
router.get('/', couponController.getAllCoupons);

// Get a coupon by ID
router.get('/:id', couponController.getCouponById);

// Create a new coupon
router.post('/', couponController.createCoupon);

// Update a coupon by ID
router.put('/:id', couponController.updateCoupon);

// Delete (soft delete) a coupon
router.delete('/:id', couponController.deleteCoupon);

module.exports = router;
