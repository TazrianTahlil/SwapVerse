import Product from "../models/product.model.js";
import User from "../models/user.model.js"; // To populate ownerName

/**
 * GET /api/products
 * Optional filters:
 *  - ?actionType=sell|trade|donate
 *  - ?category=Books|Electronics
 */
export const getProducts = async (req, res) => {
  try {
    const { actionType, category } = req.query;
    const filter = {};

    if (actionType) filter.actionType = actionType;
    if (category) filter.category = category;

    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .populate('ownerId', 'fullName'); // populate owner's fullName

    // Add ownerName dynamically
    const result = products.map(p => ({
      ...p._doc,
      ownerName: p.ownerId?.fullName,
    }));

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET /api/products/:id
 */
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('ownerId', 'fullName');

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const result = {
      ...product._doc,
      ownerName: product.ownerId?.fullName,
    };

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: "Invalid product ID" });
  }
};

/**
 * POST /api/products
 * Create sell / trade / donate
 * ownerId and ownerName are taken from req.user
 */
export const createProduct = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const product = await Product.create({
      ...req.body,
      ownerId: req.user._id,
      ownerName: req.user.fullName,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * PUT /api/products/:id
 * Update own product
 */
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Ownership check
    if (!req.user || product.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    // Populate ownerName dynamically
    await updatedProduct.populate('ownerId', 'fullName');
    const result = {
      ...updatedProduct._doc,
      ownerName: updatedProduct.ownerId?.fullName,
    };

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * DELETE /api/products/:id
 */
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (!req.user || product.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await product.deleteOne();
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
