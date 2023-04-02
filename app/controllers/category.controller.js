const { deleteImage } = require('../../config/functions');
const categoryService = require('../services/category.service');
const slugify = require('slugify');

class CategoryController {
    getAllCategoriesList = async (req, res, next) => {
        try {
            // ?page=1&perPage=10
            let currentPage = Number(req.query.page ?? 1);
            let perPage = Number(req.query.perPage ?? 10);

            const categories = await categoryService.getAllCategoriesList({ page: currentPage, perPage: perPage });

            res.json({
                result: categories,
                msg: "Categories fetched successfully.",
                status: true,
                meta: {
                    currentPage: currentPage,
                    perPage: perPage,
                    totalCount: await categoryService.getCount()
                }
            });
        }
        catch (err) {
            next({ status: 400, msg: `List Error:  ${err.message ?? err}` });
        }
    }

    getActiveCategories = async (req, res, next) => {
        try {
            const categories = await categoryService.getActiveCategories();

            res.json({
                result: categories,
                msg: "Categories fetched successfully.",
                status: true,
                meta: null
            });
        }
        catch (err) {
            next({ status: 400, msg: `List Error:  ${err.message ?? err}` });
        }
    }

    getFeaturedCategories = async (req, res, next) => {
        try {
            const categories = await categoryService.getFeaturedCategories();

            res.json({
                result: categories,
                msg: "Featured categories fetched successfully.",
                status: true,
                meta: null
            });
        }
        catch (err) {
            next({ status: 400, msg: `List Error:  ${err.message ?? err}` });
        }
    }

    getAllCategories = async (req, res, next) => {
        try {
            const categories = await categoryService.getAllCategories();

            res.json({
                result: categories,
                msg: "All Categories fetched successfully.",
                status: true,
                meta: null
            });
        }
        catch (err) {
            next({ status: 400, msg: `List Error:  ${err.message ?? err}` });
        }
    }

    // Create a new category
    createCategory = async (req, res, next) => {
        try {
            let payload = req.body;
            if (req.file) {
                payload.categoryImage = `/categoryImage/${req.file.filename}`;
            }

            //validation
            payload.featured = payload?.featured && JSON.parse(payload.featured) == 1 ? true : false;
            let validatedData = await categoryService.validateCategory(payload);
            validatedData.parent = payload.parent !== null && payload.parent !== '' ? payload.parent : null;

            // Create Slug
            validatedData.slug = slugify(validatedData.title, {
                replacement: '-',  // replace spaces with replacement character, defaults to `-`
                lower: true,      // convert to lower case, defaults to `false`
                trim: true,       // trim leading and trailing replacement chars, defaults to `false`
            });
            //save to db
            let category = await categoryService.storeCategory(validatedData);

            res.json({
                result: category,
                msg: "Category created successfully.",
                status: true,
                meta: null
            });
        }
        catch (err) {
            next({ status: 400, msg: `Create Error:  ${err.message ?? err}` });
        }
    }

    fetchCategoryById = async (req, res, next) => {
        try {
            let category = await categoryService.getCategoryById(req.params.id);
            if (!category) {
                throw ('Category not found.');
            }
            res.json({
                result: category,
                message: "Category fetched successfully",
                status: true,
                meta: null
            })
        } catch (err) {
            next({ status: 400, message: `Fetch error: ${err.message ?? err}` });
        }
    }

    // Update a category
    updateCategory = async (req, res, next) => {
        try {
            let payload = req.body;
            let categoryData = await categoryService.getCategoryById(req.params.id);
            if (req.file) {
                payload.categoryImage = `/categoryImage/${req.file.filename}`; // new image
                deleteImage(`${process.cwd()}/public/uploads/images`, categoryData.categoryImage); // delete old image
            } else {
                payload.categoryImage = categoryData.categoryImage; // keep old image
            }
            //validation
            payload.featured = payload?.featured && JSON.parse(payload.featured) == 1 ? true : false;
            let validatedData = await categoryService.validateCategory(payload);
            validatedData.parent = payload.parent !== null && payload.parent !== '' ? payload.parent : null;
            //save to db
            let category = await categoryService.updateCategory(req.params.id, validatedData);

            res.json({
                result: category,
                msg: "Category updated successfully.",
                status: true,
                meta: null
            });
        }
        catch (err) {
            next({ status: 400, msg: `Update Error:  ${err.message ?? err}` });
        }
    }

    // Delete a category
    deleteCategoryById = async (req, res, next) => {
        try {
            let response = await categoryService.deleteById(req.params.id);
            if (response) {
                if (response.categoryImage) {
                    deleteImage(`${process.cwd()}/public/uploads/images`, response.categoryImage);
                }
                res.json({
                    result: response,
                    msg: "Category deleted successfully.",
                    status: true,
                    meta: null
                });
            } else {
                throw ('Category already deleted or does not exist.');
            }
        }
        catch (err) {
            next({ status: 400, msg: `Delete Error:  ${err.message ?? err}` });
        }
    }
}

const categoryController = new CategoryController();
module.exports = categoryController;