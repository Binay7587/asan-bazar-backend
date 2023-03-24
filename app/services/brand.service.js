const BrandModel = require("../model/brand.model");
const Joi = require("joi");

class BrandService {
    validateBrand = async (data) => {
        try {
            if (!data) {
                throw new Error('Empty payload.');
            } else {
                const brandSchema = Joi.object().keys({
                    title: Joi.string()
                        .min(5)
                        .max(50)
                        .required(),
                    status: Joi.string().valid('active', 'inactive'),
                    slug: Joi.string().empty(),
                    brandImage: Joi.string().empty(),
                });

                return await brandSchema.validateAsync(data);
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
            return await BrandModel.count();
        } catch (err) {
            throw err;
        }
    }

    // Get all brands
    getAllBrands = async (config) => {
        try {
            let skip = (config.page - 1) * config.perPage;
            return await BrandModel.find()
                .sort({ _id: -1 }) // Sort by descending order
                .skip(skip)
                .limit(config.perPage);
        } catch (err) {
            throw err;
        }
    }

    // Get active brands
    getActiveBrands = async () => {
        try {
            return await BrandModel.find({
                status: 'active'
            })
                .sort({ _id: -1 }) // Sort by descending order
                .limit(10);
        } catch (err) {
            throw err;
        }
    }

    // Get brand by id
    getBrandById = async (id) => {
        try {
            return await BrandModel.findById(id);
        } catch (err) {
            throw err;
        }
    }

    // Store brand
    storeBrand = async (data) => {
        try {
            let brand = new BrandModel(data);
            return await brand.save();
        } catch (err) {
            throw err;
        }
    }

    // Update brand
    updateBrand = async (id, data) => {
        try {
            return await BrandModel.findByIdAndUpdate(id, { $set: data }, { new: true });
        } catch (err) {
            throw err;
        }
    }

    // Delete brand
    deleteById = async (id) => {
        try {
            return await BrandModel.findByIdAndDelete(id);
        } catch (err) {
            throw err;
        }
    }
}

const brandService = new BrandService();
module.exports = brandService;