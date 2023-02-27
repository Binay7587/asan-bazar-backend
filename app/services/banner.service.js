const BannerModel = require("../model/banner.model");
const Joi = require("joi");

class BannerService {
    validateBanner = async (data) => {
        try {
            if (!data) {
                throw new Error('Empty payload.');
            } else {
                const bannerSchema = Joi.object().keys({
                    title: Joi.string()
                        .min(5)
                        .max(50)
                        .required(),
                    status: Joi.string().valid('active', 'inactive'),
                    link: Joi.string().empty(),
                    bannerImage: Joi.string().empty(),
                });

                return await bannerSchema.validateAsync(data);
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
            return await BannerModel.count();
        } catch (err) {
            throw err;
        }
    }

    // Get all banners
    getAllBanners = async (config) => {
        try {
            let skip = (config.page - 1) * config.perPage;
            return await BannerModel.find()
                .sort({ _id: 1 }) // Sort by ascending order
                .skip(skip)
                .limit(config.perPage);
        } catch (err) {
            throw err;
        }
    }

    // Get active banners
    getActiveBanners = async () => {
        try {
            return await BannerModel.find({
                status: 'active'
            })
                .sort({ _id: 1 }) // Sort by ascending order
                .limit(10);
        } catch (err) {
            throw err;
        }
    }

    // Get banner by id
    getBannerById = async (id) => {
        try {
            return await BannerModel.findById(id);
        } catch (err) {
            throw err;
        }
    }

    // Store banner
    storeBanner = async (data) => {
        try {
            let banner = new BannerModel(data);
            return await banner.save();
        } catch (err) {
            throw err;
        }
    }

    // Update banner
    updateBanner = async (id, data) => {
        try {
            return await BannerModel.findByIdAndUpdate(id, { $set: data }, { new: true });
        } catch (err) {
            throw err;
        }
    }

    // Delete banner
    deleteById = async (id) => {
        try {
            return await BannerModel.findByIdAndDelete(id);
        } catch (err) {
            throw err;
        }
    }
}

const bannerService = new BannerService();
module.exports = bannerService;