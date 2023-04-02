const CategoryModel = require("../model/category.model");
const Joi = require("joi");

class CategoryService {
    validateCategory = async (data) => {
        try {
            if (!data) {
                throw new Error('Empty payload.');
            } else {
                const categorySchema = Joi.object().keys({
                    title: Joi.string()
                        .min(5)
                        .max(300)
                        .required(),
                    parent: Joi.string().empty(),
                    status: Joi.string().valid('active', 'inactive'),
                    categoryImage: Joi.string().empty(),
                });

                return await categorySchema.validateAsync(data);
            }
        }
        catch (err) {
            if (err?.details) {
                throw err.details[0];
            }
            throw err;
        }
    }

    // Get Count
    getCount = async () => {
        try {
            return await CategoryModel.count();
        } catch (err) {
            throw err;
        }
    }

    // Get all categories
    getAllCategories = async (config) => {
        try {
            let skip = (config.page - 1) * config.perPage;
            return await CategoryModel.find()
                .populate('parent')
                .sort({ _id: -1 }) // Sort by descending order
                .skip(skip)
                .limit(config.perPage);
        } catch (err) {
            throw err;
        }
    }

    // Get active categories
    getActiveCategories = async () => {
        try {
            return await CategoryModel.find({
                status: 'active'
            })
                .populate('parent')
                .sort({ _id: -1 }) // Sort by descending order
                .limit(10);
        } catch (err) {
            throw err;
        }
    }

    // Get category by id
    getCategoryById = async (id) => {
        try {
            return await CategoryModel.findById(id).populate('parent');
        } catch (err) {
            throw err;
        }
    }

    // Store category
    storeCategory = async (data) => {
        try {
            let category = new CategoryModel(data);
            return await category.save();
        } catch (err) {
            throw err;
        }
    }

    // Update category
    updateCategory = async (id, data) => {
        try {
            return await CategoryModel.findByIdAndUpdate(id, { $set: data }, { new: true });
        } catch (err) {
            throw err;
        }
    }

    // Delete category
    deleteById = async (id) => {
        try {
            return await CategoryModel.findByIdAndDelete(id);
        } catch (err) {
            throw err;
        }
    }
}

const categoryService = new CategoryService();
module.exports = categoryService;