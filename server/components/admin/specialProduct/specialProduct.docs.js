/**
 * @swagger
 * /admin/special-product:
 *   post:
 *     summary: Create Special special product by Admin
 *     tags:
 *       - Admin - Special Product
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           productId:
 *             type: string
 *           index:
 *             type: number
 *         example: {
 *           "productId": "5fd496f3dcb13d31202d3e5d",
 *           "index": 3
 *         }
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: special products have been created
 *         schema:
 *           type: object
 *           example: {
 *             "success": true,
 *             "payload": {
 *                 "_id": "5fd8312902cd424fe064234f",
 *                 "product": ["5fd496f3dcb13d31202d3e5d", "5fd5ac60d3ee7038e089a15f"],
 *                 "createdAt": "2020-12-15T03:44:41.256Z",
 *                 "updatedAt": "2020-12-15T03:44:41.256Z",
 *                 "__v": 0
 *              }
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
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: [
 *              {
 *                param: 'NOT_FOUND_ERR[5fd5ac60d3ee7038e089a151]'
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
 * /admin/special-product/{id}:
 *   get:
 *     summary: Get info Special Product by Admin
 *     tags:
 *       - Admin - Special Product
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: id (productId) of Special Product
 *         required: true
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Details Special Product
 *         schema:
 *           type: object
 *           example: {
 *             "success": true,
 *             'payload': {
 *                  "images": [
 *                              {
 *                              "name": "5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                              "large": "5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                              "medium": "85x85_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                              "small": "43x43_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png"
 *                              },
 *                              {
 *                              "name": "5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                              "large": "5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                              "medium": "85x85_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                              "small": "43x43_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png"
 *                              }
 *                          ],
 *                  "title": "Giới thiệu ID mới nhận ngay 500.000 VTĐ. Hơn thế nữa là được nhận hoa",
 *                  "meta_description": "",
 *                  "description": "Tin tức được xem nhiều nhất",
 *                  "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
 *                  "author": "Nguyuyễn Trong Nghĩa",
 *                  "categories": [
 *                      "5fdb98e78e7c6a315ceac9c6",
 *                      "5fdb98e78e7c6a315ceac9d0"
 *                  ],
 *                  "tags": [
 *                      "Điện thoại",
 *                      "Điện tử"
 *                  ],
 *                  "status": true,
 *                  "special_news": false,
 *                  "_id": "5fdc937c9c01645be4be07e3",
 *                  "avatar": {
 *                      "name": "5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                      "large": "5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                      "medium": "85x85_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                      "small": "43x43_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png"
 *                  },
 *                  "adminId": "5fc890ca2baa9445cc23e31a",
 *                  "createdAt": "2020-12-18T11:33:16.682Z",
 *                  "updatedAt": "2020-12-18T11:33:16.682Z",
 *              "__v": 0
 *              }
 *          }
 *       404:
 *         description: Product not found
 *         schema:
 *           type: string
 *           example: {
 *              "success": false,
 *              "errors": [
 *                      {
 *                      "message": "Không tìm thấy sản phẩm này!",
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
 * /admin/special-product:
 *   get:
 *     summary: Get all Special Product from database by Admin
 *     tags:
 *       - Admin - Special Product
 *     parameters:
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
 *         description: List Special product info
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/SpecialProduct'
 *           example: {
 *              success: true,
 *              total_page: 1,
 *              total_item: 4,
 *              page: 1,
 *              item: 4,
 *              payload: []
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
 * /admin/special-product/{productId}:
 *   delete:
 *     summary: Delete a Product of list Special Product by Admin
 *     tags:
 *       - Admin - Special Product
 *     parameters:
 *       - name: "productId"
 *         in: "path"
 *         description: id of Special Product need delete by Admin
 *         required: true
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Details special Product has deleted
 *         schema:
 *           type: object
 *           example: {
 *             "success": true,
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
 *         description: Special Product not found
 *         schema:
 *           type: string
 *           example: {
 *              "success": false,
 *              "errors": [
 *                      {
 *                      "message": "Không tìm thấy sản phẩm đặc biệt này này!",
 *                      "param": "SPECIAL_PRODUCT_NOT_FOUND"
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
* /admin/special-product/sort/{productId}:
*   put:
*     tags:
*       - Admin - Special Product
*     summary: Sort special Product by Admin
*     parameters:
*       - in: path
*         name: productId
*         type: string
*         description: id Product
*         required: true
*       - in: query
*         name: index
*         type: number
*         description: index Product (default = 1)
*     responses:
*       200:
*         description: get special product info
*         schema:
*           type: object
*           properties:
*             success:
*               type: boolean
*             payload:
*               type: string
*               description: special product info
*           example: {
*             'success': true,
*             'payload': true
*           }
*       404:
*         description: special product not found
*         schema:
*           type: string
*           example: {
*              "success": false,
*              "errors": [
*                      {
*                      "message": "Không tìm thấy người sản phẩm này.",
*                      "param": "SPECIAL_PRODUCT_NOT_FOUND"
*                      }
*                  ]
*              }
*       500:
*         description: When got server exception
*         schema:
*           type: string
*           example: "Internal server error"
*/
