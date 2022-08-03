/**
 * @swagger
 * /admin/management-category/{id}:
 *   get:
 *     summary: Get category detail
 *     tags:
 *       - Admin - Categories
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of category
 *         required: true
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: get category detail
 *         schema:
 *           type: object
 *           example: {
 *             "success": true,
 *             "payload": []
 *           }
 *       401:
 *         description: When your token is invalid. You'll get Unauthorized msg
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: "Unauthorized"
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /admin/management-category/{id}:
 *   delete:
 *     summary: Delete
 *     tags:
 *       - Admin - Categories
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of category
 *         required: true
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: get category detail
 *         schema:
 *           type: object
 *           example: {
 *             "success": true,
 *             "payload": []
 *           }
 *       401:
 *         description: When your token is invalid. You'll get Unauthorized msg
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: "Unauthorized"
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /admin/management-category/:
 *   get:
 *     summary: Get category list
 *     tags:
 *       - Admin - Categories
 *     parameters:
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
 *         description: get category list
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
 * /admin/management-category/:
 *   post:
 *     tags:
 *       - Admin - Categories
 *     summary: Create Categories Info
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           name:
 *             type: string
 *           description:
 *             type: string
 *           parent:
 *             type: string
 *           image:
 *             type: string
 *           icon:
 *             type: string
 *           color:
 *             type: string
 *           index:
 *             type: number
 *           status:
 *             type: boolean
 *         example: {
 *           "name": "Dành cho bạn",
 *           "description": "Dành cho bạn",
 *           "color": "#122323",
 *           "image": {"name": "image.jpg","medium": "image.jpg","large": "image.jpg","small": "image.jpg"},
 *           "icon": {"name": "image.jpg","medium": "image.jpg","large": "image.jpg","small": "image.jpg"},
 *           "index": 4,
 *           "parent": "",
 *           "status": true
 *         }
 *     responses:
 *       200:
 *         description: get country info
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             payload:
 *               type: string
 *               description: Country info
 *           example: {
 *             'success': true,
 *             'payload': []
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /admin/management-category/{id}:
 *   put:
 *     tags:
 *       - Admin - Categories
 *     summary: Update Categories Info
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
 *           parent:
 *             type: string
 *           image:
 *             type: string
 *           icon:
 *             type: string
 *           color:
 *             type: string
 *           index:
 *             type: number
 *         example: {
 *           "name": "Table",
 *           "description": "This is a table",
 *           "color": "#122323",
 *           "image": {"name": "image.jpg","medium": "image.jpg","large": "image.jpg","small": "image.jpg"},
 *           "icon": {"name": "image.jpg","medium": "image.jpg","large": "image.jpg","small": "image.jpg"},
 *           "parent": "",
 *           "index": 4,
 *         }
 *     responses:
 *       200:
 *         description: get country info
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             payload:
 *               type: string
 *               description: Country info
 *           example: {
 *             'success': true,
 *             'payload': []
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

 /**
 * @swagger
 * /admin/management-category/update-status/{id}/{status}:
 *   put:
 *     summary: Update status category by Admin
 *     tags:
 *       - Admin - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         description: id Category
 *         required: true
 *       - in: path
 *         name: status
 *         type: boolean
 *         description: status category
 *         required: true
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Update status category by Admin
 *         schema:
 *           type: object
 *           example: {
 *             "success": true,
 *             "payload": true
 *           }
 *       401:
 *         description: When your token is invalid. You'll get Unauthorized msg
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: "Unauthorized"
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
* @swagger
* /admin/management-category/sort-index/{id}:
*   put:
*     tags:
*       - Admin - Categories
*     summary: Sort index Category show in screen by Admin
*     parameters:
*       - in: path
*         name: id
*         type: string
*         description: id Category
*         required: true
*       - in: query
*         name: index
*         type: number
*         description: index category (default = 1)
*     responses:
*       200:
*         description: Sort index Category by Admin
*         schema:
*           type: object
*           properties:
*             success:
*               type: boolean
*             payload:
*               type: string
*               description: Category info
*           example: {
*             'success': true,
*             'payload': true
*           }
*       404:
*         description: Category not found
*         schema:
*           type: string
*           example: {
*              "success": false,
*              "errors": [
*                      {
*                      "message": "Không tìm thấy danh mục sản phẩm này.",
*                      "param": "CATEGORY_NOT_FOUND"
*                      }
*                  ]
*              }
*       500:
*         description: When got server exception
*         schema:
*           type: string
*           example: "Internal server error"
*/
