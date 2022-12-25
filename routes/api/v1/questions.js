const express = require('express');

const router = express.Router();

const questionsApi = require("../../../controllers/api/v1/questions_api");

router.post('/create', questionsApi.create);
router.delete('/:id/delete', questionsApi.delete);
router.get('/:id', questionsApi.view);

module.exports = router;