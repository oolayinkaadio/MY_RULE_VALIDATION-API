const express = require('express');
const dataController = require('./controller')

const {
    Router
} = express;

const router = Router();
// router.get('/', (req, res) => {
//     res.status(200).json({
//         data: 'Welcome'
//     })
// })
router.get('/', dataController.getData);
router.post('/validate-rule', dataController.validateData);

module.exports = router;