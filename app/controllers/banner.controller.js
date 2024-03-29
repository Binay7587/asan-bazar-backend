const { deleteImage } = require('../../config/functions');
const bannerService = require('../services/banner.service');

class BannerController {
    // List all banners
    listAllBanners = async (req, res, next) => {
        try {
            // ?page=1&perPage=10
            let currentPage = Number(req.query.page ?? 1);
            let perPage = Number(req.query.perPage ?? 10);

            const banners = await bannerService.getAllBanners({ page: currentPage, perPage: perPage });

            res.json({
                result: banners,
                msg: "Banners fetched successfully.",
                status: true,
                meta: {
                    currentPage: currentPage,
                    perPage: perPage,
                    totalCount: await bannerService.getCount()
                }
            });
        }
        catch (err) {
            next({ status: 400, msg: `List Error: ${err.message ?? err}` });
        }
    }

    // List active banners for homepage
    listActiveBanners = async (req, res, next) => {
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
            next({ status: 400, msg: `List Error: ${err.message ?? err}` });
        }
    }

    // Create a new banner
    createBanner = async (req, res, next) => {
        try {
            let payload = req.body;
            if (req.file) {
                payload.bannerImage = `/bannerImage/${req.file.filename}`;
            }
            //validation
            let validatedData = await bannerService.validateBanner(payload);
            //save to db
            let banner = await bannerService.storeBanner(validatedData);

            res.json({
                result: banner,
                msg: "Banner created successfully.",
                status: true,
                meta: null
            });
        }
        catch (err) {
            next({ status: 400, msg: `Create Error: ${err.message ?? err}` });
        }
    }

    fetchBannerById = async (req, res, next) => {
        try {
            let banner = await bannerService.getBannerById(req.params.id);
            if (!banner) {
                throw ('Banner not found.');
            }
            res.json({
                result: banner,
                message: "Banner fetched successfully",
                status: true,
                meta: null
            })
        } catch (err) {
            next({ status: 400, message: `Fetch error: ${err.message ?? err}` });
        }
    }

    // Update a banner
    updateBanner = async (req, res, next) => {
        try {
            let payload = req.body;
            let bannerData = await bannerService.getBannerById(req.params.id);
            if (req.file) {
                payload.bannerImage = `/bannerImage/${req.file.filename}`; // new image
                deleteImage(`${process.cwd()}/public/uploads/images`, bannerData.bannerImage); // delete old image
            } else {
                payload.bannerImage = bannerData.bannerImage; // keep old image
            }
            //validation
            let validatedData = await bannerService.validateBanner(payload);
            //save to db
            let banner = await bannerService.updateBanner(req.params.id, validatedData);

            res.json({
                result: banner,
                msg: "Banner updated successfully.",
                status: true,
                meta: null
            });
        }
        catch (err) {
            next({ status: 400, msg: `Update Error: ${err.message ?? err}` });
        }
    }

    // Delete a banner
    deleteBannerById = async (req, res, next) => {
        try {
            let response = await bannerService.deleteById(req.params.id);
            if (response) {
                if (response.bannerImage) {
                    deleteImage(`${process.cwd()}/public/uploads/images`, response.bannerImage);
                }
                res.json({
                    result: response,
                    msg: "Banner deleted successfully.",
                    status: true,
                    meta: null
                });
            } else {
                throw ('Banner already deleted or does not exist.');
            }
        }
        catch (err) {
            next({ status: 400, msg: `Delete Error: ${err.message ?? err}` });
        }
    }
}

const bannerController = new BannerController();
module.exports = bannerController;
