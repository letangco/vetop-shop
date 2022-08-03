/**
 * @swagger
 * /products/:
 *   get:
 *     summary: Get products list
 *     tags:
 *       - Products
 *     parameters:
 *      - in: query
 *        name: keyword
 *        type: string
 *        description: text search
 *      - in: query
 *        name: limit
 *        type: number
 *        description: Specifies the maximum number of country the query will return. Limit default is 10
 *      - in: query
 *        name: page
 *        type: number
 *        description: Specifies the number of country page. Page default is 1
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: get country list
 *         schema:
 *           type: object
 *           example: {
 *             "success": true,
 *             "payload": []
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /products/category/{id}:
 *   get:
 *     summary: Get products list by category
 *     tags:
 *       - Products
 *     parameters:
 *      - in: path
 *        name: id
 *        type: string
 *      - in: query
 *        name: keyword
 *        type: string
 *        description: text search
 *      - in: query
 *        name: limit
 *        type: number
 *        description: Specifies the maximum number of country the query will return. Limit default is 10
 *      - in: query
 *        name: page
 *        type: number
 *        description: Specifies the number of country page. Page default is 1
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: get country list
 *         schema:
 *           type: object
 *           example: {
 *             "success": true,
 *             "payload": []
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /products/search-product/:
 *   get:
 *     summary: Search Product
 *     tags:
 *       - Products
 *     parameters:
 *      - in: path
 *        name: id
 *        type: string
 *      - in: query
 *        name: keyword
 *        type: string
 *        description: text search
 *      - in: query
 *        name: limit
 *        type: number
 *        description: Specifies the maximum number of country the query will return. Limit default is 10
 *      - in: query
 *        name: page
 *        type: number
 *        description: Specifies the number of country page. Page default is 1
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: get country list
 *         schema:
 *           type: object
 *           example: {
 *             "success": true,
 *             "payload": []
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete products list by category
 *     tags:
 *       - Products
 *     parameters:
 *      - in: path
 *        name: id
 *        type: string
 *      - in: query
 *        name: keyword
 *        type: string
 *        description: text search
 *      - in: query
 *        name: limit
 *        type: number
 *        description: Specifies the maximum number of country the query will return. Limit default is 10
 *      - in: query
 *        name: page
 *        type: number
 *        description: Specifies the number of country page. Page default is 1
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: get country list
 *         schema:
 *           type: object
 *           example: {
 *             "success": true,
 *             "payload": []
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get products by id
 *     tags:
 *       - Products
 *     parameters:
 *      - in: path
 *        name: id
 *        type: string
 *      - in: query
 *        name: keyword
 *        type: string
 *        description: text search
 *      - in: query
 *        name: limit
 *        type: number
 *        description: Specifies the maximum number of country the query will return. Limit default is 10
 *      - in: query
 *        name: page
 *        type: number
 *        description: Specifies the number of country page. Page default is 1
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: get country list
 *         schema:
 *           type: object
 *           example: {
 *             "success": true,
 *             "payload": []
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /products/store/{id}:
 *   get:
 *     summary: Get products by store id
 *     tags:
 *       - Products
 *     parameters:
 *      - in: path
 *        name: id
 *        type: string
 *      - in: query
 *        name: limit
 *        type: number
 *        description: Specifies the maximum number of country the query will return. Limit default is 10
 *      - in: query
 *        name: page
 *        type: number
 *        description: Specifies the number of country page. Page default is 1
 *      - in: query
 *        name: sort
 *        type: string
 *        description: name:asc
 *      - in: query
 *        name: keyword
 *        type: string
 *        description: text search
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: get country list
 *         schema:
 *           type: object
 *           example: {
 *             "success": true,
 *             "payload": []
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /products/:
 *   post:
 *     summary: Create
 *     tags:
 *       - Products
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           name:
 *             type: string
 *           description:
 *             type: string
 *           quantity:
 *             type: number
 *           price:
 *             type: number
 *           special:
 *             type: number
 *           categories:
 *             type: array
 *           images:
 *             type: array
 *           stock_status:
 *             type: number
 *         example: {
 *           "name": "Table",
 *           "description": "This is a table",
 *           "price": 100,
 *           "quantity": 100,
 *           "special": 10,
 *           "categories": ["12221212"],
 *           "images": [{"name": "image.jpg","small": "image.jpg", "medium": "image.jpg", "large": "image.jpg"}],
 *           "stock_status": 20,
 *         }
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: get country list
 *         schema:
 *           type: object
 *           example: {
 *             "success": true,
 *             "payload": []
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /products/image-product/{id}:
 *   put:
 *     summary: Update image product
 *     tags:
 *       - Products
 *     parameters:
 *       - name: id
 *         in: path
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           images:
 *             type: string
 *         example: {
 *           "images": [{"name": "image.jpg","small": "image.jpg", "medium": "image.jpg", "large": "image.jpg"}]
 *         }
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: get country list
 *         schema:
 *           type: object
 *           example: {
 *             "success": true,
 *             "payload": []
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update Product
 *     tags:
 *       - Products
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           name:
 *             type: string
 *           description:
 *             type: string
 *           quantity:
 *             type: number
 *           price:
 *             type: number
 *           special:
 *             type: number
 *           categories:
 *             type: array
 *           images:
 *             type: array
 *           stock_status:
 *             type: number
 *         example: {
 *           "name": "Table",
 *           "description": "This is a table",
 *           "price": 100,
 *           "quantity": 100,
 *           "special": 10,
 *           "categories": ["12221212"],
 *           "images": [{"name": "image.jpg","small": "image.jpg", "medium": "image.jpg", "large": "image.jpg"}],
 *           "stock_status": 20,
 *         }
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: get country list
 *         schema:
 *           type: object
 *           example: {
 *             "success": true,
 *             "payload": []
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get info product by id
 *     tags:
 *       - Products
 *     parameters:
 *       - name: id
 *         in: path
 *         description: "ID of the product"
 *         required: true
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: detail product
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/Products'
 *           example: {
 *              success: true
 *           }
 *       404:
 *         description: Product not found
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: [
 *              {
 *                param: 'NOT_FOUND_ERR'
 *              }
 *             ]
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /products/filter/product:
 *   get:
 *     summary: Filter products by product name/ price low/ price hight/ rating
 *     tags:
 *       - Products
 *     parameters:
 *      - in: query
 *        name: keyword
 *        type: string
 *        description: search name
 *      - in: query
 *        name: priceLow
 *        type: number
 *        description: filter price product by priceLow
 *      - in: query
 *        name: priceHight
 *        type: number
 *        description: filter price product by priceHight
 *      - in: query
 *        name: rating
 *        type: number
 *        description: filter rating product
 *      - in: query
 *        name: limit
 *        type: number
 *        description: Specifies the maximum number of product the query will return. Limit default is 10
 *      - in: query
 *        name: page
 *        type: number
 *        description: Specifies the number of product page. Page default is 1
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: get product list
 *         schema:
 *           type: object
 *           example: {
 *             "success": true,
 *             "payload": []
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /products/list/store/:
 *   get:
 *     summary: Get Products By Token Store
 *     tags:
 *       - Products
 *     parameters:
 *      - in: query
 *        name: keyword
 *        type: string
 *        description: search
 *      - in: query
 *        name: categories
 *        type: string
 *        description: categories
 *      - in: query
 *        name: limit
 *        type: number
 *        description: Specifies the maximum number of product the query will return. Limit default is 10
 *      - in: query
 *        name: page
 *        type: number
 *        description: Specifies the number of product page. Page default is 1
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: get product list
 *         schema:
 *           type: object
 *           example: {
 *             "success": true,
 *             "payload": []
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

 /**
 * @swagger
 * /products/add-wish-list:
 *   post:
 *     summary: Add products to wish list
 *     tags:
 *       - Products
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           productId:
 *             type: array
 *         example: {
 *           "productId": ["12221212"]
 *         }
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: list product add wish list
 *         schema:
 *           type: object
 *           example: {
 *             "success": true,
 *             "payload": []
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
* @swagger
* /products/rating/{type}/:
*   post:
*     summary: Add products to wish list
*     tags:
*       - Products
*     parameters:
*       - name: type
*         in: path
*         required: true
*         description: store/product
*       - name: body
*         in: body
*         required: true
*         properties:
*           productId:
*             type: array
*         example: {
*           "productId": "12221212",
            "content": "sin qua",
            "star": 4
*         }
*     responses:
*       200:
*         name: body
*         in: body
*         required: true
*         description: list product add wish list
*         schema:
*           type: object
*           example: {
*             "success": true,
*             "payload": []
*           }
*       500:
*         description: When got server exception
*         schema:
*           type: string
*           example: "Internal server error"
*/

/**
 * @swagger
 * /products/type-rating/product:
 *   get:
 *     summary: Get Type Rating Product
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: get country list
 *         schema:
 *           type: object
 *           example: {
 *             "success": true,
 *             "payload": []
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */
