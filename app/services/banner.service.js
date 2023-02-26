const BannerModel = require("../model/banner.model");

class BannerService {

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
}

const bannerService = new BannerService();
module.exports = bannerService;