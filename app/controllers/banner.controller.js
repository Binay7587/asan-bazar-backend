const bannerService = require('../services/banner.service');

class BannerController {
    // List all banners
    listAllBanners = async (req, res, next) => {
        try {
            // ?page=1&perPage=10
            let currentPage = Number(req.query.page) ?? 1;
            let perPage = Number(req.query.perPage) ?? 10;

            const banners = await bannerService.getAllBanners({ page: currentPage, perPage: perPage });

            res.json({
                result: banners,
                msg: "Banners fetched successfully.",
                status: true,
                meta: {
                    currentPage: currentPage,
                    perPage: perPage,
                    total: await bannerService.getCount()
                }
            });
        }
        catch (err) {
            next({ status: 400, msg: "List Error:", err });
        }
    }

    // List banners for homepage
    listForHomepage = async (req, res, next) => {
        try {
            const banners = await bannerService.getActiveBanners();

            res.json({
                result: banners,
                msg: "Banners fetched successfully.",
                status: true,
                meta: null
            });
        }
        catch (err) {
            next({ status: 400, msg: "List Error:", err });
        }
    }
}

const bannerController = new BannerController();
module.exports = bannerController;