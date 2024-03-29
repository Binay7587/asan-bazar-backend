const { deleteImage } = require('../../config/functions');
const brandService = require('../services/brand.service');
const slugify = require('slugify');

class BrandController {
    fetchBrandCount = async (req, res, next) => {
        try {
            const count = await brandService.getCount();
            res.json({
                result: count,
                msg: "Brand count fetched successfully.",
                status: true,
                meta: null
            });
        }
        catch (err) {
            next({ status: 400, msg: `Count Error: ${err.message ?? err}` });
        }
    }
    
    // List all brands
    getAllBrandsList = async (req, res, next) => {
        try {
            // ?page=1&perPage=10
            let currentPage = Number(req.query.page ?? 1);
            let perPage = Number(req.query.perPage ?? 10);

            const brands = await brandService.getAllBrandsList({ page: currentPage, perPage: perPage });

            res.json({
                result: brands,
                msg: "Brands fetched successfully.",
                status: true,
                meta: {
                    currentPage: currentPage,
                    perPage: perPage,
                    totalCount: await brandService.getCount()
                }
            });
        }
        catch (err) {
            next({ status: 400, msg: `List Error: ${err.message ?? err}` });
        }
    }

    getAllBrands = async (req, res, next) => {
        try {
            const brands = await brandService.getAllBrands();

            res.json({
                result: brands,
                msg: "All Brands fetched successfully.",
                status: true,
                meta: null
            });
        }
        catch (err) {
            next({ status: 400, msg: `List Error:  ${err.message ?? err}` });
        }
    }

    // List active brands for homepage
    listActiveBrands = async (req, res, next) => {
        try {
            const brands = await brandService.getActiveBrands();

            res.json({
                result: brands,
                msg: "Brands fetched successfully.",
                status: true,
                meta: null
            });
        }
        catch (err) {
            next({ status: 400, msg: `List Error: ${err.message ?? err}` });
        }
    }

    // Create a new brand
    createBrand = async (req, res, next) => {
        try {
            let payload = req.body;
            if (req.file) {
                payload.brandImage = `/brandImage/${req.file.filename}`;
            }

            //validation
            let validatedData = await brandService.validateBrand(payload);
            // Create Slug
            validatedData.slug = slugify(validatedData.title, {
                replacement: '-',  // replace spaces with replacement character, defaults to `-`
                lower: true,      // convert to lower case, defaults to `false`
                trim: true,       // trim leading and trailing replacement chars, defaults to `false`
            });
            //save to db
            let brand = await brandService.storeBrand(validatedData);

            res.json({
                result: brand,
                msg: "Brand created successfully.",
                status: true,
                meta: null
            });
        }
        catch (err) {
            next({ status: 400, msg: `Create Error: ${err.message ?? err}` });
        }
    }

    fetchBrandById = async (req, res, next) => {
        try {
            let brand = await brandService.getBrandById(req.params.id);
            if (!brand) {
                throw ('Brand not found.');
            }
            res.json({
                result: brand,
                message: "Brand fetched successfully",
                status: true,
                meta: null
            })
        } catch (err) {
            next({ status: 400, message: `Fetch error: ${err.message ?? err}` });
        }
    }

    fetchBrandBySlug = async (req, res, next) => {
        try {
            let brand = await brandService.getBrandBySlug(req.params.slug);
            if (!brand) {
                throw ('Brand not found.');
            }
            res.json({
                result: brand,
                message: "Brand fetched successfully",
                status: true,
                meta: null
            })
        } catch (err) {
            next({ status: 400, message: `Fetch error: ${err.message ?? err}` });
        }
    }

    // Update a brand
    updateBrand = async (req, res, next) => {
        try {
            let payload = req.body;
            let brandData = await brandService.getBrandById(req.params.id);
            if (req.file) {
                payload.brandImage = `/brandImage/${req.file.filename}`; // new image
                deleteImage(`${process.cwd()}/public/uploads/images`, brandData.brandImage); // delete old image
            } else {
                payload.brandImage = brandData.brandImage; // keep old image
            }
            //validation
            let validatedData = await brandService.validateBrand(payload);
            //save to db
            let brand = await brandService.updateBrand(req.params.id, validatedData);

            res.json({
                result: brand,
                msg: "Brand updated successfully.",
                status: true,
                meta: null
            });
        }
        catch (err) {
            next({ status: 400, msg: `Update Error: ${err.message ?? err}` });
        }
    }

    // Delete a brand
    deleteBrandById = async (req, res, next) => {
        try {
            let response = await brandService.deleteById(req.params.id);
            if (response) {
                if (response.brandImage) {
                    deleteImage(`${process.cwd()}/public/uploads/images`, response.brandImage);
                }
                res.json({
                    result: response,
                    msg: "Brand deleted successfully.",
                    status: true,
                    meta: null
                });
            } else {
                throw ('Brand already deleted or does not exist.');
            }
        }
        catch (err) {
            next({ status: 400, msg: `Delete Error: ${err.message ?? err}` });
        }
    }
}

const brandController = new BrandController();
module.exports = brandController;
