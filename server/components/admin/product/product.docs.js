/**
 * @swagger
 * /admin/product:
 *   get:
 *     tags:
 *       - Admin - Product
 *     summary: Get list Product is exist from database
 *     parameters:
 *      - in: query
 *        name: keyword
 *        type: string
 *        description: text search
 *      - in: query
 *        name: status
 *        type: boolean
 *        description: status product
 *      - in: query
 *        name: limit
 *        type: number
 *        description: Specifies the maximum number of product the query will return. Limit default is 10
 *      - in: query
 *        name: page
 *        type: number
 *        description: Specifies the number of product page. Page default is 1
 *      - in: query
 *        name: date
 *        type: string
 *        description: date product
 *      - in: query
 *        name: fromPrice
 *        type: number
 *        description: from price of product
 *      - in: query
 *        name: toPrice
 *        type: number
 *        description: to price of product
 *     responses:
 *       200:
 *         description: List Product
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             payload:
 *               type: string
 *               description: list Product
 *           example: {
 *             'success': true,
 *             'payload': true
 *           }
 *       401:
 *         description: Unauthorized
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: [
 *               {
 *                 "param": "UNAUTHORIZED"
 *               }
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
* /admin/product/{id}:
*   get:
*     tags:
*       - Admin - Product
*     summary: Get Product info by Id from database
*     parameters:
*       - name: "id"
*         in: "path"
*         description: "ID of Product that needs to be get Product info"
*         required: true
*     responses:
*       200:
*         description: get Product info
*         schema:
*           type: object
*           properties:
*             success:
*               type: boolean
*             payload:
*               type: string
*               description: Product info
*           example: {
*             'success': true,
*             'payload': []
*           }
*       404:
*         description: Product not found
*         schema:
*           type: string
*           example: {
*              "success": false,
*              "errors": [
*                      {
*                      "message": "Không tìm thấy người dùng này.",
*                      "param": "PRODUCT_NOT_FOUND"
*                      }
*                  ]
*              }
*       500:
*         description: When got server exception
*         schema:
*           type: string
*           example: "Internal server error"
*/

/**
 * @swagger
 * /admin/product/{id}/{status}:
 *   put:
 *     tags:
 *       - Admin - Product
 *     summary: Update Status Product
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: id product must update
 *         required: true
 *       - name: "status"
 *         in: "path"
 *         description: true/false
 *         required: true
 *     responses:
 *       200:
 *         description: Update status Product
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             payload:
 *               type: string
 *               description: Product updated
 *           example: {
 *             'success': true,
 *             'payload': true
 *           }
 *       401:
 *         description: Unauthorized
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: [
 *               {
 *                 "param": "UNAUTHORIZED"
 *               }
 *             ]
 *           }
 *       404:
 *         description: Not Found
 *         schema:
 *           type: string
 *           example: {
 *              "success": false,
 *              "errors": [
 *                      {
 *                      "message": "Không tìm thấy Product này",
 *                      "param": "PRODUCT_NOT_FOUND"
 *                      }
 *                  ]
 *              }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /admin/product/{id}:
 *   delete:
 *     summary: Delete product by id
 *     tags:
 *       - Admin - Product
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "ID of the product that needs to be delete"
 *         required: true
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Your product info delete
 *         schema:
 *           type: object
 *           example: {
 *             "success": true,
 *             "payload": true
 *           }
 *       401:
 *         description: Unauthorized
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: [
 *               {
 *                 "param": "UNAUTHORIZED"
 *               }
 *             ]
 *           }
 *       404:
 *         description: Product not found
 *         schema:
 *           type: string
 *           example: {
 *              "success": false,
 *              "errors": [
 *                      {
 *                      "message": "Không tìm thấy slide này.",
 *                      "param": "SLIDE_SHOW_NOT_FOUND"
 *                      }
 *                  ]
 *              }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */
