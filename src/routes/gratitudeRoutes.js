const express = require("express");

const gratitudeController = require("../controllers/gratitudeController");
const recordController = require("../controllers/recordController");

const router = express.Router();

/**
 * @openapi
 * /api/gratitudes:
 *   get:
 *      tags:
 *       - Gratitudes
 *      parameters:
 *       - in: query
 *         name: mode
 *         schema:
 *          type: string
 *         description: The payment mode
 *      responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 *                     $ref: "#/components/schemas/Gratitude"
 *       5XX:
 *        description: FAILED
 *        content:
 *          application/json:
 *            schema:      
 *              type: object
 *              properties: 
 *                status: 
 *                  type: string
 *                  example: FAILED
 *                data:
 *                  type: object
 *                  properties:
 *                    error:
 *                      type: string
 *                      example: "Some error message"
 * /api/gratitudes/{gratitudeId}:
 *  get:
 *    tags:
 *    - Gratitude
 *    parameters:
 *    - in: path
 *      name: gratitudeId
 *      schema:
 *        type: string
 *    - in: query
 *      name: mode
 *      schema:
 *        type: string
 *      description: The payment mode
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: OK
 *                data: 
 *                  type: array
 *                  items:
 *                    type: object
 *                    $ref: "#/components/schemas/SingleGratitude"
 *      4XX:
 *        description: FAILED
 *        content: 
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: FAILED
 *                data:
 *                  type: string
 *                  example: "Can't find gratitude with the id '{gratitudeId}'"
 * /api/gratitudes/{gratitudeId}/records:
 *  get:
 *    tags:
 *    - Record
 *    parameters:
 *    - in: path
 *      name: gratitudeId
 *      schema:
 *        type: string
 *    - in: query
 *      name: mode
 *      schema:
 *        type: string
 *      description: The payment mode
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: OK
 *                data: 
 *                  type: array
 *                  items:
 *                    type: object
 *                    $ref: "#/components/schemas/SingleRecord"
 *      4XX:
 *        description: FAILED
 *        content: 
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: FAILED
 *                data:
 *                  type: string
 *                  example: "Can't find record with the id '{gratitudeId}'"
 */

// TODO: test again once db is added

/**
 * @openapi
 * /api/gratitudes:
 *  post:
 *    tags:
 *    - Gratitudes
 *    requestBody:
 *      description: Optional description in *Markdown*
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/GratitudePostBody'
 *    responses:
 *      201:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object 
 *              properties:
 *                status:
 *                  type: string
 *                  example: OK
 *                data:
 *                  type: array
 *                items:
 *                  type: object
 *                  $ref: "#/components/schemas/GratitudePostResponse"
 *      5XX:
 *        description: FAILED
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: FAILED
 *                data:
 *                  type: string
 *                  example: "Something went wrong."
 *      4XX:
 *        description: FAILED
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: FAILED
 *                data:
 *                  type: string
 *                  example: "Gratitude with the name already exists"
 */

router.get('/', gratitudeController.getAllGratitudes);

router.get('/:gratitudeId', gratitudeController.getOneGratitude);

router.get('/:gratitudeId/records', recordController.getRecordForGratitude);

router.post('/', gratitudeController.createNewGratitude);

router.patch('/:gratitudeId', gratitudeController.updateGratitude);

router.delete('/:gratitudeId', gratitudeController.deleteGratitude);

module.exports = router;