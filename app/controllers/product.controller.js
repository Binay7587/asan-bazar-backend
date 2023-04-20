const { json } = require('express');
const { deleteImages } = require('../../config/functions');
const productService = require('../services/product.service');
const slugify = require('slugify');

class ProductController {
    getAllProductsList = async (req, res, next) => {
        try {
            // ?page=1&perPage=10
            let currentPage = Number(req.query.page ?? 1);
            let perPage = Number(req.query.perPage ?? 10);

            const categories = await productService.getAllProducts({ page: currentPage, perPage: perPage });

            res.json({
                result: categories,
                msg: "Products fetched successfully.",
                status: true,
                meta: {
                    currentPage: currentPage,
                    perPage: perPage,
                    totalCount: await productService.getCount()
                }
            });
        }
        catch (err) {
            next({ status: 400, msg: `List Error:  ${err.message ?? err}` });
        }
    }

    getActiveProducts = async (req, res, next) => {
        try {
            const categories = await productService.getActiveProducts();

            res.json({
                result: categories,
                msg: "Products fetched successfully.",
                status: true,
                meta: null
            });
        }
        catch (err) {
            next({ status: 400, msg: `List Error:  ${err.message ?? err}` });
        }
    }

    getFeaturedProducts = async (req, res, next) => {
        try {
            const categories = await productService.getFeaturedProducts();

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

    getAllProducts = async (req, res, next) => {
        try {
            const categories = await productService.getAllProducts();

            res.json({
                result: categories,
                msg: "All Products fetched successfully.",
                status: true,
                meta: null
            });
        }
        catch (err) {
            next({ status: 400, msg: `List Error:  ${err.message ?? err}` });
        }
    }

    // Create a new product
    createProduct = async (req, res, next) => {
        try {
            let payload = req.body;
            if (req.files && req.files.length > 0) {
                let images = []
                req.files.map((item) => {
                    images.push(`/productImage/${item.filename}`)
                })
                payload.productImage = images;
            }

            //validation
            payload.featured = payload?.featured && JSON.parse(payload.featured) == 1 ? true : false;
            payload.categoryId = payload.categoryId !== null && payload.categoryId !== '' && payload.categoryId !== 'undefined' ? JSON.parse(payload.categoryId) : null;
            payload.sellerId = payload.sellerId !== null && payload.sellerId !== '' && payload.sellerId !== 'undefined' ? payload.sellerId : null;
            payload.brand = payload.brand !== null && payload.brand !== '' && payload.brand !== 'undefined' ? payload.brand : null;
            let validatedData = await productService.validateProduct(payload);
            // Check if product title already exist
            const productByTitle = await productService.getProductByTitle(payload.title);

            if (productByTitle) {
                throw ("Product title already exists");
            }

            // Create Slug
            validatedData.slug = slugify(validatedData.title, {
                replacement: '-',  // replace spaces with replacement character, defaults to `-`
                lower: true,      // convert to lower case, defaults to `false`
                trim: true,       // trim leading and trailing replacement chars, defaults to `false`
            });
            validatedData.createdBy = req.authUser._id;
            validatedData.afterDiscount = validatedData.price - (validatedData.price * validatedData.discount / 100);

            //save to db
            let product = await productService.storeProduct(validatedData);

            res.json({
                result: product,
                msg: "Product created successfully.",
                status: true,
                meta: null
            });
        }
        catch (err) {
            next({ status: 400, msg: `Create Error:  ${err.message ?? err}` });
        }
    }

    fetchProductById = async (req, res, next) => {
        try {
            let product = await productService.getProductById(req.params.id);
            if (!product) {
                throw ('Product not found.');
            }
            res.json({
                result: product,
                message: "Product fetched successfully",
                status: true,
                meta: null
            })
        } catch (err) {
            next({ status: 400, message: `Fetch error: ${err.message ?? err}` });
        }
    }

    // Update a product
    updateProduct = async (req, res, next) => {
        try {
            let payload = req.body;
            let productData = await productService.getProductById(req.params.id);

            if (!productData) {
                throw ('Product not found.');
            }

            if (req.files && req.files.length > 0) {
                let images = productData.productImage.length > 0 ? productData.productImage : [];
                req.files.map((item) => {
                    images.push(item.filename)
                })
                payload.productImage = images;
            } else {
                payload.productImage = productData.productImage; // keep old image
            }

            // Delete images
            if (payload.delImages) {
                let delImages = JSON.parse(payload.delImages);
                if (delImages.length > 0) {
                    let dimages = payload.productImage.filter((item) => !delImages.includes(item));
                    payload.productImage = dimages;
                    deleteImages(`${process.cwd()}/public/uploads/images`, delImages);
                }
            }        
            
            //validation
            payload.featured = payload?.featured && JSON.parse(payload.featured) == 1 ? true : false;
            payload.categoryId = payload.categoryId !== null && payload.categoryId !== '' && payload.categoryId !== 'undefined' ? JSON.parse(payload.categoryId) : null;
            payload.sellerId = payload.sellerId !== null && payload.sellerId !== '' && payload.sellerId !== 'undefined' ? payload.sellerId : null;
            payload.brand = payload.brand !== null && payload.brand !== '' && payload.brand !== 'undefined' ? payload.brand : null;
            payload.delImages = payload.delImages !== null && payload.delImages !== '' && payload.delImages !== 'undefined' ? JSON.parse(payload.delImages) : null;
            let validatedData = await productService.validateProduct(payload);
            // Check if product title already exist
            const productByTitle = await productService.getProductByTitle(payload.title);

            if (productByTitle && productByTitle._id != req.params.id) {
                throw ("Product title already exists");
            }

            // Create Slug
            validatedData.slug = slugify(validatedData.title, {
                replacement: '-',  // replace spaces with replacement character, defaults to `-`
                lower: true,      // convert to lower case, defaults to `false`
                trim: true,       // trim leading and trailing replacement chars, defaults to `false`
            });
            validatedData.afterDiscount = validatedData.price - (validatedData.price * validatedData.discount / 100);

            //save to db
            let product = await productService.updateProduct(req.params.id, validatedData);

            res.json({
                result: product,
                msg: "Product updated successfully.",
                status: true,
                meta: null
            });
        }
        catch (err) {
            next({ status: 400, msg: `Update Error:  ${err.message ?? err}` });
        }
    }

    // Delete a product
    deleteProductById = async (req, res, next) => {
        try {
            let response = await productService.deleteById(req.params.id);
            if (response) {
                if (response.productImage) {
                    deleteImages(`${process.cwd()}/public/uploads/images`, response.productImage);
                }
                res.json({
                    result: response,
                    msg: "Product deleted successfully.",
                    status: true,
                    meta: null
                });
            } else {
                throw ('Product already deleted or does not exist.');
            }
        }
        catch (err) {
            next({ status: 400, msg: `Delete Error:  ${err.message ?? err}` });
        }
    }
}

const productController = new ProductController();
module.exports = productController;