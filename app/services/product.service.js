const ProductModel = require("../model/product.model");
const Joi = require("joi");

class ProductService {
    validateProduct = async (data) => {
        try {
            if (!data) {
                throw new Error('Empty payload.');
            } else {
                const productSchema = Joi.object({
                    title: Joi.string()
                        .min(5)
                        .max(300)
                        .required(),
                    categoryId: Joi.array().items(Joi.string()).allow(null),
                    description: Joi.string().allow(null, ''),
                    price: Joi.number().min(1).required(),
                    discount: Joi.number().min(0).max(100).default(0),
                    status: Joi.string().valid('active', 'inactive').default('inactive'),
                    featured: Joi.boolean().default(false),
                    brand: Joi.string().allow(null, ''),
                    productImage: Joi.array().items(Joi.string()).allow(null),
                    delImages: Joi.array().items(Joi.string()).allow(null),
                    sellerId: Joi.string().allow(null),
                });

                return await productSchema.validateAsync(data);
            }
        }
        catch (err) {
            if (err?.details) {
                throw err.details[0];
            }
            throw err;
        }
    }

    getProductByTitle = async (title) => {
        try {
            return await ProductModel.findOne({ title: title });
        } catch (err) {
            throw err;
        }
    }

    // Get Count
    getCount = async () => {
        try {
            return await ProductModel.count();
        } catch (err) {
            throw err;
        }
    }

    // Get all products
    getAllProducts = async (config) => {
        try {
            let skip = (config.page - 1) * config.perPage;
            return await ProductModel.find()
                .populate('categoryId')
                .populate('sellerId')
                .populate('brand')
                .populate('createdBy')
                .sort({ _id: -1 }) // Sort by descending order
                .skip(skip)
                .limit(config.perPage);
        } catch (err) {
            throw err;
        }
    }

    // Get active products
    getActiveProducts = async (filter = { status: 'active' }) => {
        try {
            return await ProductModel.find(filter)
                .populate('categoryId')
                .populate('sellerId')
                .populate('brand')
                .populate('createdBy')
                .sort({ _id: -1 }) // Sort by descending order
                .limit(10);
        } catch (err) {
            throw err;
        }
    }

    // Get product by id
    getProductById = async (id) => {
        try {
            return await ProductModel.findById(id).populate('categoryId')
                .populate('sellerId')
                .populate('brand')
                .populate('createdBy');
        } catch (err) {
            throw err;
        }
    }

    // Get product by slug
    getProductBySlug = async (slug) => {
        try {
            return await ProductModel.findOne({ slug: slug }).populate('categoryId')
                .populate('sellerId')
                .populate('brand')
                .populate('createdBy');
        } catch (err) {
            throw err;
        }
    }

    // Store product
    storeProduct = async (data) => {
        try {
            let product = new ProductModel(data);
            return await product.save();
        } catch (err) {
            throw err;
        }
    }

    // Update product
    updateProduct = async (id, data) => {
        try {
            return await ProductModel.findByIdAndUpdate(id, { $set: data }, { new: true });
        } catch (err) {
            throw err;
        }
    }

    // Delete product
    deleteById = async (id) => {
        try {
            return await ProductModel.findByIdAndDelete(id);
        } catch (err) {
            throw err;
        }
    }
}

const productService = new ProductService();
module.exports = productService;