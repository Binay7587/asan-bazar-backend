class CategoryController {
    createCategory(req, res, next) {
        res.json({
            result: req.body,
            status: true,
            msg: "Category Created",
            meta: null
        });
    }

    listCategory(req, res, next) {
        let categories = [
            {
                id: 1,
                name: 'Category 1',
                description: 'Category 1 description'
            },
            {
                id: 2,
                name: 'Category 2',
                description: 'Category 2 description'
            },
        ];
        res.json({
            result: categories,
            status: true,
            msg: "Category Fetched",
            meta: {
                totalCount: 2,
                perPage: 10,
                currentPage: 1
            }
        });
    }

    getCategoryDetail(req, res, next) {
        let category = {
            id: 1,
            name: 'Category 1',
            description: 'Category 1 description'
        };
        res.json({
            result: category,
            status: true,
            msg: "Category Detail Fetched",
            meta: null
        });
    }

    updateCategory(req, res, next) {
        res.json({
            result: req.body,
            status: true,
            msg: "Category Updated",
            meta: null
        });
    }

    deleteCategory(req, res, next) {
        res.json({
            result: null,
            status: true,
            msg: "Category Deleted",
            meta: null
        });
    }
}

const categoryController = new CategoryController();
module.exports = categoryController;