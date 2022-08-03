/**
* @swagger
* /admin/order-get-info/{id}:
*   get:
*     tags:
*       - Admin - Order
*     summary: Get order info by Id from database
*     parameters:
*       - name: "id"
*         in: "path"
*         description: "ID of order that needs to be get order info"
*         required: true
*     responses:
*       200:
*         description: get order info
*         schema:
*           type: object
*           properties:
*             success:
*               type: boolean
*             payload:
*               type: string
*               description: order info
*           example: {
*             'success': true,
*             'payload': []
*           }
*       404:
*         description: order not found
*         schema:
*           type: string
*           example: {
*              "success": false,
*              "errors": [
*                      {
*                      "message": "Không tìm thấy hóa đơn này.",
*                      "param": "ORDER_NOT_FOUND"
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
* /admin/order-list/:
*   get:
*     summary: Get list all Order from database by Admin
*     tags:
*       - Admin - Order
*     parameters:
*      - in: query
*        name: keyword
*        type: string
*        description: text search invoice, name user, store
*      - in: query
*        name: status
*        type: number
*        description: Status order. 1. MAIN, 0. DRAFT
*      - in: query
*        name: fromDay
*        type: string
*        description: fromDay ISOString
*      - in: query
*        name: toDay
*        type: string
*        description: toDay ISOString
*      - in: query
*        name: limit
*        type: number
*        description: Specifies the maximum number of order the query will return. Limit default is 10
*      - in: query
*        name: page
*        type: number
*        description: Specifies the number of order page. Page default is 1
*     responses:
*       200:
*         name: body
*         in: body
*         required: true
*         description: List users info
*         schema:
*           type: object
*           properties:
*             $ref: '#/definitions/User'
*           example: {
*              success: true,
*              payload: {
*                countUser: 1,
*                listUser: [
*                  {
*                      "_id": "5fc49a51af171e5aa4320868",
*                      "avatar": {
*                          "name": "5f718f9d3abc89001945b625_default_1602236703381.png",
*                          "large": "5f718f9d3abc89001945b625_default_1602236703381.png",
*                          "medium": "180x180_5f718f9d3abc89001945b625_default_1602236703381.png",
*                          "small": "90x90_5f718f9d3abc89001945b625_default_1602236703381.png"
*                      },
*                      "status": 3,
*                      "rate": 0,
*                      "online": 0,
*                      "gender": 1,
*                      "code": 123123,
*                      "phone": "0123456789",
*                      "fullName": "Exam Ple",
*                      "email": "example@gmail.com",
*                      "refer": "5f769e48a2ac2708288b3167",
*                      "createdAt": "2020-11-30T07:08:01.109Z",
*                      "updatedAt": "2020-12-01T03:07:10.973Z",
*                      "__v": 0
*                  }
*                ]
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
*       500:
*         description: When got server exception
*         schema:
*           type: string
*           example: "Internal server error"
*/

/**
 * @swagger
 * /admin/order/export-xlx:
 *   get:
 *     summary: Export Excel list Order
 *     tags:
 *       - Admin - Order
 *     parameters:
 *      - in: query
 *        name: keyword
 *        type: string
 *        description: text search invoice, name user, store
 *      - in: query
 *        name: status
 *        type: number
 *        description: Status order. 1. MAIN, 0. DRAFT
 *      - in: query
 *        name: fromDay
 *        type: string
 *        description: fromDay ISOString
 *      - in: query
 *        name: toDay
 *        type: string
 *        description: toDay ISOString
 *      - in: query
 *        name: limit
 *        type: number
 *        description: Specifies the maximum number of order the query will return. Limit default is 10
 *      - in: query
 *        name: page
 *        type: number
 *        description: Specifies the number of order page. Page default is 1
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Result info status user export
 *         schema:
 *           type: object
 *           example: {
 *             "success": true,
 *             "payload": {}
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
* /admin/order:
*   get:
*     tags:
*       - Admin - Order
*     summary: Get order info by Id from database
*     parameters:
*       - name: "id"
*         in: "path"
*         description: "ID of order that needs to be get order info"
*         required: true
*     responses:
*       200:
*         description: get order info
*         schema:
*           type: object
*           properties:
*             success:
*               type: boolean
*             payload:
*               type: string
*               description: order info
*           example: {
*             'success': true,
*             'payload': []
*           }
*       404:
*         description: order not found
*         schema:
*           type: string
*           example: {
*              "success": false,
*              "errors": [
*                      {
*                      "message": "Không tìm thấy hóa đơn này.",
*                      "param": "ORDER_NOT_FOUND"
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
 * /orders/:
 *   put:
 *     summary: Update status order
 *     tags:
 *       - Order
*     parameters:
*       - name: body
*         in: body
*         required: true
*         properties:
*           orderId:
*             type: string
*           status:
*             type: string
*         example: {
*           "orderId": "12221212",
            "status": 1
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
* /admin/order/waiting:
*   get:
*     summary: Get list all Order Waiting Approve from database by Admin
*     tags:
*       - Admin - Order
*     parameters:
*      - in: query
*        name: keyword
*        type: string
*        description: text search invoice, name user, store
*      - in: query
*        name: status
*        type: number
*        description: Status order. 1. MAIN, 0. DRAFT
*      - in: query
*        name: fromDay
*        type: string
*        description: fromDay ISOString
*      - in: query
*        name: toDay
*        type: string
*        description: toDay ISOString
*      - in: query
*        name: limit
*        type: number
*        description: Specifies the maximum number of order the query will return. Limit default is 10
*      - in: query
*        name: page
*        type: number
*        description: Specifies the number of order page. Page default is 1
*     responses:
*       200:
*         name: body
*         in: body
*         required: true
*         description: List users info
*         schema:
*           type: object
*           properties:
*             $ref: '#/definitions/User'
*           example: {
*              success: true,
*              payload: {
*                countUser: 1,
*                listUser: [
*                  {
*                      "_id": "5fc49a51af171e5aa4320868",
*                      "avatar": {
*                          "name": "5f718f9d3abc89001945b625_default_1602236703381.png",
*                          "large": "5f718f9d3abc89001945b625_default_1602236703381.png",
*                          "medium": "180x180_5f718f9d3abc89001945b625_default_1602236703381.png",
*                          "small": "90x90_5f718f9d3abc89001945b625_default_1602236703381.png"
*                      },
*                      "status": 3,
*                      "rate": 0,
*                      "online": 0,
*                      "gender": 1,
*                      "code": 123123,
*                      "phone": "0123456789",
*                      "fullName": "Exam Ple",
*                      "email": "example@gmail.com",
*                      "refer": "5f769e48a2ac2708288b3167",
*                      "createdAt": "2020-11-30T07:08:01.109Z",
*                      "updatedAt": "2020-12-01T03:07:10.973Z",
*                      "__v": 0
*                  }
*                ]
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
*       500:
*         description: When got server exception
*         schema:
*           type: string
*           example: "Internal server error"
*/
